
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
  // Create the button
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
  
  // Add to the post
  postHeader.appendChild(button);
  
  // Add click handler
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const existingPanel = post.querySelector('.summary-panel');
    if (existingPanel) {
      // Toggle existing panel
      if (existingPanel.classList.contains('show')) {
        existingPanel.classList.remove('show');
        existingPanel.classList.add('hide');
        setTimeout(() => existingPanel.remove(), 300);
      } else {
        existingPanel.classList.remove('hide');
        existingPanel.classList.add('show');
      }
      return;
    }
    
    // Show loading panel
    const panel = createSummaryPanel(post);
    panel.innerHTML = `
      <div class="p-4">
        <div class="flex justify-between items-center mb-3">
          <div class="flex items-center">
            <div class="bg-blue-100 rounded-full p-1 mr-2" style="background-color: rgba(0, 119, 181, 0.1);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0077b5;">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" x2="8" y1="13" y2="13"></line>
                <line x1="16" x2="8" y1="17" y2="17"></line>
                <line x1="10" x2="8" y1="9" y2="9"></line>
              </svg>
            </div>
            <h4 style="font-weight: 500; color: #333;">Summarizing...</h4>
          </div>
          <button class="close-btn" style="height: 32px; width: 32px; padding: 0; border-radius: 9999px; background: transparent; border: none; cursor: pointer;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #666;">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; padding: 20px;">
          <div class="spinner" style="border: 3px solid rgba(0, 119, 181, 0.1); border-radius: 50%; border-top: 3px solid #0077b5; width: 24px; height: 24px; animation: spin 1s linear infinite;"></div>
        </div>
      </div>
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    // Add close button listener
    const closeBtn = panel.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('show');
      panel.classList.add('hide');
      setTimeout(() => panel.remove(), 300);
    });
    
    try {
      // For demo purposes, we'll use a mock API response instead of a real API call
      // In a real extension, you would call your summarization API here
      const summary = await mockSummarizePost(text);
      
      // Update panel with the summary
      panel.innerHTML = `
        <div style="padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center;">
              <div style="background-color: rgba(0, 119, 181, 0.1); border-radius: 9999px; padding: 4px; margin-right: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0077b5;">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" x2="8" y1="13" y2="13"></line>
                  <line x1="16" x2="8" y1="17" y2="17"></line>
                  <line x1="10" x2="8" y1="9" y2="9"></line>
                </svg>
              </div>
              <h4 style="font-weight: 500; color: #333; margin: 0;">Post Summary</h4>
            </div>
            <button class="close-btn" style="height: 32px; width: 32px; padding: 0; border-radius: 9999px; background: transparent; border: none; cursor: pointer;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #666;">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div style="margin-bottom: 12px;">
            <div style="display: inline-flex; background-color: rgba(0, 119, 181, 0.1); color: #0077b5; border-radius: 9999px; padding: 2px 10px; font-size: 12px; font-weight: 500; margin-bottom: 8px;">TLDR</div>
            <p style="font-size: 14px; font-weight: 500; color: #333; margin: 0;">${summary.tldr}</p>
          </div>
          
          <div style="height: 1px; background-color: #eee; margin: 12px 0;"></div>
          
          <div>
            <div style="display: inline-flex; background-color: #f3f3f3; color: #333; border-radius: 9999px; padding: 2px 10px; font-size: 12px; font-weight: 500; margin-bottom: 8px;">Summary</div>
            <p style="font-size: 14px; color: #666; margin: 0;">${summary.details}</p>
          </div>
        </div>
      `;
      
      // Add close button listener again
      const newCloseBtn = panel.querySelector('.close-btn');
      newCloseBtn.addEventListener('click', () => {
        panel.classList.remove('show');
        panel.classList.add('hide');
        setTimeout(() => panel.remove(), 300);
      });
      
    } catch (error) {
      console.error('Error summarizing post:', error);
      panel.innerHTML = `
        <div style="padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center;">
              <div style="background-color: rgba(0, 119, 181, 0.1); border-radius: 9999px; padding: 4px; margin-right: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0077b5;">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" x2="8" y1="13" y2="13"></line>
                  <line x1="16" x2="8" y1="17" y2="17"></line>
                  <line x1="10" x2="8" y1="9" y2="9"></line>
                </svg>
              </div>
              <h4 style="font-weight: 500; color: #333; margin: 0;">Error</h4>
            </div>
            <button class="close-btn" style="height: 32px; width: 32px; padding: 0; border-radius: 9999px; background: transparent; border: none; cursor: pointer;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #666;">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <p style="color: #d32f2f; font-size: 14px;">Failed to summarize post. Please try again later.</p>
        </div>
      `;
      
      // Add close button listener again
      const errorCloseBtn = panel.querySelector('.close-btn');
      errorCloseBtn.addEventListener('click', () => {
        panel.classList.remove('show');
        panel.classList.add('hide');
        setTimeout(() => panel.remove(), 300);
      });
    }
  });
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
