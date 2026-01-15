document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.msg || 'Login failed');
        }
        
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        
        // Show success message
        showMessage('Login successful!', 'success');
        
        // Redirect to homepage
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
        
      } catch (error) {
        showMessage(error.message, 'error');
      }
    });
  }
  
  // Function to show message
  function showMessage(message, type) {
    // Check if message container already exists
    let messageContainer = document.querySelector('.message-container');
    
    // If not, create one
    if (!messageContainer) {
      messageContainer = document.createElement('div');
      messageContainer.className = 'message-container';
      loginForm.insertAdjacentElement('beforebegin', messageContainer);
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