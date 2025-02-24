import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // ✅ Gửi cookie (refreshToken) với request
});

const refreshAccessToken = async () => {
  try {
    const { data } = await API.post("/refresh-token");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    // console.error("❌ Lỗi khi refresh token:", error.response?.data?.message);
    return null;
  }
};

// Interceptor xử lý lỗi
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🛑 Nếu lỗi từ trang login, không gọi refresh-token
    if (
      originalRequest.url.includes("/login") || // Không gọi khi login lỗi
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

// 🔥 Hàm gửi request kèm accessToken
export const authorizedRequest = (url, method = "GET", data = {}) => {
  const accessToken = localStorage.getItem("accessToken");
  return API({
    method,
    url,
    data,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export default API;
