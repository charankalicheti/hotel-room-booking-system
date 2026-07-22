import api from "./axios";

// ==========================================================
// Create Payment
// ==========================================================

export const createPayment = async (paymentData) => {

  const { data } = await api.post(
    "/payments/create",
    paymentData
  );

  return data;

};

// ==========================================================
// Verify Payment
// ==========================================================

export const verifyPayment = async (paymentData) => {

  const { data } = await api.post(
    "/payments/verify",
    paymentData
  );

  return data;

};

// ==========================================================
// Payment Details
// ==========================================================

export const getPayment = async (reservationId) => {

  const { data } = await api.get(
    `/payments/${reservationId}`
  );

  return data;

};

// ==========================================================
// Payment History
// ==========================================================

export const getPaymentHistory = async () => {

  const { data } = await api.get(
    "/payments/history"
  );

  return data;

};

// ==========================================================
// Invoice
// ==========================================================

export const getInvoice = async (reservationId) => {

  const { data } = await api.get(
    `/payments/invoice/${reservationId}`
  );

  return data;

};

// ==========================================================
// Dashboard Summary (Admin)
// ==========================================================

export const getPaymentDashboard = async () => {

  const { data } = await api.get(
    "/payments/dashboard"
  );

  return data;

};

// ==========================================================
// Refund Payment (Admin)
// ==========================================================

export const refundPayment = async (paymentId) => {

  const { data } = await api.post(
    `/payments/refund/${paymentId}`
  );

  return data;

};