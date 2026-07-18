import api from "./axios";

// ==========================================================
// Create Booking
// ==========================================================

export const createBooking = async (bookingData) => {

  const { data } = await api.post(
    "/bookings",
    bookingData
  );

  return data;

};

// ==========================================================
// My Bookings
// ==========================================================

export const getMyBookings = async () => {

  const { data } = await api.get(
    "/bookings/"
  );

  return data;

};

// ==========================================================
// Update Booking
// ==========================================================

export const updateBooking = async (
  bookingId,
  bookingData
) => {

  const { data } = await api.put(
    `/bookings/${bookingId}`,
    bookingData
  );

  return data;

};

// ==========================================================
// Cancel Booking
// ==========================================================

export const cancelBooking = async (
  bookingId
) => {

  const { data } = await api.delete(
    `/bookings/${bookingId}`
  );

  return data;

};

// ==========================================================
// Booking Details
// ==========================================================

export const getBookingDetails = async (
  bookingId
) => {

  const { data } = await api.get(
    `/bookings/${bookingId}`
  );

  return data;

};