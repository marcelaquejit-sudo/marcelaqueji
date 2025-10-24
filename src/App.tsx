import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LojaVirtualTB from "./components/LojaVirtualTB";// crie esse arquivo e cole a LP inteira

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loja-virtual-tb" element={<LojaVirtualTB />} />
    </Routes>
  );
}

