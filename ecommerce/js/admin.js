/*
  NexaMart E-Commerce Platform - Admin Dashboard Javascript (admin.js)
  Supports computing overall analytics metrics, custom drawing of CSS charts, adding/editing/deleting products (CRUD), and listing orders records.
*/

let adminProducts = [];
let adminOrders = [];

// Init dashboard views
function initAdmin() {
  const user = NexaAuth.getCurrentUser();
  if (!user || !user.isAdmin) {
    NexaUtils.showToast("Unauthorized Access. Redirecting home.", "error");
    setTimeout(() => window.location.href = 'index.html', 1500);
    return;
  }
  
  // Display Username in header
  const title = document.querySelector('.admin-title');
  if (title) title.textContent = `NexaMart Hub — Welcome back, ${user.name}`;
  
  refreshAdminData();
  switchAdminTab('metrics');
}

function refreshAdminData() {
  adminProducts = NexaDb.getProducts();
  adminOrders = NexaDb.getOrders();
  
  calculateMetrics();
  renderProductsTable();
  renderOrdersTable();
  renderSalesChart();
}

// Compute metrics totals
function calculateMetrics() {
  const revenueVal = document.getElementById('admin-revenue');
  const ordersVal = document.getElementById('admin-orders-count');
  const productsVal = document.getElementById('admin-products-count');
  const stockVal = document.getElementById('admin-stock-value');
  
  const totalRevenue = adminOrders.reduce((sum, o) => sum + o.totals.total, 0);
  const totalStockVal = adminProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const totalOrders = adminOrders.length;
  const totalProducts = adminProducts.length;
  
  if (revenueVal) revenueVal.textContent = NexaUtils.formatCurrency(totalRevenue);
  if (ordersVal) ordersVal.textContent = totalOrders;
  if (productsVal) productsVal.textContent = totalProducts;
  if (stockVal) stockVal.textContent = NexaUtils.formatCurrency(totalStockVal);
}

// Render dynamic CSS bar charts
function renderSalesChart() {
  const chart = document.getElementById('sales-css-chart');
  if (!chart) return;
  
  // Compute category distributions
  const categoryRevenue = {};
  adminOrders.forEach(order => {
    order.items.forEach(item => {
      const prod = adminProducts.find(p => p.id === item.id);
      const cat = prod ? prod.category : "General";
      categoryRevenue[cat] = (categoryRevenue[cat] || 0) + (item.price * item.quantity);
    });
  });
  
  // Standard categories
  const categories = ["Electronics", "Fashion", "Home & Living", "Sports & Outdoors", "Books & Media", "Beauty & Health"];
  
  // Get maximum value to scale heights
  const maxRev = Math.max(...categories.map(c => categoryRevenue[c] || 0), 100);
  
  let chartHtml = '';
  categories.forEach(cat => {
    const revenue = categoryRevenue[cat] || 0;
    // Calculate percentage height
    const heightPercent = Math.min(100, Math.max(10, (revenue / maxRev) * 100));
    
    chartHtml += `
      <div class="chart-bar-container">
        <div class="chart-bar" style="height:${heightPercent}%;" data-value="${NexaUtils.formatCurrency(revenue)}"></div>
        <span class="chart-label">${cat.split(' ')[0]}</span>
      </div>
    `;
  });
  
  chart.innerHTML = chartHtml;
}

// Render administrative lists
function renderProductsTable() {
  const tbody = document.getElementById('admin-products-tbody');
  if (!tbody) return;
  
  let tbodyHtml = '';
  
  adminProducts.forEach(p => {
    tbodyHtml += `
      <tr>
        <td style="font-weight:600; color:var(--text-primary);">${p.id}</td>
        <td>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <img src="${p.images[0]}" alt="${p.name}" style="width:36px; height:36px; border-radius:4px; object-fit:cover;">
            <div>
              <p style="font-weight:600; margin:0; font-size:0.9rem;">${p.name}</p>
              <span style="font-size:0.75rem; color:var(--text-secondary);">${p.brand}</span>
            </div>
          </div>
        </td>
        <td>${p.category}</td>
        <td style="font-weight:700; color:var(--secondary);">${NexaUtils.formatCurrency(p.price)}</td>
        <td>
          <span class="badge ${p.stock < 10 ? 'badge-sale' : 'badge-new'}" style="padding: 0.15rem 0.5rem; font-size:0.7rem;">
            ${p.stock} units
          </span>
        </td>
        <td>
          <div class="flex gap-2">
            <button onclick="editProductPrompt('${p.id}')" style="color:var(--secondary); cursor:pointer; font-weight:600;">Edit</button>
            <button onclick="deleteProductPrompt('${p.id}')" style="color:var(--danger); cursor:pointer; font-weight:600;">Delete</button>
          </div>
        </td>
      </tr>
    `;
  });
  
  tbody.innerHTML = tbodyHtml;
}

function renderOrdersTable() {
  const tbody = document.getElementById('admin-orders-tbody');
  if (!tbody) return;
  
  if (adminOrders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 2rem 0; color:var(--text-secondary);">No client orders received yet.</td>
      </tr>
    `;
    return;
  }
  
  let tbodyHtml = '';
  adminOrders.forEach(o => {
    tbodyHtml += `
      <tr>
        <td style="font-weight:600; color:var(--text-primary);">${o.orderId}</td>
        <td>${o.date}</td>
        <td>
          <div>
            <p style="font-weight:600; margin:0; font-size:0.9rem;">${o.customerName}</p>
            <span style="font-size:0.75rem; color:var(--text-secondary);">${o.customerEmail}</span>
          </div>
        </td>
        <td>
          <span style="font-size:0.85rem; color:var(--text-secondary);">
            ${o.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
          </span>
        </td>
        <td style="font-weight:700; color:var(--secondary);">${NexaUtils.formatCurrency(o.totals.total)}</td>
        <td>
          <span class="badge badge-hot" style="padding: 0.2rem 0.6rem; font-size:0.75rem;">
            ${o.status}
          </span>
        </td>
      </tr>
    `;
  });
  
  tbody.innerHTML = tbodyHtml;
}

// Tabs switcher
function switchAdminTab(tabId) {
  const btns = document.querySelectorAll('.admin-menu-btn');
  const panels = document.querySelectorAll('.admin-panel');
  
  btns.forEach(b => b.classList.remove('active'));
  panels.forEach(p => p.style.display = 'none');
  
  const activeBtn = Array.from(btns).find(b => b.getAttribute('onclick').includes(tabId));
  if (activeBtn) activeBtn.classList.add('active');
  
  const targetPanel = document.getElementById(`panel-${tabId}`);
  if (targetPanel) targetPanel.style.display = 'block';
}

// Product add modal controls
function openAddModal() {
  const modal = document.getElementById('admin-product-modal');
  if (modal) {
    modal.classList.add('active');
    // Clear forms inputs
    document.getElementById('prod-form-id').value = '';
    document.getElementById('prod-form-name').value = '';
    document.getElementById('prod-form-brand').value = '';
    document.getElementById('prod-form-category').value = 'Electronics';
    document.getElementById('prod-form-price').value = '';
    document.getElementById('prod-form-stock').value = '';
    document.getElementById('prod-form-desc').value = '';
    document.getElementById('prod-form-image').value = '';
  }
}

function closeModal() {
  const modal = document.getElementById('admin-product-modal');
  if (modal) modal.classList.remove('active');
}

// Save/Update product CRUD
function saveProductForm(event) {
  event.preventDefault();
  
  const id = document.getElementById('prod-form-id').value;
  const name = document.getElementById('prod-form-name').value.trim();
  const brand = document.getElementById('prod-form-brand').value.trim();
  const category = document.getElementById('prod-form-category').value;
  const price = parseFloat(document.getElementById('prod-form-price').value);
  const stock = parseInt(document.getElementById('prod-form-stock').value);
  const desc = document.getElementById('prod-form-desc').value.trim();
  const image = document.getElementById('prod-form-image').value.trim() || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80";
  
  if (!name || !brand || isNaN(price) || isNaN(stock)) {
    NexaUtils.showToast("Please fill all required inputs correctly.", "error");
    return;
  }
  
  let products = NexaDb.getProducts();
  
  if (id) {
    // Edit Mode
    const index = products.findIndex(p => p.id === id);
    if (index > -1) {
      products[index] = {
        ...products[index],
        name,
        brand,
        category,
        price,
        stock,
        description: desc,
        images: [image]
      };
      NexaUtils.showToast("Product updated successfully.", "success");
    }
  } else {
    // Add Mode
    const newId = `prod-custom-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProduct = {
      id: newId,
      name,
      price,
      originalPrice: price,
      discount: 0,
      category,
      subcategory: "General",
      brand,
      rating: 5.0,
      reviewCount: 0,
      description: desc,
      specs: { "Origin": "Admin Seeded" },
      images: [image],
      stock,
      tags: ["new"],
      dateAdded: new Date().toISOString().split('T')[0]
    };
    products.unshift(newProduct);
    NexaUtils.showToast("New product created successfully.", "success");
  }
  
  NexaDb.saveProducts(products);
  closeModal();
  refreshAdminData();
}

// Edit existing trigger
function editProductPrompt(productId) {
  const p = adminProducts.find(item => item.id === productId);
  if (!p) return;
  
  openAddModal();
  
  document.getElementById('prod-form-id').value = p.id;
  document.getElementById('prod-form-name').value = p.name;
  document.getElementById('prod-form-brand').value = p.brand;
  document.getElementById('prod-form-category').value = p.category;
  document.getElementById('prod-form-price').value = p.price;
  document.getElementById('prod-form-stock').value = p.stock;
  document.getElementById('prod-form-desc').value = p.description;
  document.getElementById('prod-form-image').value = p.images[0];
}

// Delete trigger
function deleteProductPrompt(productId) {
  if (confirm("Are you sure you want to remove this product?")) {
    let products = NexaDb.getProducts();
    products = products.filter(p => p.id !== productId);
    NexaDb.saveProducts(products);
    NexaUtils.showToast("Product deleted successfully.", "info");
    refreshAdminData();
  }
}

// Expose handlers to window
window.switchAdminTab = switchAdminTab;
window.openAddModal = openAddModal;
window.closeModal = closeModal;
window.saveProductForm = saveProductForm;
window.editProductPrompt = editProductPrompt;
window.deleteProductPrompt = deleteProductPrompt;

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('admin.html')) {
    initAdmin();
  }
});
