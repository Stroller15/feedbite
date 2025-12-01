// Main content script for LinkedIn Summarizer

// Configuration
const PROVIDER_CONFIG = {
  groq: {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    defaultModel: 'llama-3.3-70b-versatile'
  },
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    defaultModel: 'gpt-4o-mini'
  },
  gemini: {
    url: 'https://generativelanguage.googleapis.com/v1beta/models/',
    defaultModel: 'gemini-1.5-flash'
  }
};

const DEFAULT_API_KEY = '';

// State
let isProcessing = false;
let activeModal = null;

// Wait for the page to fully load
window.addEventListener('load', () => {
  initSummarizer();
});

// Listen for settings updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "settingsUpdated") {
    console.log("Settings updated, reloading configuration...");
    // We don't need to do anything specific as we fetch settings on every click
  }
});

// Also run on navigation (LinkedIn is a SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    console.log('LinkedIn page navigation detected');
    setTimeout(initSummarizer, 1000); // Wait for content to load
  }
}).observe(document, { subtree: true, childList: true });

// Initialize the summarizer
function initSummarizer() {
  console.log('Initializing LinkedIn Summarizer');

  // Find all posts in the feed
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        processPosts();
      }
    }
  });

  // Observe the entire body for changes as LinkedIn is very dynamic
  const observerTarget = document.body;
  observer.observe(observerTarget, { childList: true, subtree: true });

  // Initial process
  processPosts();

  // Periodic check in case observer misses something
  setInterval(processPosts, 3000);

  // Add global scroll listener to close modal
  window.addEventListener('scroll', handleScroll, { passive: true });
}

function handleScroll() {
  if (activeModal) {
    closeModal(activeModal);
  }
}

// Process all posts in the feed
function processPosts() {
  // Find all posts that don't have our button yet
  // Try multiple selectors for feed posts
  // The user's HTML shows obfuscated classes but stable data attributes
  const posts = document.querySelectorAll('div[data-urn], div[componentkey^="expandedurn"], div[componentkey^="urn:li:activity"]');

  posts.forEach((post, index) => {
    if (post.classList.contains('summarizer-processed')) return;

    // Mark as processed
    post.classList.add('summarizer-processed');

    // Find the post header/action area
    // Strategy: Always try to place it next to the "View more options" (three dots) button first.
    // This is the most consistent element across all post types.
    const optionsBtn = post.querySelector('button[aria-label="View more options"]');
    let targetContainer = null;
    let referenceNode = null;

    if (optionsBtn && optionsBtn.parentElement) {
      targetContainer = optionsBtn.parentElement;
      referenceNode = optionsBtn;
      // Add a class to the container to help with styling if needed
      targetContainer.classList.add('feedbite-actions-container');
    } else {
      // Fallback to the actor meta (User/Company info)
      targetContainer = post.querySelector('.feed-shared-actor__meta') ||
        post.querySelector('[data-view-name="feed-header-actor-image"]')?.parentElement?.parentElement ||
        post.querySelector('[data-view-name="feed-actor-image"]')?.parentElement?.parentElement ||
        post.querySelector('.update-components-actor__meta');
    }

    if (!targetContainer) {
      return;
    }

    // Find the post content
    // Look for the text content container
    const postContent = post.querySelector('.feed-shared-update-v2__description') ||
      post.querySelector('[data-view-name="feed-commentary"]') ||
      post.querySelector('.update-components-text');

    if (!postContent) {
      return;
    }

    // Only add button if post has significant text content
    const text = postContent.textContent?.trim();
    if (text && text.length > 50) {
      addSummarizeButton(post, targetContainer, text, referenceNode);
    }
  });
}

// Add the summarize button to a post
function addSummarizeButton(post, container, text, referenceNode = null) {
  // Check if button already exists (double check)
  if (container.querySelector('.summarize-btn')) return;

  const button = document.createElement('button');
  button.className = 'summarize-btn';
  button.innerHTML = `
    <svg class="summarize-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" x2="8" y1="13" y2="13"></line>
      <line x1="16" x2="8" y1="17" y2="17"></line>
      <line x1="10" x2="8" y1="9" y2="9"></line>
    </svg>
    Summarize
  `;

  // Insert before reference node (options button) or append
  if (referenceNode) {
    container.insertBefore(button, referenceNode);

    // Runtime alignment correction
    // We wait for render, then measure the difference in vertical center between our button and the reference button
    // and apply a transform to fix it. This handles all layout types (flex, block, grid).
    requestAnimationFrame(() => {
      const btnRect = button.getBoundingClientRect();
      const refRect = referenceNode.getBoundingClientRect();

      if (btnRect.height && refRect.height) {
        const btnCenter = btnRect.top + (btnRect.height / 2);
        const refCenter = refRect.top + (refRect.height / 2);
        const diff = refCenter - btnCenter;

        if (Math.abs(diff) > 1) { // Only adjust if difference is noticeable
          button.style.transform = `translateY(${diff}px)`;
        }
      }
    });
  } else {
    container.appendChild(button);
  }

  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Close any other open modal
    if (activeModal && activeModal.parentNode !== container) {
      closeModal(activeModal);
    }

    // Check if panel exists
    const existingPanel = container._feedbitePanel;
    if (existingPanel && document.body.contains(existingPanel)) {
      togglePanel(existingPanel);
      return;
    }

    const panel = createSummaryPanel(container, post, button);
    container._feedbitePanel = panel;
    activeModal = panel;
    showLoadingState(panel);

    try {
      const settings = await getSettings();
      const provider = settings.provider || 'groq';
      const apiKey = settings[`${provider}ApiKey`];

      // Fallback for Groq default key if not set
      const finalApiKey = (provider === 'groq' && !apiKey) ? DEFAULT_API_KEY : apiKey;

      if (!finalApiKey) {
        showError(panel, `Please set your ${provider.toUpperCase()} API Key in the extension settings.`);
        return;
      }

      const summary = await summarizePost(text, provider, finalApiKey, settings.customModel);
      showSummary(panel, summary);
    } catch (error) {
      console.error('Error summarizing post:', error);
      showError(panel, error.message || "Failed to summarize post.");
    }
  });
}

function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['provider', 'groqApiKey', 'openaiApiKey', 'geminiApiKey', 'customModel'], (result) => {
      resolve(result);
    });
  });
}

async function summarizePost(text, provider, apiKey, customModel) {
  switch (provider) {
    case 'openai':
      return summarizeWithOpenAI(text, apiKey, customModel);
    case 'gemini':
      return summarizeWithGemini(text, apiKey, customModel);
    case 'groq':
    default:
      return summarizeWithGroq(text, apiKey, customModel);
  }
}

async function summarizeWithGroq(text, apiKey, customModel) {
  const model = customModel || PROVIDER_CONFIG.groq.defaultModel;

  const response = await fetch(PROVIDER_CONFIG.groq.url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes LinkedIn posts. You MUST output valid JSON. The JSON object must have exactly two keys: 'tldr' (a string with a one-sentence summary) and 'details' (a string with a concise paragraph of key points)."
        },
        {
          role: "user",
          content: `Summarize this LinkedIn post:\n\n${text}`
        }
      ],
      response_format: { type: "json_object" }
    })
  });

  return handleApiResponse(response);
}

async function summarizeWithOpenAI(text, apiKey, customModel) {
  const model = customModel || PROVIDER_CONFIG.openai.defaultModel;

  const response = await fetch(PROVIDER_CONFIG.openai.url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes LinkedIn posts. You MUST output valid JSON. The JSON object must have exactly two keys: 'tldr' (a string with a one-sentence summary) and 'details' (a string with a concise paragraph of key points)."
        },
        {
          role: "user",
          content: `Summarize this LinkedIn post:\n\n${text}`
        }
      ],
      response_format: { type: "json_object" }
    })
  });

  return handleApiResponse(response);
}

async function summarizeWithGemini(text, apiKey, customModel) {
  const model = customModel || PROVIDER_CONFIG.gemini.defaultModel;
  const url = `${PROVIDER_CONFIG.gemini.url}${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Summarize this LinkedIn post. Return valid JSON with two keys: 'tldr' (one sentence) and 'details' (concise paragraph). Post content: ${text}`
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API Error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.candidates[0].content.parts[0].text;

  try {
    return JSON.parse(content);
  } catch (e) {
    return {
      tldr: "Summary available below",
      details: content
    };
  }
}

async function handleApiResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API Error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch (e) {
    return {
      tldr: "Summary available below",
      details: content
    };
  }
}

// Create a summary panel for a post
// Create a summary panel for a post
function createSummaryPanel(container, post, button) {
  const panel = document.createElement('div');
  panel.className = 'summary-panel';

  // Append to body
  document.body.appendChild(panel);

  // Positioning logic using requestAnimationFrame for smooth tracking
  // This handles window scroll, sub-container scroll, resizing, and layout shifts perfectly
  const updatePositionLoop = () => {
    // Stop if panel is removed or hidden
    if (!panel.parentElement || panel.classList.contains('hide')) {
      return;
    }

    const btnRect = button.getBoundingClientRect();

    // If button is off-screen or hidden, we might want to close or hide, 
    // but for now let's just keep tracking.
    // If button is removed from DOM:
    if (btnRect.width === 0 && btnRect.height === 0) {
      return;
    }

    // Use Fixed positioning for rock-solid tracking
    panel.style.position = 'fixed';
    panel.style.top = `${btnRect.bottom + 8}px`; // 8px gap
    panel.style.zIndex = '10000';

    // Width
    const width = Math.min(360, window.innerWidth - 32);
    panel.style.width = `${width}px`;

    // Align right edge of panel with right edge of button
    let left = btnRect.right - width;

    // Boundary check
    if (left < 16) left = 16;

    panel.style.left = `${left}px`;

    // Optional: Hide if button scrolls far off screen to prevent weird floating
    if (btnRect.bottom < 0 || btnRect.top > window.innerHeight) {
      panel.style.opacity = '0';
      panel.style.pointerEvents = 'none';
    } else {
      // Only restore if we are in 'show' state
      if (panel.classList.contains('show')) {
        panel.style.opacity = '1';
        panel.style.pointerEvents = 'auto';
      }
    }

    panel._animationFrameId = requestAnimationFrame(updatePositionLoop);
  };

  // Start loop
  updatePositionLoop();

  // Trigger animation
  requestAnimationFrame(() => {
    panel.classList.add('show');
  });

  return panel;
}

function togglePanel(panel) {
  if (panel.classList.contains('show')) {
    closeModal(panel);
  } else {
    // Cancel any pending close
    if (panel._closeTimeout) {
      clearTimeout(panel._closeTimeout);
      panel._closeTimeout = null;
    }
    panel.classList.remove('hide');
    panel.classList.add('show');
    activeModal = panel;
  }
}

function closeModal(panel) {
  panel.classList.remove('show');
  panel.classList.add('hide');

  // Remove event listeners
  if (panel._animationFrameId) {
    cancelAnimationFrame(panel._animationFrameId);
    panel._animationFrameId = null;
  }

  // Clear any existing timeout
  if (panel._closeTimeout) clearTimeout(panel._closeTimeout);

  // Remove from DOM after animation
  panel._closeTimeout = setTimeout(() => {
    if (panel.parentNode) {
      panel.parentNode.removeChild(panel);
    }
    if (activeModal === panel) {
      activeModal = null;
    }
    panel._closeTimeout = null;
  }, 300);
}

function showLoadingState(panel) {
  panel.innerHTML = `
    <div class="summary-header">
      <div class="summary-title">
        <div class="spinner"></div>
        Generating Summary...
      </div>
      <button class="close-btn" title="Close">×</button>
    </div>
    <div class="summary-content">
      <p class="summary-text">Analyzing post content with AI...</p>
    </div>
  `;

  setupCloseButton(panel);
}

function showSummary(panel, summary) {
  panel.innerHTML = `
    <div class="summary-header">
      <div class="summary-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" x2="8" y1="13" y2="13"></line>
          <line x1="16" x2="8" y1="17" y2="17"></line>
          <line x1="10" x2="8" y1="9" y2="9"></line>
        </svg>
        Post Summary
      </div>
      <button class="close-btn" title="Close">×</button>
    </div>
    <div class="summary-content">
      <div class="tldr-badge">TL;DR</div>
      <p class="summary-text" style="font-weight: 600; margin-bottom: 12px; color: #1a1a1a;">${summary.tldr}</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 12px 0;">
      <p class="summary-text" style="color: #4a4a4a;">${summary.details}</p>
    </div>
  `;

  setupCloseButton(panel);
}

function showError(panel, message) {
  panel.innerHTML = `
    <div class="summary-header">
      <div class="summary-title" style="color: #d32f2f;">
        Error
      </div>
      <button class="close-btn" title="Close">×</button>
    </div>
    <div class="summary-content">
      <p class="summary-text">${message}</p>
    </div>
  `;

  setupCloseButton(panel);
}

function setupCloseButton(panel) {
  const closeBtn = panel.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal(panel);
    });
  }
}
