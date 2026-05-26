/*
  NexaMart E-Commerce Platform - Product Detail Javascript (product-detail.js)
  Coordinates product gallery images, variants selections, tab navigation, reviews submissions, and relevant recommendations.
*/

let selectedColor = "";
let selectedSize = "";
let currentQuantity = 1;
let currentProduct = null;

// Product detail setup
function initProductDetail() {
  const productId = NexaUtils.getQueryParam('id');
  if (!productId) {
    window.location.href = 'products.html';
    return;
  }
  
  const products = NexaDb.getProducts();
  currentProduct = products.find(p => p.id === productId);
  
  if (!currentProduct) {
    window.location.href = 'products.html';
    return;
  }
  
  renderProductDetail();
  renderSpecsAndTabs();
  renderReviewsSection();
  renderRecommendations();
}

// Display product information
function renderProductDetail() {
  // Page Title
  document.title = `${currentProduct.name} - NexaMart`;
  
  // Gallery Main Image & Thumbnails
  const mainImgBox = document.querySelector('.detail-main-img-box');
  const thumbsBox = document.querySelector('.detail-thumbnails');
  
  if (mainImgBox) {
    mainImgBox.innerHTML = `<img src="${currentProduct.images[0]}" alt="${currentProduct.name}" id="main-detail-image">`;
  }
  
  if (thumbsBox) {
    let thumbsHtml = '';
    currentProduct.images.forEach((img, index) => {
      thumbsHtml += `
        <div class="thumbnail-box ${index === 0 ? 'active' : ''}" onclick="switchDetailImage(this, '${img}')">
          <img src="${img}" alt="${currentProduct.name} thumbnail ${index}">
        </div>
      `;
    });
    // Add dummy thumbs if count is small for aesthetic balance
    if (currentProduct.images.length === 1) {
      thumbsHtml += `
        <div class="thumbnail-box" onclick="switchDetailImage(this, '${currentProduct.images[0]}')">
          <img src="${currentProduct.images[0]}" alt="aesthetic secondary thumbnail">
        </div>
      `;
    }
    thumbsBox.innerHTML = thumbsHtml;
  }
  
  // Title & Rating
  const titleEl = document.querySelector('.detail-title');
  const ratingEl = document.querySelector('.detail-rating-row');
  
  if (titleEl) titleEl.textContent = currentProduct.name;
  if (ratingEl) {
    ratingEl.innerHTML = `
      ${NexaUtils.generateStarsHtml(currentProduct.rating)}
      <span class="review-count" style="font-weight:600; color:var(--text-primary);">${currentProduct.rating} (${currentProduct.reviewCount} customer reviews)</span>
    `;
  }
  
  // Prices
  const priceEl = document.getElementById('detail-product-price');
  const oldPriceEl = document.getElementById('detail-product-old-price');
  if (priceEl) priceEl.textContent = NexaUtils.formatCurrency(currentProduct.price);
  if (oldPriceEl) {
    if (currentProduct.discount > 0) {
      oldPriceEl.textContent = NexaUtils.formatCurrency(currentProduct.originalPrice);
      oldPriceEl.style.display = 'block';
    } else {
      oldPriceEl.style.display = 'none';
    }
  }
  
  // Description
  const descEl = document.querySelector('.detail-desc');
  if (descEl) descEl.textContent = currentProduct.description;
  
  // Variant Options Rendering
  const variantBox = document.querySelector('.detail-options');
  if (variantBox) {
    let optionsHtml = '';
    
    // Choose sensible variants based on category
    if (currentProduct.category === 'Fashion') {
      optionsHtml += `
        <div>
          <h5 class="option-title">Select Color</h5>
          <div class="variant-btn-list">
            <button class="color-btn active" style="background:#2d3436;" onclick="selectColor(this, 'Onyx Black')"></button>
            <button class="color-btn" style="background:#dfe6e9;" onclick="selectColor(this, 'Cloud White')"></button>
            <button class="color-btn" style="background:#d63031;" onclick="selectColor(this, 'Crimson Red')"></button>
          </div>
        </div>
        <div>
          <h5 class="option-title">Select Size</h5>
          <div class="variant-btn-list">
            <button class="variant-btn" onclick="selectSize(this, 'S')">S</button>
            <button class="variant-btn active" onclick="selectSize(this, 'M')">M</button>
            <button class="variant-btn" onclick="selectSize(this, 'L')">L</button>
            <button class="variant-btn" onclick="selectSize(this, 'XL')">XL</button>
          </div>
        </div>
      `;
      selectedColor = "Onyx Black";
      selectedSize = "M";
    } else if (currentProduct.category === 'Electronics') {
      optionsHtml += `
        <div>
          <h5 class="option-title">Select Storage</h5>
          <div class="variant-btn-list">
            <button class="variant-btn active" onclick="selectSize(this, '128GB')">128GB</button>
            <button class="variant-btn" onclick="selectSize(this, '256GB')">256GB</button>
            ${currentProduct.price > 300 ? `<button class="variant-btn" onclick="selectSize(this, '512GB')">512GB</button>` : ''}
          </div>
        </div>
      `;
      selectedSize = "128GB";
    } else {
      optionsHtml += `
        <div>
          <h5 class="option-title">Option</h5>
          <div class="variant-btn-list">
            <button class="variant-btn active" onclick="selectSize(this, 'Standard')">Standard Edition</button>
          </div>
        </div>
      `;
      selectedSize = "Standard";
    }
    
    variantBox.innerHTML = optionsHtml;
  }
  
  // Stock availability & badge
  const availabilityBadge = document.getElementById('detail-stock-badge');
  if (availabilityBadge) {
    if (currentProduct.stock > 0) {
      availabilityBadge.textContent = "In Stock";
      availabilityBadge.className = "badge badge-new";
    } else {
      availabilityBadge.textContent = "Out of Stock";
      availabilityBadge.className = "badge badge-sale";
    }
  }
}

// switch image thumbs clicks
function switchDetailImage(thumbElement, imgUrl) {
  const mainImage = document.getElementById('main-detail-image');
  if (mainImage) mainImage.src = imgUrl;
  
  // Toggle active class on thumbnails
  const thumbnails = document.querySelectorAll('.thumbnail-box');
  thumbnails.forEach(t => t.classList.remove('active'));
  thumbElement.classList.add('active');
}

// Select variants
function selectColor(btnElement, colorName) {
  const colorBtns = document.querySelectorAll('.color-btn');
  colorBtns.forEach(b => b.classList.remove('active'));
  btnElement.classList.add('active');
  selectedColor = colorName;
}

function selectSize(btnElement, sizeName) {
  const sizeBtns = btnElement.parentElement.querySelectorAll('.variant-btn');
  sizeBtns.forEach(b => b.classList.remove('active'));
  btnElement.classList.add('active');
  selectedSize = sizeName;
}

// Adjust quantity
function adjustQuantity(amount) {
  const qtyInput = document.getElementById('detail-qty');
  if (!qtyInput) return;
  
  currentQuantity = Math.max(1, currentQuantity + amount);
  
  if (currentProduct && currentQuantity > currentProduct.stock) {
    NexaUtils.showToast(`Only ${currentProduct.stock} items are in stock.`, "error");
    currentQuantity = currentProduct.stock;
  }
  
  qtyInput.value = currentQuantity;
}

// Tab navigation switcher
function switchTab(btnElement, tabId) {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(b => b.classList.remove('active'));
  tabContents.forEach(c => c.classList.remove('active'));
  
  btnElement.classList.add('active');
  
  const targetContent = document.getElementById(tabId);
  if (targetContent) targetContent.classList.add('active');
}

// Render specifications text
function renderSpecsAndTabs() {
  const descTab = document.getElementById('tab-desc-content');
  const specsTab = document.getElementById('tab-specs-content');
  
  if (descTab) descTab.innerHTML = `<p>${currentProduct.description}</p>`;
  
  if (specsTab) {
    let specsHtml = '<table style="width:100%; border-collapse:collapse; text-align:left;">';
    Object.entries(currentProduct.specs).forEach(([key, val]) => {
      specsHtml += `
        <tr style="border-bottom:1px solid var(--glass-border);">
          <td style="padding:0.75rem 1rem; font-weight:600; color:var(--text-secondary); width:30%;">${key}</td>
          <td style="padding:0.75rem 1rem;">${val}</td>
        </tr>
      `;
    });
    specsHtml += '</table>';
    specsTab.innerHTML = specsHtml;
  }
}

// Render product reviews panel
function renderReviewsSection() {
  const container = document.getElementById('reviews-list-container');
  if (!container) return;
  
  const reviews = NexaDb.getReviews();
  const prodReviews = reviews[currentProduct.id] || [];
  
  if (prodReviews.length === 0) {
    container.innerHTML = `
      <p style="text-align:center; padding: 2rem 0; color:var(--text-secondary);">No reviews yet. Be the first to review this product!</p>
    `;
    return;
  }
  
  let reviewsHtml = '';
  
  prodReviews.forEach(r => {
    reviewsHtml += `
      <div class="review-item">
        <div class="review-header">
          <div>
            <span class="review-user">${r.username}</span>
            <div style="margin-top:0.25rem;">${NexaUtils.generateStarsHtml(r.rating)}</div>
          </div>
          <span class="review-date">${r.date}</span>
        </div>
        <p class="review-text">${r.comment}</p>
      </div>
    `;
  });
  
  container.innerHTML = reviewsHtml;
}

// Submit a new review
function submitReview(event) {
  event.preventDefault();
  
  const user = NexaAuth.getCurrentUser();
  const nameInput = document.getElementById('review-author');
  const ratingInput = document.getElementById('review-rating-select');
  const commentInput = document.getElementById('review-comment');
  
  if (!commentInput) return;
  
  const authorName = user ? user.name : (nameInput ? nameInput.value.trim() : "Anonymous");
  const ratingScore = parseInt(ratingInput ? ratingInput.value : 5);
  const commentText = commentInput.value.trim();
  
  if (!commentText) {
    NexaUtils.showToast("Please enter a review comment.", "error");
    return;
  }
  
  const newReview = {
    username: authorName,
    rating: ratingScore,
    date: new Date().toISOString().split('T')[0],
    comment: commentText
  };
  
  NexaDb.addProductReview(currentProduct.id, newReview);
  NexaUtils.showToast("Review submitted successfully! Thank you.", "success");
  
  // Reset Form
  if (commentInput) commentInput.value = '';
  if (nameInput) nameInput.value = '';
  
  // Re-draw components
  initProductDetail();
}

// Render "You might also like" section
function renderRecommendations() {
  const container = document.getElementById('recommendations-grid');
  if (!container) return;
  
  const products = NexaDb.getProducts();
  const related = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);
    
  if (related.length === 0) {
    // Show top trending instead
    const trending = products.filter(p => p.id !== currentProduct.id).slice(0, 4);
    renderCardsToBox(container, trending);
    return;
  }
  
  renderCardsToBox(container, related);
}

function renderCardsToBox(boxElement, cardsList) {
  let cardsHtml = '';
  cardsList.forEach(p => {
    cardsHtml += `
      <div class="product-card glass">
        <div class="product-image-container">
          <a href="product-detail.html?id=${p.id}" style="width:100%; height:100%; display:block;">
            <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
          </a>
        </div>
        <div class="product-info">
          <span class="product-category">${p.category}</span>
          <h4 class="product-title" style="font-size:0.95rem; height:2.4rem;">
            <a href="product-detail.html?id=${p.id}">${p.name}</a>
          </h4>
          <div class="product-rating" style="margin-bottom: 0.5rem;">
            ${NexaUtils.generateStarsHtml(p.rating)}
          </div>
          <div class="product-footer">
            <span class="product-price" style="font-size: 1.05rem;">${NexaUtils.formatCurrency(p.price)}</span>
            <button onclick="window.NexaCart.addToCart('${p.id}', 1)" class="btn-card-add" style="padding: 0.4rem 0.8rem; font-size:0.8rem;">Add</button>
          </div>
        </div>
      </div>
    `;
  });
  boxElement.innerHTML = cardsHtml;
}

// Add current detail product to cart
function addCurrentToCart() {
  const options = {};
  if (selectedColor) options.Color = selectedColor;
  if (selectedSize) options.Size = selectedSize;
  
  NexaCart.addToCart(currentProduct.id, currentQuantity, options);
}

// Toggle wishlist item
function toggleCurrentWishlist() {
  const wished = NexaWishlist.toggleWishlist(currentProduct.id);
  const btn = document.getElementById('detail-wishlist-btn');
  if (btn) {
    if (wished) {
      btn.classList.add('wished');
      btn.style.color = '#ff7675';
    } else {
      btn.classList.remove('wished');
      btn.style.color = 'inherit';
    }
  }
}

// Expose handlers to window
window.switchDetailImage = switchDetailImage;
window.selectColor = selectColor;
window.selectSize = selectSize;
window.adjustQuantity = adjustQuantity;
window.switchTab = switchTab;
window.submitReview = submitReview;
window.addCurrentToCart = addCurrentToCart;
window.toggleCurrentWishlist = toggleCurrentWishlist;

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('product-detail.html')) {
    initProductDetail();
  }
});
