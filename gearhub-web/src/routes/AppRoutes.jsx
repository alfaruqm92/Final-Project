import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Equipment from "../pages/public/Equipment";
import Dashboard from "../pages/user/Dashboard";
import Register from "../pages/auth/Register";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Home from "../pages/public/Home";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/equipment" element={<Equipment />} />
      <Route path="/register" element={<Register />} />

      {/* Customer */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Route>

      {/* Admin */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
      </Route>
    </Routes>
  );
}

export default AppRoutes;