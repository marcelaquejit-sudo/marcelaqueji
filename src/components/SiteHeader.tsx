import React, { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-3 rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-4 py-2">
          <div className="flex items-center justify-between">
            <a href="#hero" className="silver-kinetic text-lg font-extrabold tracking-tight">MARCELA QUEJI</a>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
              <a href="#servicos" className="hover:text-gray-900">Serviços</a>
              <a href="#cases" className="hover:text-gray-900">Cases</a>
              <a href="#feedbacks" className="hover:text-gray-900">Feedbacks</a>
              <a href="#sobre" className="hover:text-gray-900">Sobre</a>
              <a href="#cta" className="inline-flex items-center rounded-full border border-white/60 bg-white/90 backdrop-blur px-4 py-1.5 font-semibold text-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-white">Contato</a>
            </nav>
            <button onClick={() => setOpen(v=>!v)} aria-label="Abrir menu" className="md:hidden rounded-lg border border-gray-200 px-3 py-1 text-gray-700">☰</button>
          </div>

          {open && (
            <div className="md:hidden mt-2 grid gap-2 text-sm text-gray-700">
              <a onClick={()=>setOpen(false)} href="#servicos" className="block rounded-lg px-3 py-2 hover:bg-gray-50">Serviços</a>
              <a onClick={()=>setOpen(false)} href="#cases" className="block rounded-lg px-3 py-2 hover:bg-gray-50">Cases</a>
              <a onClick={()=>setOpen(false)} href="#feedbacks" className="block rounded-lg px-3 py-2 hover:bg-gray-50">Feedbacks</a>
              <a onClick={()=>setOpen(false)} href="#sobre" className="block rounded-lg px-3 py-2 hover:bg-gray-50">Sobre</a>
              <a onClick={()=>setOpen(false)} href="#cta" className="block rounded-lg px-3 py-2 bg-white/80 backdrop-blur border border-white/60 font-semibold text-gray-800">Contato</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
