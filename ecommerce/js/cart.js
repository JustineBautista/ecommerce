/*
  NexaMart E-Commerce Platform - Shopping Cart Logic (cart.js)
  Supports item additions, quantity adjustments, calculations (subtotal, shipping, promo code application), and slide-out cart drawer render.
*/

// Fetch customer's cart items
function getCart() {
  const cart = localStorage.getItem("nexamart_cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart items
function saveCart(cart) {
  localStorage.setItem("nexamart_cart", JSON.stringify(cart));
  updateCartIndicators();
  renderCartDrawer();
}

// Add item to cart
function addToCart(productId, quantity = 1, options = {}) {
  const cart = getCart();
  const products = NexaDb.getProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    NexaUtils.showToast("Product not found.", "error");
    return;
  }
  
  if (product.stock < quantity) {
    NexaUtils.showToast(`Insufficient stock. Only ${product.stock} available.`, "error");
    return;
  }
  
  // Unique cart item identifier (product + selected options)
  const optionId = JSON.stringify(options);
  const existingIndex = cart.findIndex(item => item.id === productId && JSON.stringify(item.options) === optionId);
  
  if (existingIndex > -1) {
    if (product.stock < cart[existingIndex].quantity + quantity) {
      NexaUtils.showToast(`Cannot add more. Total in cart exceeds available stock (${product.stock}).`, "error");
      return;
    }
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      options: options,
      discount: product.discount
    });
  }
  
  saveCart(cart);
  NexaUtils.showToast(`${product.name} added to cart!`, "success");
  
  // Auto-open cart drawer
  openCartDrawer();
}

// Adjust item quantity
function updateQuantity(productId, optionIdString, newQty) {
  const cart = getCart();
  const products = NexaDb.getProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product) return;
  
  const index = cart.findIndex(item => item.id === productId && JSON.stringify(item.options) === optionIdString);
  
  if (index > -1) {
    if (newQty <= 0) {
      cart.splice(index, 1);
      NexaUtils.showToast("Item removed from cart.", "info");
    } else {
      if (product.stock < newQty) {
        NexaUtils.showToast(`Only ${product.stock} items are in stock.`, "error");
        return;
      }
      cart[index].quantity = newQty;
    }
    saveCart(cart);
  }
}

// Remove item completely
function removeItem(productId, optionIdString) {
  const cart = getCart();
  const index = cart.findIndex(item => item.id === productId && JSON.stringify(item.options) === optionIdString);
  
  if (index > -1) {
    cart.splice(index, 1);
    saveCart(cart);
    NexaUtils.showToast("Item removed from cart.", "info");
  }
}

// Clear cart completely
function clearCart() {
  saveCart([]);
}

// Calculations
function getCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Simple pricing parameters
  const shipping = subtotal > 100 ? 0 : (subtotal > 0 ? 9.99 : 0);
  const tax = subtotal * 0.08; // 8% sales tax
  
  // Check for discount codes
  let discountPercentage = 0;
  const promo = localStorage.getItem("nexamart_active_promo");
  if (promo === "WELCOME10") {
    discountPercentage = 10;
  } else if (promo === "NEXTSPRING") {
    discountPercentage = 15;
  }
  
  const discountVal = subtotal * (discountPercentage / 100);
  const total = subtotal + shipping + tax - discountVal;
  
  return {
    subtotal,
    shipping,
    tax,
    discountVal,
    discountPercentage,
    total,
    itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
  };
}

// Apply promo code
function applyPromoCode(code) {
  const cleanCode = code.trim().toUpperCase();
  if (cleanCode === "WELCOME10" || cleanCode === "NEXTSPRING") {
    localStorage.setItem("nexamart_active_promo", cleanCode);
    saveCart(getCart()); // Trigger re-draws
    return { success: true, message: `Coupon ${cleanCode} applied successfully!` };
  }
  return { success: false, message: "Invalid coupon code." };
}

// Header Badges sync
function updateCartIndicators() {
  const totals = getCartTotals();
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = totals.itemCount;
    if (totals.itemCount === 0) {
      badge.style.display = 'none';
    } else {
      badge.style.display = 'flex';
    }
  });
}

// Cart drawer slide controllers
function openCartDrawer() {
  const backdrop = document.querySelector('.drawer-backdrop');
  const drawer = document.querySelector('.drawer');
  if (backdrop && drawer) {
    backdrop.classList.add('active');
    drawer.classList.add('active');
  }
}

function closeCartDrawer() {
  const backdrop = document.querySelector('.drawer-backdrop');
  const drawer = document.querySelector('.drawer');
  if (backdrop && drawer) {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
  }
}

// Render products list inside slide drawer
function renderCartDrawer() {
  const drawerBody = document.querySelector('.drawer-body');
  if (!drawerBody) return;
  
  const cart = getCart();
  const totals = getCartTotals();
  
  if (cart.length === 0) {
    drawerBody.innerHTML = `
      <div class="flex flex-col align-center justify-center text-center gap-2" style="height:100%; min-height: 250px;">
        <svg width="64" height="64" fill="var(--text-secondary)" viewBox="0 0 24 24">
          <path d="M17.21 9l-4.38-6.56c-.18-.27-.51-.44-.83-.44-.32 0-.65.17-.83.44L6.79 9H2c-.55 0-1 .45-1 1v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.5L15 9H9zm11 11H4v-8h16v8zm-8-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
        </svg>
        <p style="margin-top: 1rem;">Your shopping cart is empty.</p>
        <button onclick="window.NexaCart.closeCartDrawer()" class="btn btn-primary" style="margin-top: 0.5rem;">Continue Shopping</button>
      </div>
    `;
    
    // Update summary labels to 0
    updateSummaryLabels(totals);
    return;
  }
  
  let cartHtml = '<div class="flex flex-col gap-2">';
  
  cart.forEach(item => {
    const optId = JSON.stringify(item.options);
    const optionsText = Object.entries(item.options)
      .map(([k, v]) => `<span class="badge" style="background:rgba(255,255,255,0.05); color:var(--text-secondary); margin-right:4px;">${k}: ${v}</span>`)
      .join('');
      
    cartHtml += `
      <div class="cart-item-row" style="grid-template-columns: 60px 1fr auto; padding: 1rem 0;">
        <div class="cart-item-img" style="width:60px; height:60px;">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <a href="product-detail.html?id=${item.id}" class="cart-item-title" style="font-size: 0.9rem;">${item.name}</a>
          <div style="margin-top:0.25rem;">${optionsText}</div>
          <span style="font-weight:700; color:var(--secondary); margin-top:0.4rem; font-size:0.9rem;">${NexaUtils.formatCurrency(item.price)}</span>
        </div>
        <div class="flex flex-col align-center justify-between" style="height:60px;">
          <button onclick="window.NexaCart.removeItem('${item.id}', '${optId.replace(/'/g, "\\'")}')" style="color:var(--danger); cursor:pointer;">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
          <div class="quantity-selector" style="transform: scale(0.85); transform-origin: right bottom;">
            <button class="qty-btn" onclick="window.NexaCart.updateQuantity('${item.id}', '${optId.replace(/'/g, "\\'")}', ${item.quantity - 1})">-</button>
            <span class="qty-input">${item.quantity}</span>
            <button class="qty-btn" onclick="window.NexaCart.updateQuantity('${item.id}', '${optId.replace(/'/g, "\\'")}', ${item.quantity + 1})">+</button>
          </div>
        </div>
      </div>
    `;
  });
  
  cartHtml += '</div>';
  drawerBody.innerHTML = cartHtml;
  
  updateSummaryLabels(totals);
}

// Update totals summary box labels
function updateSummaryLabels(totals) {
  const subtotalLabel = document.getElementById('drawer-subtotal');
  const discountRow = document.getElementById('drawer-discount-row');
  const discountLabel = document.getElementById('drawer-discount');
  const shippingLabel = document.getElementById('drawer-shipping');
  const taxLabel = document.getElementById('drawer-tax');
  const totalLabel = document.getElementById('drawer-total');
  
  if (subtotalLabel) subtotalLabel.textContent = NexaUtils.formatCurrency(totals.subtotal);
  
  if (totals.discountVal > 0) {
    if (discountRow) discountRow.style.display = 'flex';
    if (discountLabel) discountLabel.textContent = `-${NexaUtils.formatCurrency(totals.discountVal)}`;
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }
  
  if (shippingLabel) {
    shippingLabel.textContent = totals.shipping === 0 ? "FREE" : NexaUtils.formatCurrency(totals.shipping);
  }
  if (taxLabel) taxLabel.textContent = NexaUtils.formatCurrency(totals.tax);
  if (totalLabel) totalLabel.textContent = NexaUtils.formatCurrency(totals.total);
}

// Expose Cart APIs to window
window.NexaCart = {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
  getCartTotals,
  applyPromoCode,
  openCartDrawer,
  closeCartDrawer,
  renderCartDrawer
};

document.addEventListener('DOMContentLoaded', () => {
  // Bind Drawer components triggers if they exist on the page
  const backdrop = document.querySelector('.drawer-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeCartDrawer);
  }
  updateCartIndicators();
  renderCartDrawer();
});
