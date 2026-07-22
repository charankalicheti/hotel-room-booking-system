import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  getRole,
  getToken,
  logout as logoutUser,
} from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [role, setRole] = useState(null);

  const [loading, setLoading] = useState(true);

  // ===========================================
  // Load Auth Data On Refresh
  // ===========================================

  useEffect(() => {
    const savedToken = getToken();

    const savedRole = getRole();

    const savedUser = getCurrentUser();

    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole);
      setUser(savedUser);
    }

    setLoading(false);
  }, []);

  // ===========================================
  // Login
  // ===========================================

  const login = (accessToken, userData) => {
    localStorage.setItem(
      "access_token",
      accessToken
    );

    localStorage.setItem(
      "role",
      userData.role
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setToken(accessToken);

    setRole(userData.role);

    setUser(userData);
  };

  // ===========================================
  // Logout
  // ===========================================

  const logout = () => {
    logoutUser();

    setToken(null);

    setRole(null);

    setUser(null);

    navigate("/", { replace: true });
    window.location.assign("/");
  };

  // ===========================================
  // Helpers
  // ===========================================

  const isAuthenticated = !!token;

  const isAdmin = role === "admin";

  const isCustomer = role === "customer";
    // ===========================================
  // Context Value
  // ===========================================

  const value = useMemo(
    () => ({
      user,
      token,
      role,
      loading,

      login,
      logout,

      isAuthenticated,
      isAdmin,
      isCustomer,
    }),
    [
      user,
      token,
      role,
      loading,
      isAuthenticated,
      isAdmin,
      isCustomer,
    ]
  );

  // ===========================================
  // Loading Screen
  // ===========================================

  if (loading) {
    return null;
  }

  // ===========================================
  // Provider
  // ===========================================

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ===========================================
// Custom Hook
// ===========================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export default AuthContext;