/*
  NexaMart E-Commerce Platform - Checkout Flow Logic (checkout.js)
  Supports multi-step form tracking (Shipping -> Payment -> Review -> Completed), validates fields, calculates tax/shipping parameters, and saves final orders.
*/

let currentStep = 1;
const orderDetails = {
  shippingAddress: {},
  paymentDetails: {},
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  discount: 0,
  total: 0
};

// Check empty cart redirects and draw checkout summaries
function initCheckout() {
  const cart = NexaCart.getCart();
  if (cart.length === 0) {
    NexaUtils.showToast("Your cart is empty. Redirecting to Shop.", "info");
    setTimeout(() => window.location.href = 'products.html', 1500);
    return;
  }
  
  // Prep order detail structures
  const totals = NexaCart.getCartTotals();
  orderDetails.items = cart;
  orderDetails.subtotal = totals.subtotal;
  orderDetails.shipping = totals.shipping;
  orderDetails.tax = totals.tax;
  orderDetails.discount = totals.discountVal;
  orderDetails.total = totals.total;
  
  renderCheckoutSummary();
  updateStepIndicator();
}

// Render right side summary cards
function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-list');
  const subtotalVal = document.getElementById('checkout-subtotal');
  const discountRow = document.getElementById('checkout-discount-row');
  const discountVal = document.getElementById('checkout-discount');
  const shippingVal = document.getElementById('checkout-shipping');
  const taxVal = document.getElementById('checkout-tax');
  const totalVal = document.getElementById('checkout-total');
  
  if (container) {
    let itemsHtml = '';
    orderDetails.items.forEach(item => {
      itemsHtml += `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; font-size:0.9rem;">
          <div style="max-width:70%;">
            <p style="font-weight:600; margin-bottom:0.15rem; color:var(--text-primary);">${item.name}</p>
            <span style="font-size:0.75rem; color:var(--text-secondary);">Qty: ${item.quantity}</span>
          </div>
          <span style="font-weight:700;">${NexaUtils.formatCurrency(item.price * item.quantity)}</span>
        </div>
      `;
    });
    container.innerHTML = itemsHtml;
  }
  
  if (subtotalVal) subtotalVal.textContent = NexaUtils.formatCurrency(orderDetails.subtotal);
  if (orderDetails.discount > 0) {
    if (discountRow) discountRow.style.display = 'flex';
    if (discountVal) discountVal.textContent = `-${NexaUtils.formatCurrency(orderDetails.discount)}`;
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }
  if (shippingVal) {
    shippingVal.textContent = orderDetails.shipping === 0 ? "FREE" : NexaUtils.formatCurrency(orderDetails.shipping);
  }
  if (taxVal) taxVal.textContent = NexaUtils.formatCurrency(orderDetails.tax);
  if (totalVal) totalVal.textContent = NexaUtils.formatCurrency(orderDetails.total);
}

// Multi-step panels navigation
function nextStep() {
  if (currentStep === 1) {
    // Validate shipping
    if (!validateShippingForm()) {
      NexaUtils.showToast("Please fill all required shipping fields.", "error");
      return;
    }
    currentStep = 2;
  } else if (currentStep === 2) {
    // Validate payment
    if (!validatePaymentForm()) {
      NexaUtils.showToast("Please fill all required payment fields.", "error");
      return;
    }
    currentStep = 3;
    renderFinalReview();
  } else if (currentStep === 3) {
    submitFinalOrder();
    return;
  }
  
  updateStepIndicator();
  switchStepPanels();
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepIndicator();
    switchStepPanels();
  }
}

// Validate text fields input elements
function validateShippingForm() {
  const firstName = document.getElementById('ship-firstname')?.value.trim();
  const lastName = document.getElementById('ship-lastname')?.value.trim();
  const address = document.getElementById('ship-address')?.value.trim();
  const city = document.getElementById('ship-city')?.value.trim();
  const zip = document.getElementById('ship-zip')?.value.trim();
  const phone = document.getElementById('ship-phone')?.value.trim();
  
  if (!firstName || !lastName || !address || !city || !zip || !phone) return false;
  
  orderDetails.shippingAddress = {
    name: `${firstName} ${lastName}`,
    address,
    city,
    zip,
    phone
  };
  return true;
}

function validatePaymentForm() {
  const cardName = document.getElementById('pay-name')?.value.trim();
  const cardNumber = document.getElementById('pay-card')?.value.trim();
  const expiry = document.getElementById('pay-expiry')?.value.trim();
  const cvv = document.getElementById('pay-cvv')?.value.trim();
  
  if (!cardName || !cardNumber || !expiry || !cvv) return false;
  
  orderDetails.paymentDetails = {
    cardName,
    cardNumber: `**** **** **** ${cardNumber.slice(-4)}`
  };
  return true;
}

// Step visual states update
function updateStepIndicator() {
  const steps = document.querySelectorAll('.checkout-step');
  steps.forEach((step, index) => {
    const stepNum = index + 1;
    step.classList.remove('active', 'completed');
    
    if (stepNum === currentStep) {
      step.classList.add('active');
    } else if (stepNum < currentStep) {
      step.classList.add('completed');
    }
  });
}

function switchStepPanels() {
  const panels = document.querySelectorAll('.checkout-panel');
  panels.forEach((panel, index) => {
    if (index + 1 === currentStep) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });
}

// Final overview tab summary injection
function renderFinalReview() {
  const container = document.getElementById('final-review-content');
  if (!container) return;
  
  const ship = orderDetails.shippingAddress;
  const pay = orderDetails.paymentDetails;
  
  container.innerHTML = `
    <div style="margin-bottom:2rem;">
      <h4 style="border-bottom:1px solid var(--glass-border); padding-bottom:0.5rem; margin-bottom:1rem; color:var(--secondary);">Shipping Information</h4>
      <p style="color:var(--text-primary); font-weight:600;">${ship.name}</p>
      <p>${ship.address}</p>
      <p>${ship.city}, Zip: ${ship.zip}</p>
      <p>Phone: ${ship.phone}</p>
    </div>
    
    <div>
      <h4 style="border-bottom:1px solid var(--glass-border); padding-bottom:0.5rem; margin-bottom:1rem; color:var(--secondary);">Payment Details</h4>
      <p>Cardholder: ${pay.cardName}</p>
      <p>Card Number: ${pay.cardNumber}</p>
    </div>
  `;
}

// Push order transaction to database
function submitFinalOrder() {
  const user = NexaAuth.getCurrentUser();
  const orderObj = {
    orderId: `NEXA-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toISOString().split('T')[0],
    customerName: orderDetails.shippingAddress.name,
    customerEmail: user ? user.email : "guest@nexamart.com",
    shippingAddress: orderDetails.shippingAddress,
    items: orderDetails.items,
    totals: {
      subtotal: orderDetails.subtotal,
      shipping: orderDetails.shipping,
      tax: orderDetails.tax,
      discount: orderDetails.discount,
      total: orderDetails.total
    },
    status: "Processing"
  };
  
  // Append to localStorage Orders Database
  NexaDb.addOrder(orderObj);
  
  // Clear Cart
  NexaCart.clearCart();
  
  // Display Success Page contents
  renderOrderSuccess(orderObj.orderId);
}

function renderOrderSuccess(orderId) {
  const fullLayout = document.querySelector('.checkout-layout');
  if (!fullLayout) return;
  
  fullLayout.style.display = 'block';
  fullLayout.innerHTML = `
    <div class="glass flex flex-col align-center justify-center text-center gap-4" style="max-width:650px; margin: 4rem auto; padding: 4rem 3rem;">
      <div class="pulse-indicator" style="color:var(--success);">
        <svg width="72" height="72" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="stroke-width:1.5;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      
      <h2 class="text-gradient">Thank You For Your Order!</h2>
      <p style="font-size:1.1rem; line-height:1.7;">Your order has been placed successfully and is currently being processed. An confirmation receipt has been sent to your email.</p>
      
      <div class="glass" style="width:100%; padding:1.5rem; background:rgba(255,255,255,0.02); text-align:left; margin:1rem 0;">
        <p style="margin-bottom:0.5rem;"><strong style="color:var(--text-primary);">Order Reference:</strong> ${orderId}</p>
        <p style="margin-bottom:0.5rem;"><strong style="color:var(--text-primary);">Delivery Name:</strong> ${orderDetails.shippingAddress.name}</p>
        <p style="margin-bottom:0;"><strong style="color:var(--text-primary);">Amount Paid:</strong> ${NexaUtils.formatCurrency(orderDetails.total)}</p>
      </div>
      
      <div class="flex gap-2" style="width:100%; margin-top:1rem;">
        <a href="products.html" class="btn btn-primary" style="flex:1;">Continue Shopping</a>
        <a href="index.html" class="btn btn-secondary" style="flex:1;">Return Home</a>
      </div>
    </div>
  `;
  
  // Set Steps completed
  const steps = document.querySelectorAll('.checkout-step');
  steps.forEach(s => s.classList.add('completed'));
}

// Expose handlers to window
window.nextStep = nextStep;
window.prevStep = prevStep;

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('checkout.html')) {
    initCheckout();
  }
});
