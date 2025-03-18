import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = sessionStorage.getItem("accessToken");

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
