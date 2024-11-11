import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import PublicRoute from "../components/hoc/PublicRoute";
import PrivateRoute from "../components/hoc/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public route */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/signin" element={<SignIn />} />
      </Route>

      {/* Private route */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
