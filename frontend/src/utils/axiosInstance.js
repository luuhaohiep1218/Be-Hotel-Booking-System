import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // ✅ Gửi cookie (refreshToken) với request
});

// 🔥 Axios Interceptor để tự động refresh token khi bị 401 Unauthorized
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔥 Gửi request lấy accessToken mới
        const { data } = await API.post("/auth/refresh-token");
        localStorage.setItem("accessToken", data.accessToken);

        // ✅ Cập nhật header Authorization rồi gửi lại request ban đầu
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token hết hạn, yêu cầu đăng nhập lại!");
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // 🛑 Chuyển hướng đến trang login
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
