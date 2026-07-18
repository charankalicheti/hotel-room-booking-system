import api from "./axios";

// ==========================================================
// Get All Reservations
// ==========================================================

export const getReservations = async () => {

  const { data } = await api.get(
    "/reception/reservations"
  );

  return data;

};

// ==========================================================
// Check In
// ==========================================================

export const checkIn = async (bookingId) => {

  const { data } = await api.put(
    `/reception/check-in/${bookingId}`
  );

  return data;

};

// ==========================================================
// Check Out
// ==========================================================

export const checkOut = async (bookingId) => {

  const { data } = await api.put(
    `/reception/check-out/${bookingId}`
  );

  return data;

};