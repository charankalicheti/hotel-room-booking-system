import api from "./api";

// Create Booking
export const createBooking = async (bookingData) => {
  const response = await api.post(
    "/bookings",
    bookingData
  );

  return response.data;
};

// Get Logged-in Customer Bookings
export const getCustomerBookings = async (customerId) => {
  const response = await api.get(
    `/bookings/${customerId}`
  );

  return response.data;
};

// Cancel Booking
export const cancelBooking = async (bookingId) => {
  const response = await api.put(
    `/bookings/${bookingId}/cancel`
  );

  return response.data;
};

// Delete Booking (Admin)
export const deleteBooking = async (bookingId) => {
  const response = await api.delete(
    `/bookings/${bookingId}`
  );

  return response.data;
};
export const getBookingById = async (customerId, bookingId) => {
  const bookings = await getCustomerBookings(customerId);

  return bookings.find(
    (booking) => booking.id === Number(bookingId)
  );
};