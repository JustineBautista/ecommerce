/*
  NexaMart E-Commerce Platform - Shop Catalog Javascript (products.js)
  Controls product listing, category filtering, search debouncing, rating sorts, and pagination.
*/

// Active filter states
let activeFilters = {
  category: "",
  search: "",
  minPrice: 0,
  maxPrice: 2000,
  rating: 0,
  sortBy: "popular"
};

let currentPage = 1;
const itemsPerPage = 9;

// Main initializer
function initCatalog() {
  // Read initial query parameters
  activeFilters.category = NexaUtils.getQueryParam('category') || "";
  activeFilters.search = NexaUtils.getQueryParam('search') || "";
  
  // Set up sidebar form elements matching these parameters
  const categorySelector = document.getElementById('filter-category');
  if (categorySelector) {
    categorySelector.value = activeFilters.category;
    categorySelector.addEventListener('change', (e) => {
      activeFilters.category = e.target.value;
      currentPage = 1;
      applyFiltersAndRender();
    });
  }
  
  // Custom Price Inputs
  const minPriceInput = document.getElementById('price-min');
  const maxPriceInput = document.getElementById('price-max');
  
  if (minPriceInput && maxPriceInput) {
    minPriceInput.addEventListener('input', NexaUtils.debounce((e) => {
      activeFilters.minPrice = parseFloat(e.target.value) || 0;
      currentPage = 1;
      applyFiltersAndRender();
    }));
    maxPriceInput.addEventListener('input', NexaUtils.debounce((e) => {
      activeFilters.maxPrice = parseFloat(e.target.value) || 2000;
      currentPage = 1;
      applyFiltersAndRender();
    }));
  }
  
  // Rating filter radio triggers
  const ratingRadios = document.querySelectorAll('input[name="filter-rating"]');
  ratingRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      activeFilters.rating = parseFloat(e.target.value) || 0;
      currentPage = 1;
      applyFiltersAndRender();
    });
  });
  
  // Shop Sorting dropdown
  const sortSelect = document.getElementById('catalog-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }
  
  applyFiltersAndRender();
}

// Perform calculations on catalog list and render
function applyFiltersAndRender() {
  let products = NexaDb.getProducts();
  
  // 1. Search Query Match
  if (activeFilters.search) {
    const q = activeFilters.search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  
  // 2. Category Match
  if (activeFilters.category) {
    products = products.filter(p => p.category === activeFilters.category);
  }
  
  // 3. Price Bounds Match
  products = products.filter(p => p.price >= activeFilters.minPrice && p.price <= activeFilters.maxPrice);
  
  // 4. Star Rating Match
  if (activeFilters.rating > 0) {
    products = products.filter(p => p.rating >= activeFilters.rating);
  }
  
  // 5. Sorting
  if (activeFilters.sortBy === "price-low") {
    products.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sortBy === "price-high") {
    products.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sortBy === "rating") {
    products.sort((a, b) => b.rating - a.rating);
  } else {
    // Default: popular / trending
    products.sort((a, b) => b.reviewCount - a.reviewCount);
  }
  
  renderProductGrid(products);
  renderPagination(products.length);
  renderActiveFilterChips();
}

// Render product card objects
function renderProductGrid(products) {
  const grid = document.querySelector('.catalog-grid');
  const countLabel = document.querySelector('.catalog-results-count');
  
  if (!grid) return;
  
  if (countLabel) {
    countLabel.textContent = `Showing ${products.length} products`;
  }
  
  if (products.length === 0) {
    grid.innerHTML = `
      <div class="flex flex-col align-center justify-center text-center gap-2" style="grid-column: 1 / -1; padding: 4rem 0;">
        <svg width="64" height="64" fill="var(--text-secondary)" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <h3>No Products Found</h3>
        <p>Try adjusting your search query or price sliders to find items.</p>
        <button onclick="resetAllFilters()" class="btn btn-secondary" style="margin-top: 1rem;">Reset Filters</button>
      </div>
    `;
    return;
  }
  
  // Implement pagination splicing
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = products.slice(startIndex, startIndex + itemsPerPage);
  
  let gridHtml = '';
  
  paginatedItems.forEach(product => {
    const isWished = NexaWishlist.isProductWished(product.id);
    const originalPriceHtml = product.discount > 0 ? 
      `<span class="product-old-price">${NexaUtils.formatCurrency(product.originalPrice)}</span>` : '';
    
    // Check if hot or new badge is relevant
    let badgeHtml = '';
    if (product.tags.includes('new')) {
      badgeHtml = `<span class="badge badge-new">New</span>`;
    } else if (product.discount >= 20) {
      badgeHtml = `<span class="badge badge-sale">-${product.discount}%</span>`;
    } else if (product.tags.includes('hot')) {
      badgeHtml = `<span class="badge badge-hot">Hot</span>`;
    }
    
    gridHtml += `
      <div class="product-card glass">
        <div class="product-image-container">
          <div class="product-badges">${badgeHtml}</div>
          <button class="wishlist-toggle-btn ${isWished ? 'wished' : ''}" 
            onclick="toggleWishItem(event, '${product.id}')" title="Add to Wishlist">
            <svg width="18" height="18" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
          <a href="product-detail.html?id=${product.id}" style="width:100%; height:100%; display:block;">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
          </a>
        </div>
        
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h4 class="product-title">
            <a href="product-detail.html?id=${product.id}">${product.name}</a>
          </h4>
          
          <div class="product-rating">
            ${NexaUtils.generateStarsHtml(product.rating)}
            <span class="review-count">(${product.reviewCount})</span>
          </div>
          
          <div class="product-footer">
            <div class="product-price-box">
              <span class="product-price">${NexaUtils.formatCurrency(product.price)}</span>
              ${originalPriceHtml}
            </div>
            <button onclick="addCardToCart(event, '${product.id}')" class="btn-card-add">
              Add
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  grid.innerHTML = gridHtml;
}

// Render pagination links
function renderPagination(totalCount) {
  const container = document.querySelector('.pagination');
  if (!container) return;
  
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }
  
  let paginationHtml = '';
  
  // Previous button
  if (currentPage > 1) {
    paginationHtml += `<button class="page-link" onclick="setPage(${currentPage - 1})">&laquo;</button>`;
  }
  
  // Numbers
  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `
      <button class="page-link ${currentPage === i ? 'active' : ''}" onclick="setPage(${i})">${i}</button>
    `;
  }
  
  // Next button
  if (currentPage < totalPages) {
    paginationHtml += `<button class="page-link" onclick="setPage(${currentPage + 1})">&raquo;</button>`;
  }
  
  container.innerHTML = paginationHtml;
}

// Active chips render
function renderActiveFilterChips() {
  const chipBox = document.querySelector('.active-filters');
  if (!chipBox) return;
  
  let chipsHtml = '';
  
  if (activeFilters.category) {
    chipsHtml += `
      <div class="filter-chip">
        Category: ${activeFilters.category}
        <span onclick="clearFilter('category')">&times;</span>
      </div>
    `;
  }
  
  if (activeFilters.search) {
    chipsHtml += `
      <div class="filter-chip">
        Search: "${activeFilters.search}"
        <span onclick="clearFilter('search')">&times;</span>
      </div>
    `;
  }
  
  if (activeFilters.minPrice > 0 || activeFilters.maxPrice < 2000) {
    chipsHtml += `
      <div class="filter-chip">
        Price: $${activeFilters.minPrice} - $${activeFilters.maxPrice}
        <span onclick="clearFilter('price')">&times;</span>
      </div>
    `;
  }
  
  if (activeFilters.rating > 0) {
    chipsHtml += `
      <div class="filter-chip">
        Rating: ${activeFilters.rating}+ ⭐
        <span onclick="clearFilter('rating')">&times;</span>
      </div>
    `;
  }
  
  chipBox.innerHTML = chipsHtml;
}

// Controller functions called on UI clicks
function setPage(page) {
  currentPage = page;
  applyFiltersAndRender();
  window.scrollTo({ top: 300, behavior: 'smooth' });
}

function clearFilter(filterKey) {
  if (filterKey === 'category') {
    activeFilters.category = '';
    const selector = document.getElementById('filter-category');
    if (selector) selector.value = '';
  } else if (filterKey === 'search') {
    activeFilters.search = '';
    const input = document.getElementById('global-search-input');
    if (input) input.value = '';
  } else if (filterKey === 'price') {
    activeFilters.minPrice = 0;
    activeFilters.maxPrice = 2000;
    const minInput = document.getElementById('price-min');
    const maxInput = document.getElementById('price-max');
    if (minInput) minInput.value = '';
    if (maxInput) maxInput.value = '';
  } else if (filterKey === 'rating') {
    activeFilters.rating = 0;
    const checkedRadio = document.querySelector('input[name="filter-rating"]:checked');
    if (checkedRadio) checkedRadio.checked = false;
  }
  currentPage = 1;
  applyFiltersAndRender();
}

function resetAllFilters() {
  activeFilters = {
    category: "",
    search: "",
    minPrice: 0,
    maxPrice: 2000,
    rating: 0,
    sortBy: "popular"
  };
  
  // Clear HTML form controls
  const selector = document.getElementById('filter-category');
  if (selector) selector.value = '';
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) searchInput.value = '';
  const minInput = document.getElementById('price-min');
  const maxInput = document.getElementById('price-max');
  if (minInput) minInput.value = '';
  if (maxInput) maxInput.value = '';
  const checkedRadio = document.querySelector('input[name="filter-rating"]:checked');
  if (checkedRadio) checkedRadio.checked = false;
  
  currentPage = 1;
  applyFiltersAndRender();
}

function toggleWishItem(event, productId) {
  event.preventDefault();
  event.stopPropagation();
  const btn = event.currentTarget;
  const isAdded = NexaWishlist.toggleWishlist(productId);
  
  if (isAdded) {
    btn.classList.add('wished');
    btn.querySelector('svg').setAttribute('fill', 'currentColor');
  } else {
    btn.classList.remove('wished');
    btn.querySelector('svg').setAttribute('fill', 'none');
  }
}

function addCardToCart(event, productId) {
  event.preventDefault();
  event.stopPropagation();
  NexaCart.addToCart(productId, 1);
}

// Expose handlers to window
window.setPage = setPage;
window.clearFilter = clearFilter;
window.resetAllFilters = resetAllFilters;
window.toggleWishItem = toggleWishItem;
window.addCardToCart = addCardToCart;

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('products.html')) {
    initCatalog();
  }
});
