import { Routes, Route } from "react-router-dom";
import { Home, CreateContact } from "../pages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacts/new" element={<CreateContact />} />
    </Routes>
  );
}