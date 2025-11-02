import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// páginas
const Home = lazy(() => import("./Home"));
const LojaVirtualTB = lazy(() => import("./components/LojaVirtualTB"));
const EEA = lazy(() => import("./components/EEA"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loja-virtual-tb" element={<LojaVirtualTB />} />
        <Route path="/eu-escolho-me-amar" element={<EEA />} />
        {/* 404 → manda pra home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
