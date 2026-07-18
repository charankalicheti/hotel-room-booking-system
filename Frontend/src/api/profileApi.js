import api from "./axios";

// ==========================================================
// Get Profile
// ==========================================================

export const getProfile = async () => {

  const { data } = await api.get(
    "/auth/profile"
  );

  return data;

};