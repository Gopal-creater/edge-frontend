import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../utils/authHelper";

const PrivateRoute = () => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
