// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children, redirectPath = "/login" }) => {
  const { user, loading } = useUserAuth();

  if (loading) {
    return <div>Loading...</div>; // Loading state while user auth status is checked
  }

  if (!user) {
    return <Navigate to={redirectPath} />; // Redirects to login if unauthenticated
  }

  return children; // Renders protected content if authenticated
};

export default ProtectedRoute;
