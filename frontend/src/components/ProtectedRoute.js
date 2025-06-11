import { Navigate } from "react-router-dom";
import { useHotelBooking } from "../context/HotelBookingContext";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles = ["USER"] }) => {
  const { user, accessToken } = useHotelBooking();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && accessToken) {
      setLoading(false);
    }
  }, [user, accessToken]);

  if (loading) {
    return <div>Loading...</div>; // Hoặc thêm spinner để báo hiệu
  }

  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role.toUpperCase())) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
