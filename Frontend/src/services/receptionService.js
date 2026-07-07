import api from "./api";

export const checkIn = async (bookingId) => {
  const response = await api.put(
    `/reception/check-in/${bookingId}`
  );

  return response.data;
};

export const checkOut = async (bookingId) => {
  const response = await api.put(
    `/reception/check-out/${bookingId}`
  );

  return response.data;
};