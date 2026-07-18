import api from "./axios";

/**
 * Get Admin Dashboard Report
 */
export const getDashboardReport = async () => {
  const response = await api.get("/reports/dashboard");
  return response.data;
};