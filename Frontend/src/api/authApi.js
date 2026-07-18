import api from "./axios";

// ==========================================================
// Register Customer
// ==========================================================

export const registerCustomer = async (customer) => {
  const { data } = await api.post(
    "/auth/register",
    customer
  );

  return data;
};

// ==========================================================
// Send OTP (Resend)
// ==========================================================

export const sendOTP = async (email) => {
  const { data } = await api.post(
    "/auth/send-otp",
    {
      email,
    }
  );

  return data;
};

// ==========================================================
// Verify OTP
// ==========================================================

export const verifyOTP = async (
  email,
  otp
) => {
  const { data } = await api.post(
    "/auth/verify-otp",
    {
      email,
      otp,
    }
  );

  if (data.access_token) {
    localStorage.setItem(
      "access_token",
      data.access_token
    );

    localStorage.setItem(
      "role",
      data.role
    );

    if (data.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
    }
  }

  return data;
};

// ==========================================================
// Login
// ==========================================================

export const loginCustomer = async (
  email,
  password
) => {
  const form = new URLSearchParams();

  form.append("username", email);
  form.append("password", password);

  const { data } = await api.post(
    "/auth/login",
    form,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  localStorage.setItem(
    "access_token",
    data.access_token
  );

  localStorage.setItem(
    "role",
    data.role
  );

  if (data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

// ==========================================================
// Profile
// ==========================================================

export const getProfile = async () => {
  const { data } = await api.get(
    "/auth/profile"
  );

  return data;
};

// ==========================================================
// Forgot Password
// ==========================================================

export const forgotPassword = async (
  email
) => {
  const { data } = await api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return data;
};

// ==========================================================
// Reset Password
// ==========================================================

export const resetPassword = async (
  request
) => {
  const { data } = await api.post(
    "/auth/reset-password",
    request
  );

  return data;
};

// ==========================================================
// Logout
// ==========================================================

export const logout = () => {
  localStorage.removeItem(
    "access_token"
  );

  localStorage.removeItem(
    "role"
  );

  localStorage.removeItem(
    "user"
  );

  window.location.href = "/login";
};

// ==========================================================
// Authentication Helper
// ==========================================================

export const isAuthenticated = () => {
  return !!localStorage.getItem(
    "access_token"
  );
};

// ==========================================================
// Get Token
// ==========================================================

export const getToken = () => {
  return localStorage.getItem(
    "access_token"
  );
};

// ==========================================================
// Get Role
// ==========================================================

export const getRole = () => {
  return localStorage.getItem("role");
};

// ==========================================================
// Get Current User
// ==========================================================

export const getCurrentUser = () => {
  const user = localStorage.getItem(
    "user"
  );

  return user ? JSON.parse(user) : null;
};