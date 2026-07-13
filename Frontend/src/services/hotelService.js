import api from "./api";

// Get Hotel Details
export const getHotel = async () => {
  const response = await api.get("/hotel");
  return response.data;
};

// Update Hotel Details
export const updateHotel = async (hotelData) => {
  const response = await api.put("/hotel", hotelData);
  return response.data;
};