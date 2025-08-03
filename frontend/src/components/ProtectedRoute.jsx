import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextDef";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user } = useContext(AuthContext);

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If admin is required but user is not admin, redirect to dashboard
  if (requireAdmin && user.user_metadata?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // If admin is required and user is admin, or if admin is not required, render children
  return children;
};

export default ProtectedRoute; 