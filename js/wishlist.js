/*
  NexaMart E-Commerce Platform - Wishlist Management Logic (wishlist.js)
  Implements wishlist collection toggles, state synchronizations, badges updates, and cart integration.
*/

// Fetch customer's wishlist items
function getWishlist() {
  const wishlist = localStorage.getItem("nexamart_wishlist");
  return wishlist ? JSON.parse(wishlist) : [];
}

// Add/Remove item on wishlist
function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  
  if (index === -1) {
    wishlist.push(productId);
    localStorage.setItem("nexamart_wishlist", JSON.stringify(wishlist));
    NexaUtils.showToast("Product added to wishlist.", "success");
    updateWishlistBadges();
    return true; // Added
  } else {
    wishlist.splice(index, 1);
    localStorage.setItem("nexamart_wishlist", JSON.stringify(wishlist));
    NexaUtils.showToast("Product removed from wishlist.", "info");
    updateWishlistBadges();
    return false; // Removed
  }
}

// Check if a product is in the wishlist
function isProductWished(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
}

// Update wishlist counts on page headers
function updateWishlistBadges() {
  const wishlist = getWishlist();
  const badges = document.querySelectorAll('.wishlist-badge');
  badges.forEach(badge => {
    badge.textContent = wishlist.length;
    if (wishlist.length === 0) {
      badge.style.display = 'none';
    } else {
      badge.style.display = 'flex';
    }
  });
}

// Expose Wishlist APIs to window
window.NexaWishlist = {
  getWishlist,
  toggleWishlist,
  isProductWished,
  updateWishlistBadges
};

document.addEventListener('DOMContentLoaded', () => {
  updateWishlistBadges();
});
