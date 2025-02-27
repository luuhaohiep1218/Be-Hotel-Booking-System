import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // ✅ Gửi cookie (refreshToken) với request
});

export const refreshAccessToken = async () => {
  try {
    console.log("🔄 Đang gọi API refresh-token...");
    const { data } = await API.post("/auth/refresh-token");

    console.log("✅ Access Token mới:", data.accessToken);
    localStorage.setItem("accessToken", data.accessToken);

    // ✅ Cập nhật token trong Axios
    API.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;

    return data.accessToken;
  } catch (error) {
    console.error("❌ Lỗi khi refresh token:", error.response?.data?.message);
    return null;
  }
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🛑 Nếu request là logout, không gọi refresh token
    if (originalRequest.url.includes("/auth/logout")) {
      return Promise.reject(error);
    }

    // 🛑 Nếu lỗi từ trang login, không gọi refresh-token
    if (
      originalRequest.url.includes("/login") ||
      error.response?.status === 400 || // Bad Request (sai email, pass)
      error.response?.status === 404 // API không tồn tại
    ) {
      return Promise.reject(error);
    }

    // ✅ Chỉ gọi refresh nếu lỗi là 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu để tránh loop vô hạn
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        API.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API.request(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
