import api from "./api";

const getToken = () => localStorage.getItem("token");

export const getRooms = async () => {
  const response = await api.get("/rooms", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const addRoom = async (roomData) => {
  const response = await api.post("/rooms", roomData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateRoom = async (id, roomData) => {
  const response = await api.put(`/rooms/${id}`, roomData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteRoom = async (id) => {
  await api.delete(`/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
export const searchAvailableRooms = async (
  checkIn,
  checkOut,
  guests
) => {
  const response = await api.get(
    `/bookings/rooms/available?check_in=${checkIn}&check_out=${checkOut}&guests=${guests}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};