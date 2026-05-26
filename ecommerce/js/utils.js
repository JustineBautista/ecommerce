/*
  NexaMart E-Commerce Platform - Shared Utilities (utils.js)
  Implements currency formatting, star-ratings generation, toast popups, and routing parameter tools.
*/

// Format price to standard USD currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Generate stars HTML string based on rating (out of 5)
function generateStarsHtml(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  let starsHtml = '<div class="stars">';
  
  // Full Stars
  for (let i = 0; i < fullStars; i++) {
    starsHtml += `
      <svg class="star" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    `;
  }
  
  // Half Star
  if (halfStar) {
    starsHtml += `
      <svg class="star star-half" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="halfGrad">
            <stop offset="50%" stop-color="currentColor"/>
            <stop offset="50%" stop-color="rgba(255,255,255,0.15)"/>
          </linearGradient>
        </defs>
        <path fill="url(#halfGrad)" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    `;
  }
  
  // Empty Stars
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += `
      <svg class="star star-empty" width="16" height="16" fill="rgba(255,255,255,0.15)" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    `;
  }
  
  starsHtml += '</div>';
  return starsHtml;
}

// Global Toast Notifications Creator
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type} glass`;
  
  let icon = '';
  if (type === 'success') {
    icon = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
  } else if (type === 'error') {
    icon = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
  } else {
    icon = `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
  }
  
  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Trigger slide-in transition
  setTimeout(() => toast.classList.add('active'), 50);
  
  // Slide-out and remove toast
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Get clean product detail routing URL parameter value
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Debounce helper for search boxes inputs
function debounce(func, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Export utilities
window.NexaUtils = {
  formatCurrency,
  generateStarsHtml,
  showToast,
  getQueryParam,
  debounce
};
