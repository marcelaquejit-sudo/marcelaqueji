// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LojaVirtualTB from "./pages/LojaVirtualTB"; // sua LP (um único arquivo .tsx está ótimo)

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loja-virtual-tb" element={<LojaVirtualTB />} />
    </Routes>
  );
}
