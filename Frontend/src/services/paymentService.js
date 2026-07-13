import api from "./api";

// Make Payment
export const makePayment = async (paymentData) => {
  const response = await api.post("/payments", paymentData);
  return response.data;
};

// Get Payment Details
export const getPaymentDetails = async (reservationId) => {
  const response = await api.get(`/payments/${reservationId}`);
  return response.data;
};

// Admin - Get All Payments
export const getAllPayments = async () => {
  const response = await api.get("/payments");
  return response.data;
};