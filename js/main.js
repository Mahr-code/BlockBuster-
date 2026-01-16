document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const token = localStorage.getItem('token');
  updateNavigation(token);
  
  // Load posts on index page
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    loadPosts();
  }
  
  // Load threads on threads page
  if (window.location.pathname === '/threads.html') {
    loadThreads();
  }
  
  // Load jobs on jobs page
  if (window.location.pathname === '/jobs.html') {
    loadJobs();
  }
  
  // Update navigation based on authentication
  function updateNavigation(token) {
    const navLinks = document.querySelector('.nav-links');
    if (token) {
      // User is logged in
      if (navLinks.querySelector('a[href="login.html"]')) {
        const loginLink = navLinks.querySelector('a[href="login.html"]');
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('token');
          window.location.reload();
        });
      }
    }
  }
  
  // Load posts from API
  async function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) return;
    
    try {
      const response = await fetch('/api/posts');
      const posts = await response.json();
      
      if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts yet. Be the first to submit!</p>';
        return;
      }
      
      // Clear container
      postsContainer.innerHTML = '';
      
      // Display posts
      posts.forEach((post, index) => {
        const postElement = createPostElement(post, index + 1);
        postsContainer.appendChild(postElement);
      });
      
    } catch (error) {
      console.error('Error loading posts:', error);
      postsContainer.innerHTML = '<p>Error loading posts. Please try again later.</p>';
    }
  }
  
  // Create post element
  function createPostElement(post, rank) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    
    postElement.innerHTML = `
      <div class="post-rank">${rank}.</div>
      <div class="post-content">
        <div class="post-title">
          <a href="${post.url || '#'}" target="_blank">${post.title}</a>
          ${post.url ? `<span class="post-domain">(${new URL(post.url).hostname})</span>` : ''}
        </div>
        <div class="post-meta">
          ${post.points || 0} points by ${post.author ? post.author.username : 'anonymous'} ${timeAgo(post.createdAt)}
          | <a href="/threads.html?id=${post._id}">${post.comments ? post.comments.length : 0} comments</a>
        </div>
      </div>
    `;
    
    return postElement;
  }
  
  // Load threads from API
  async function loadThreads() {
    const threadsContainer = document.querySelector('.container');
    if (!threadsContainer) return;
    
    try {
      const response = await fetch('/api/threads');
      const threads = await response.json();
      
      if (threads.length === 0) {
        threadsContainer.innerHTML = '<h1>Threads</h1><p>No threads yet. Start a discussion!</p>';
        return;
      }
      
      // Display threads
      let threadsHTML = '<h1>Threads</h1>';
      threads.forEach(thread => {
        threadsHTML += `
          <div class="thread">
            <h2><a href="/thread.html?id=${thread._id}">${thread.title}</a></h2>
            <p>${thread.content.substring(0, 150)}${thread.content.length > 150 ? '...' : ''}</p>
            <div class="thread-meta">
              Posted by ${thread.author ? thread.author.username : 'anonymous'} ${timeAgo(thread.createdAt)}
              | ${thread.comments ? thread.comments.length : 0} comments
            </div>
          </div>
        `;
      });
      
      threadsContainer.innerHTML = threadsHTML;
      
    } catch (error) {
      console.error('Error loading threads:', error);
      threadsContainer.innerHTML = '<h1>Threads</h1><p>Error loading threads. Please try again later.</p>';
    }
  }
  
  // Load jobs from API
  async function loadJobs() {
    const jobsContainer = document.querySelector('.container');
    if (!jobsContainer) return;
    
    try {
      const response = await fetch('/api/jobs');
      const jobs = await response.json();
      
      if (jobs.length === 0) {
        jobsContainer.innerHTML = '<h1>Jobs</h1><p>No job listings yet.</p>';
        return;
      }
      
      // Display jobs
      let jobsHTML = '<h1>Jobs</h1>';
      jobs.forEach(job => {
        jobsHTML += `
          <div class="job">
            <h2><a href="${job.link || '#'}" target="_blank">${job.title}</a></h2>
            <h3>${job.company}</h3>
            <p>${job.description ? job.description.substring(0, 200) + (job.description.length > 200 ? '...' : '') : ''}</p>
            <div class="job-meta">
              Posted ${timeAgo(job.createdAt)}
            </div>
          </div>
        `;
      });
      
      jobsContainer.innerHTML = jobsHTML;
      
    } catch (error) {
      console.error('Error loading jobs:', error);
      jobsContainer.innerHTML = '<h1>Jobs</h1><p>Error loading jobs. Please try again later.</p>';
    }
  }
  
  // Helper function to format time ago
  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + ' year' + (interval === 1 ? '' : 's') + ' ago';
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + ' month' + (interval === 1 ? '' : 's') + ' ago';
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + ' day' + (interval === 1 ? '' : 's') + ' ago';
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + ' hour' + (interval === 1 ? '' : 's') + ' ago';
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + ' minute' + (interval === 1 ? '' : 's') + ' ago';
    }
    
    return Math.floor(seconds) + ' second' + (seconds === 1 ? '' : 's') + ' ago';
  }
});