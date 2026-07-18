import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const location = useLocation();

  const { token, user } = useAuth();

  // Not Logged In: send the attempted location to login so user can be redirected back
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Role Check
  if (role && user?.role !== role) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/customer/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;