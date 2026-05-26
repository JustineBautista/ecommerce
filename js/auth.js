/*
  NexaMart E-Commerce Platform - Authentication Logic (auth.js)
  Manages register, login, session states, profile data, and administrator permissions using localStorage.
*/

// Fetch users list or seed initial admin account
function getUsers() {
  if (!localStorage.getItem("nexamart_users")) {
    const defaultUsers = [
      {
        email: "admin@nexamart.com",
        password: "adminpassword", // In production use proper crypto/hashes
        name: "Nexa Admin",
        isAdmin: true
      },
      {
        email: "user@nexamart.com",
        password: "userpassword",
        name: "Jane Doe",
        isAdmin: false
      }
    ];
    localStorage.setItem("nexamart_users", JSON.stringify(defaultUsers));
  }
  return JSON.parse(localStorage.getItem("nexamart_users"));
}

// Save users list
function saveUsers(users) {
  localStorage.setItem("nexamart_users", JSON.stringify(users));
}

// Get currently logged-in user
function getCurrentUser() {
  const user = localStorage.getItem("nexamart_current_user");
  return user ? JSON.parse(user) : null;
}

// Log in user
function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  
  if (user) {
    // Save to current session (localStorage)
    const sessionUser = { ...user };
    delete sessionUser.password; // Do not store credentials in session object
    localStorage.setItem("nexamart_current_user", JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  }
  return { success: false, error: "Invalid email or password." };
}

// Register user
function registerUser(name, email, password) {
  const users = getUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (exists) {
    return { success: false, error: "An account with this email already exists." };
  }
  
  const newUser = {
    name,
    email,
    password,
    isAdmin: false
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Auto-login registered user
  const sessionUser = { ...newUser };
  delete sessionUser.password;
  localStorage.setItem("nexamart_current_user", JSON.stringify(sessionUser));
  
  return { success: true, user: sessionUser };
}

// Log out user
function logoutUser() {
  localStorage.removeItem("nexamart_current_user");
  window.location.reload();
}

// Expose Auth APIs to window
window.NexaAuth = {
  getUsers,
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser
};
