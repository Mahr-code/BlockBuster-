document.addEventListener('DOMContentLoaded', () => {
  const submitForm = document.querySelector('.submit-form');
  
  submitForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const text = document.getElementById('text').value;
    
    // Validate form (title is required)
    if (!title) {
      showMessage('Title is required', 'error');
      return;
    }
    
    try {
      // Send data to API
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') // Include token if user is logged in
        },
        body: JSON.stringify({ title, url, text })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.msg || 'Error submitting post');
      }
      
      // Show success message
      showMessage('Post submitted successfully!', 'success');
      
      // Clear form
      submitForm.reset();
      
      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      
    } catch (error) {
      showMessage(error.message, 'error');
    }
  });
  
  // Function to show message
  function showMessage(message, type) {
    // Check if message container already exists
    let messageContainer = document.querySelector('.message-container');
    
    // If not, create one
    if (!messageContainer) {
      messageContainer = document.createElement('div');
      messageContainer.className = 'message-container';
      submitForm.insertAdjacentElement('beforebegin', messageContainer);
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Add to container
    messageContainer.innerHTML = '';
    messageContainer.appendChild(messageElement);
    
    // Remove after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
});