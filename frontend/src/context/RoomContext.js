import React, { createContext, useCallback, useEffect, useState } from "react";
import API from "../utils/axiosInstance";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roomDetails, setRoomDetails] = useState(null);

  const fetchRooms = async () => {
    try {
      const response = await API.get(`/room`);
      console.log("API Response:", response.data); // Kiểm tra dữ liệu trả về

      const roomsArray = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.rooms)
        ? response.data.rooms
        : [];

      setRooms(roomsArray);
      setFilteredRooms(roomsArray);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi API:", err);
      setError("Lỗi khi tải dữ liệu!");
      setLoading(false);
    }
  };

  // Gọi fetchRooms khi component mount
  useEffect(() => {
    fetchRooms();
  }, []);

  const roomId = localStorage.getItem("roomId"); // Get roomId from localStorage

  useEffect(() => {
    if (roomId && !roomDetails) {
      getRoomDetails(roomId); // Only fetch if roomDetails are not already available
    }
  }, [roomId, roomDetails]); // Add roomDetails as a dependency to avoid re-fetching if already loaded

  const handleFilterRooms = useCallback(
    (filters) => {
      console.log("Filtering rooms with filters:", filters);
      console.log("Current rooms:", rooms);

      if (!Array.isArray(rooms)) {
        console.error("rooms is not an array!", rooms);
        return;
      }

      let filtered = rooms.filter((room) => {
        return (
          (filters.name === "" || room?.name?.toLowerCase().includes(filters?.name?.toLowerCase())) &&
          (filters.type === "" || room.type === filters.type) &&
          (filters.services === "" || room.services?.toLowerCase().includes(filters.services?.toLowerCase())) &&
          (filters.location === "" || room.location === filters.location) &&
          (filters.status === "" || room.status === filters.status) &&
          (filters.beds === "" || room.beds >= parseInt(filters.beds)) &&
          (filters.price === "" ||
            (filters.price === "<500" && room.price < 500) ||
            (filters.price === "500-3000" && room.price >= 500 && room.price <= 3000) ||
            (filters.price === ">3000" && room.price > 3000))
        );
      });

      console.log("Filtered rooms:", filtered);
      setFilteredRooms(filtered);
    },
    [rooms]
  );

  const getRoomDetails = async (roomId) => {
    try {
      const response = await API.get(`/room/${roomId}`);
      console.log(response.data); // Log the response to inspect its structure
      setRoomDetails(response.data.room); // Update this line based on the actual response structure
    } catch (error) {
      console.error("Error fetching room details:", error);
      setError("Không thể lấy thông tin phòng");
    }
  };

  // Increment room count by 1
  const incrementRoom = (roomId) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, count: room.count + 1 } : room
      )
    );
  };

  // Decrement room count by 1 (prevent going below 0)
  const decrementRoom = (roomId) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId && room.count > 0
          ? { ...room, count: room.count - 1 }
          : room
      )
    );
  };

  // Reset all room counts to 0
  const resetSelections = () => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => ({ ...room, count: 0 }))
    );
  };

  // Calculate total price of selected rooms
  const totalPrice = rooms.reduce((total, room) => {
    return total + room.price * room.count;
  }, 0);

  return (
    <RoomContext.Provider
      value={{
        rooms,
        filteredRooms,
        loading,
        error,
        roomDetails,
        handleFilterRooms,
        getRoomDetails,
        incrementRoom,
        decrementRoom,
        resetSelections,
        totalPrice,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
