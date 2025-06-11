import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import API, { refreshAccessToken } from "../utils/axiosInstance";

const HotelBookingContext = createContext();

export const HotelBookingProvider = ({ children }) => {
  const prevAccessToken = useRef(null);

  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("accessToken") || null
  );

  useEffect(() => {
    if (accessToken && accessToken !== prevAccessToken.current) {
      sessionStorage.setItem("accessToken", accessToken);
      fetchUserProfile();
      prevAccessToken.current = accessToken; // Cập nhật token trước đó
    } else if (!accessToken) {
      sessionStorage.removeItem("accessToken");
      setUser(null);
    }
  }, [accessToken]);

  const fetchUserProfile = async () => {
    if (!accessToken) return;

    try {
      const response = await API.get("/user/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("❌ Lỗi lấy profile:", error);

      if (error.response?.status === 401) {
        const newToken = await refreshAccessToken();

        if (newToken) {
          setAccessToken(newToken); // ✅ Cập nhật token mới
        } else {
          handleLogout(); // ❌ Refresh thất bại → Đăng xuất
        }
      }
    }
  };

  const handleLogout = () => {
    setAccessToken(null);
    sessionStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <HotelBookingContext.Provider
      value={{ setAccessToken, user, setUser, accessToken }}
    >
      {children}
    </HotelBookingContext.Provider>
  );
};

export const useHotelBooking = () => useContext(HotelBookingContext);
