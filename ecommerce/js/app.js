/*
  NexaMart E-Commerce Platform - Global App Initializer (app.js)
  Creates consistent global layout structures (headers, footers, toast containers) and starts common listeners.
*/

// Main layout elements injection
function injectGlobalLayouts() {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const user = NexaAuth.getCurrentUser();
  const currentPath = window.location.pathname;
  
  if (header && !header.innerHTML.trim()) {
    header.innerHTML = `
      <div class="header-container">
        <a href="index.html" class="logo">
          <i class="logo-icon">🛒</i>NexaMart
        </a>
        
        <ul class="nav-links">
          <li><a href="index.html" class="${currentPath.includes('index.html') || currentPath.endsWith('/') ? 'active' : ''}">Home</a></li>
          <li><a href="products.html" class="${currentPath.includes('products.html') ? 'active' : ''}">Shop</a></li>
          <li><a href="wishlist.html" class="${currentPath.includes('wishlist.html') ? 'active' : ''}">Wishlist</a></li>
          ${user && user.isAdmin ? `<li><a href="admin.html" class="${currentPath.includes('admin.html') ? 'active' : ''}">Admin</a></li>` : ''}
        </ul>
        
        <div class="header-search">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" id="global-search-input" placeholder="Search products, brands...">
        </div>
        
        <div class="header-actions">
          <!-- Wishlist -->
          <a href="wishlist.html" class="btn-icon" style="position:relative;" title="Wishlist">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span class="wishlist-badge cart-badge" style="background:var(--secondary); top:-3px; right:-3px; display:none;">0</span>
          </a>
          
          <!-- Cart Drawer Activator -->
          <button onclick="window.NexaCart.openCartDrawer()" class="btn-icon cart-icon-wrapper" title="Cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span class="cart-badge" style="display:none;">0</span>
          </button>
          
          <!-- User Menu -->
          <div class="user-menu-wrapper">
            <button class="btn-icon" id="user-menu-trigger" title="User Menu">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </button>
            <div class="user-dropdown glass">
              ${user ? `
                <div style="padding: 0.4rem 0.8rem; font-weight:600; color:var(--text-primary); font-size:0.9rem;">Hello, ${user.name}</div>
                <div class="user-dropdown-divider"></div>
                <a href="wishlist.html" class="user-dropdown-item">My Wishlist</a>
                ${user.isAdmin ? `<a href="admin.html" class="user-dropdown-item">Admin Dashboard</a>` : ''}
                <div class="user-dropdown-divider"></div>
                <div onclick="window.NexaAuth.logoutUser()" class="user-dropdown-item" style="color:var(--danger);">Sign Out</div>
              ` : `
                <a href="auth.html?mode=login" class="user-dropdown-item">Sign In</a>
                <a href="auth.html?mode=register" class="user-dropdown-item">Create Account</a>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (footer && !footer.innerHTML.trim()) {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-column">
            <a href="index.html" class="logo footer-logo">🛒 NexaMart</a>
            <p style="margin-top: 1rem; max-width: 320px;">Your ultimate destination for premium tech, high-fashion styles, elegant home decor, and organic wellness supplements.</p>
            <div class="footer-socials">
              <a href="#" class="btn-icon" style="width:36px; height:36px;"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
              <a href="#" class="btn-icon" style="width:36px; height:36px;"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg></a>
              <a href="#" class="btn-icon" style="width:36px; height:36px;"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            </div>
          </div>
          
          <div class="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="products.html">All Products</a></li>
              <li><a href="wishlist.html">My Wishlist</a></li>
              <li><a href="auth.html">My Account</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h4>Categories</h4>
            <ul>
              <li><a href="products.html?category=Electronics">Electronics</a></li>
              <li><a href="products.html?category=Fashion">Fashion</a></li>
              <li><a href="products.html?category=Home%20%26%20Living">Home & Living</a></li>
              <li><a href="products.html?category=Sports%20%26%20Outdoors">Sports</a></li>
            </ul>
          </div>
          
          <div class="footer-column footer-newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe to secure special discount updates and launch announcements.</p>
            <form class="newsletter-form" onsubmit="event.preventDefault(); window.NexaUtils.showToast('Subscribed! Welcome on board.', 'success'); this.reset();">
              <input type="email" placeholder="Your email address..." required>
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2026 NexaMart E-Commerce. Built with premium Vanilla systems.</p>
          <div class="flex gap-2">
            <a href="#">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    `;
  }
  
  // Set up User menu toggle listeners
  const trigger = document.getElementById('user-menu-trigger');
  const userWrapper = document.querySelector('.user-menu-wrapper');
  if (trigger && userWrapper) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      userWrapper.classList.toggle('active');
    });
    document.addEventListener('click', () => {
      userWrapper.classList.remove('active');
    });
  }
  
  // Global search triggers page routing
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    // If we're on the shop catalog page, synch this query parameter search field
    if (window.location.pathname.includes('products.html')) {
      const currentQuery = NexaUtils.getQueryParam('search');
      if (currentQuery) searchInput.value = currentQuery;
    }
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
}

// Scroll animation trigger setup
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (revealElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });
  
  revealElements.forEach(el => observer.observe(el));
}

// Inject layouts on page startup
document.addEventListener('DOMContentLoaded', () => {
  injectGlobalLayouts();
  initScrollObserver();
});
