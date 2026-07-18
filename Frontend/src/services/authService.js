// =========================================
// Save JWT Token
// =========================================

export const saveToken = (token) => {
  localStorage.setItem("access_token", token);
};

// =========================================
// Get JWT Token
// =========================================

export const getToken = () => {
  return localStorage.getItem("access_token");
};

// =========================================
// Remove JWT Token
// =========================================

export const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
};

// =========================================
// Check Login
// =========================================

export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

// =========================================
// Get User Role
// =========================================

export const getUserRole = () => {
  return localStorage.getItem("role");
};

// =========================================
// Get Logged In User
// =========================================

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};