/*
  NexaMart E-Commerce Platform - Wishlist Page Script (wishlist-page.js)
  Renders catalog cards matching user's stored wishlist product IDs.
*/

function renderWishlistPage() {
  const container = document.getElementById('wishlist-grid');
  if (!container) return;
  
  const wishlistIds = NexaWishlist.getWishlist();
  const products = NexaDb.getProducts();
  const wishedProducts = products.filter(p => wishlistIds.includes(p.id));
  
  if (wishedProducts.length === 0) {
    container.style.display = 'block';
    container.innerHTML = `
      <div class="flex flex-col align-center justify-center text-center gap-2" style="padding: 4rem 0;">
        <svg width="64" height="64" fill="var(--text-secondary)" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <h3>Your Wishlist is Empty</h3>
        <p>Browse through our collection to add your favorite items to this section.</p>
        <a href="products.html" class="btn btn-primary" style="margin-top:1.5rem;">Explore Shop</a>
      </div>
    `;
    return;
  }
  
  container.style.display = 'grid';
  let cardsHtml = '';
  
  wishedProducts.forEach(p => {
    const originalPriceHtml = p.discount > 0 ? 
      `<span class="product-old-price">${NexaUtils.formatCurrency(p.originalPrice)}</span>` : '';
      
    cardsHtml += `
      <div class="product-card glass" id="wish-card-${p.id}">
        <div class="product-image-container">
          <button class="wishlist-toggle-btn wished" 
            onclick="removeWishlistPageItem(event, '${p.id}')" title="Remove from Wishlist">
            <svg width="18" height="18" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <a href="product-detail.html?id=${p.id}" style="width:100%; height:100%; display:block;">
            <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
          </a>
        </div>
        
        <div class="product-info">
          <span class="product-category">${p.category}</span>
          <h4 class="product-title">
            <a href="product-detail.html?id=${p.id}">${p.name}</a>
          </h4>
          
          <div class="product-rating">
            ${NexaUtils.generateStarsHtml(p.rating)}
            <span class="review-count">(${p.reviewCount})</span>
          </div>
          
          <div class="product-footer">
            <div class="product-price-box">
              <span class="product-price">${NexaUtils.formatCurrency(p.price)}</span>
              ${originalPriceHtml}
            </div>
            <button onclick="window.NexaCart.addToCart('${p.id}', 1)" class="btn-card-add">
              Buy
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = cardsHtml;
}

function removeWishlistPageItem(event, productId) {
  event.preventDefault();
  event.stopPropagation();
  
  NexaWishlist.toggleWishlist(productId);
  
  const card = document.getElementById(`wish-card-${productId}`);
  if (card) {
    card.style.transform = 'scale(0.8)';
    card.style.opacity = '0';
    setTimeout(() => {
      renderWishlistPage();
    }, 300);
  }
}

window.removeWishlistPageItem = removeWishlistPageItem;

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('wishlist.html')) {
    renderWishlistPage();
  }
});
