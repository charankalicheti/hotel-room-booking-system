import api from "./api";

export const makePayment = async (paymentData) => {
  const response = await api.post(
    "/payments",
    paymentData
  );

  return response.data;
};