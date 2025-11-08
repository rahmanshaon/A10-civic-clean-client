import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log(`PrivateRoute Check: Loading=${loading}, User=${!!user}`);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
