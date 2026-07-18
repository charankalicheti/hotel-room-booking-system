import api from "./axios";

// ==========================================================
// Get All Customers
// ==========================================================

export const getCustomers = async () => {

  const { data } = await api.get("/admin/customers");

  return data;

};

// ==========================================================
// Delete Customer
// ==========================================================

export const deleteCustomer = async (customerId) => {

  const { data } = await api.delete(
    `/admin/customers/${customerId}`
  );

  return data;

};