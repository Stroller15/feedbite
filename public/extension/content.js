
// Main content script for LinkedIn Summarizer

console.log('LinkedIn Summarizer loaded');

// Configuration
const apiEndpoint = 'https://api.example.com/summarize'; // Replace with actual API endpoint

// Wait for the page to fully load
window.addEventListener('load', () => {
  initSummarizer();
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
  
  // Observe the feed for new posts
  const feed = document.querySelector('.scaffold-finite-scroll__content');
  if (feed) {
    observer.observe(feed, { childList: true, subtree: true });
    processPosts();
  } else {
    console.log('LinkedIn feed not found');
    setTimeout(initSummarizer, 2000); // Retry in 2 seconds
  }
}

// Process all posts in the feed
function processPosts() {
  // Find all posts that don't have our button yet
  const posts = document.querySelectorAll('.feed-shared-update-v2:not(.summarizer-processed)');
  
  posts.forEach((post, index) => {
    // Mark as processed
    post.classList.add('summarizer-processed');
    
    // Find the post header (where we'll add our button)
    const postHeader = post.querySelector('.feed-shared-actor__meta');
    if (!postHeader) return;
    
    // Find the post content
    const postContent = post.querySelector('.feed-shared-update-v2__description');
    if (!postContent) return;
    
    // Only add button if post has significant text content
    const text = postContent.textContent?.trim();
    if (text && text.length > 100) {
      addSummarizeButton(post, postHeader, text, index);
    }
  });
}

// Add the summarize button to a post
function addSummarizeButton(post, postHeader, text, index) {
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
  
  postHeader.appendChild(button);
  
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const existingPanel = post.querySelector('.summary-panel');
    if (existingPanel) {
      togglePanel(existingPanel);
      return;
    }
    
    const panel = createSummaryPanel(post);
    showLoadingState(panel);
    
    try {
      const summary = await summarizeWithGroq(text);
      showSummary(panel, summary);
    } catch (error) {
      console.error('Error summarizing post:', error);
      showError(panel);
    }
  });
}

async function summarizeWithGroq(text) {
  const response = await fetch('https://api.groq.com/v1/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes LinkedIn posts. Provide a TLDR and detailed summary."
        },
        {
          role: "user",
          content: `Summarize this LinkedIn post: ${text}`
        }
      ]
    })
  });
  
  const data = await response.json();
  const summary = data.choices[0].message.content;
  
  return {
    tldr: summary.split('\n')[0],
    details: summary.split('\n').slice(1).join('\n')
  };
}

// Create a summary panel for a post
function createSummaryPanel(post) {
  const panel = document.createElement('div');
  panel.className = 'summary-panel';
  post.style.position = 'relative';
  post.appendChild(panel);
  
  // Trigger animation after a small delay (for the animation to work)
  setTimeout(() => {
    panel.classList.add('show');
  }, 10);
  
  return panel;
}

// Mock API call for demonstration purposes
async function mockSummarizePost(text) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Sample summaries based on content length
  if (text.length < 200) {
    return {
      tldr: "A brief update on a professional topic.",
      details: "The post mentions a professional topic but doesn't provide extensive details. It's a brief update that might be related to the author's work or industry."
    };
  } else if (text.includes('productivity')) {
    return {
      tldr: "The best productivity system is the one you'll actually use consistently, regardless of features.",
      details: "After trying many productivity tools, the author has found that simplicity and consistency are more important than advanced features. They currently use a basic note-taking app with calendar blocking, which has proven effective for managing multiple projects. They're asking for others to share their own productivity systems."
    };
  } else if (text.includes('refactoring')) {
    return {
      tldr: "Completed a major code refactoring that reduced codebase size by 30% while improving performance by 25%.",
      details: "The project revealed several key insights: technical debt compounds quickly, leadership buy-in is essential, good test coverage provides confidence during refactoring, incremental changes with frequent deployments help manage complexity, and documentation is critically important. The author is asking for others to share their refactoring experiences."
    };
  } else {
    return {
      tldr: "Important insights shared about professional development and industry trends.",
      details: "The author discusses several key points related to their professional field, sharing personal experiences and lessons learned. They highlight challenges they've overcome and provide actionable advice for others in similar situations. The post concludes with an invitation for discussion and feedback from peers."
    };
  }
}
