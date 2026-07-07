import api from "./api";

// Login
export const loginUser = async (username, password) => {
  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);

  const response = await api.post(
    "/auth/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

// Register
export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// Get Logged-in User Profile
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};