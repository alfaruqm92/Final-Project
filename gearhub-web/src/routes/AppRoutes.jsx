import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Equipment from "../pages/public/EquipmentListing";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment" element={<Equipment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;