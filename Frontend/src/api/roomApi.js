import api from "./axios";

// ==========================================================
// Customer APIs
// ==========================================================

export const getRooms = async () => {

  const { data } = await api.get("/rooms/");

  return data;

};

export const searchRooms = async (searchData) => {

  const { data } = await api.post(
    "/rooms/search",
    searchData
  );

  return data;

};

export const getRoomDetails = async (id) => {

  const { data } = await api.get(
    `/rooms/${id}`
  );

  return data;

};

// ==========================================================
// Admin APIs
// ==========================================================

export const addRoom = async (room) => {

  const { data } = await api.post(
    "/rooms/",
    room
  );

  return data;

};

export const updateRoom = async (
  id,
  room
) => {

  const { data } = await api.put(
    `/rooms/${id}`,
    room
  );

  return data;

};

export const deleteRoom = async (id) => {

  const { data } = await api.delete(
    `/rooms/${id}`
  );

  return data;

};