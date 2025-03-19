import { Navigate } from "react-router-dom";
import { useHotelBooking } from "../context/HotelBookingContext"; // Lấy user từ context

const ProtectedRoute = ({ children, allowedRoles = ["USER"] }) => {
  const { user, accessToken } = useHotelBooking(); // ✅ Lấy user từ context

  console.log("🔍 User từ context:", user);
  console.log("✅ Danh sách quyền truy cập:", allowedRoles);

  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role.toUpperCase())) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
