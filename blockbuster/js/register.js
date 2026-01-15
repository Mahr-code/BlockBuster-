document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('.register-form');
  
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const password2 = document.getElementById('password2').value;
      
      // Simple validation
      if (!username || !email || !password) {
        showMessage('All fields are required', 'error');
        return;
      }
      
      if (password !== password2) {
        showMessage('Passwords do not match', 'error');
        return;
      }
      
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.msg || 'Registration failed');
        }
        
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        
        // Show success message
        showMessage('Registration successful!', 'success');
        
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
      registerForm.insertAdjacentElement('beforebegin', messageContainer);
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