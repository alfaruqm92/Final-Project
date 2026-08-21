import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Equipment from "../pages/public/Equipment";
import Dashboard from "../pages/user/Dashboard";
import Register from "../pages/auth/Register";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminEquipments from "../pages/admin/AdminEquipments";
import AdminCategories from "../pages/admin/AdminCategories";
import EquipmentDetail from "../pages/public/EquipmentDetail";
import MyBookings from "../pages/user/MyBookings";
import Cart from "../pages/public/Cart";
import Checkout from "../pages/user/Checkout";
import Home from "../pages/public/Home";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/equipment" element={<Equipment />} />
      <Route path="/equipment/:id" element={<EquipmentDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />

      {/* Customer */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* Admin */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
        <Route path="/admin/equipments" element={<AdminEquipments />}/>
        <Route path="/admin/categories" element={<AdminCategories />}/>
      </Route>
    </Routes>
  );
}

export default AppRoutes;