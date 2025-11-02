"use client";
import React, { useState, useCallback, useMemo } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // estados ativos seguros (SSR-safe)
  const { isLojaVirtual, isEEA } = useMemo(() => {
    if (typeof window === "undefined") {
      return { isLojaVirtual: false, isEEA: false };
    }
    const { hash, pathname } = window.location;
    const loja =
      hash === "#loja-virtual-tb" || hash.startsWith("#/loja-virtual-tb");
    const eea = (pathname || "").includes("/eu-escolho-me-amar");
    return { isLojaVirtual: loja, isEEA: eea };
  }, []);

  const baseLink = "hover:text-gray-900 transition-colors";

  const pillBtn =
    "inline-flex items-center rounded-full border border-white/60 bg-white/90 backdrop-blur px-4 py-1.5 font-semibold text-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-white";

  const lojaClasses = isLojaVirtual
    ? "inline-flex items-center rounded-full bg-[#2F6FED] text-white px-4 py-1.5 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
    : pillBtn;

  const eeaClasses = isEEA
    ? "inline-flex items-center rounded-full bg-gradient-to-r from-[#E7C887] via-[#CDA257] to-[#B58A3E] text-white px-4 py-1.5 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
    : pillBtn;

  // Scroll suave para seções internas
  const handleNav = useCallback((e: React.MouseEvent, id: string, close?: (v: boolean)=>void) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) {
      window.location.hash = `#${id}`;
      if (close) close(false);
      return;
    }
    const header = document.querySelector("header, .site-header") as HTMLElement | null;
    const offset = header ? header.offsetHeight : 0;
    const top = el.getBoundingClientRect().top + window.scrollY - offset - 8;
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top, behavior: "smooth" });
    if (close) close(false);
  }, []);

  return (
    <header className="site-header fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-3 rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#/" className="block" aria-label="Ir para o início">
              <img
                src="https://i.imgur.com/2SShxU3.png"
                alt="Marcela Queji"
                className="h-8 w-auto md:h-9 select-none"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </a>

            {/* Desktop menu */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
              <a href="#servicos" onClick={(e)=>handleNav(e,"servicos")} className={baseLink}>Serviços</a>
              <a href="#cases" onClick={(e)=>handleNav(e,"cases")} className={baseLink}>Cases</a>
              <a href="#feedbacks" onClick={(e)=>handleNav(e,"feedbacks")} className={baseLink}>Feedbacks</a>

              {/* Página nova — EEA */}
              <a
                href="/eu-escolho-me-amar"
                className={eeaClasses}
                aria-current={isEEA ? "page" : undefined}
                title="Eu Escolho Me Amar"
              >
                Eu Escolho Me Amar
              </a>

              {/* Loja Virtual TB */}
              <a
                href="#loja-virtual-tb"
                onClick={(e)=>handleNav(e,"loja-virtual-tb")}
                className={lojaClasses}
                aria-current={isLojaVirtual ? "page" : undefined}
              >
                Loja Virtual TB
              </a>

              <a
                href="#cta"
                onClick={(e)=>handleNav(e,"cta")}
                className={pillBtn}
              >
                Contato
              </a>
            </nav>

            {/* Botão mobile */}
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Abrir menu"
              aria-expanded={open}
              className="md:hidden rounded-lg border border-gray-200 px-3 py-1 text-gray-700"
            >
              ☰
            </button>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden mt-2 grid gap-2 text-sm text-gray-700">
              <a href="#servicos" onClick={(e)=>handleNav(e,"servicos",setOpen)} className="block rounded-lg px-3 py-2 hover:bg-gray-50">Serviços</a>
              <a href="#cases" onClick={(e)=>handleNav(e,"cases",setOpen)} className="block rounded-lg px-3 py-2 hover:bg-gray-50">Cases</a>
              <a href="#feedbacks" onClick={(e)=>handleNav(e,"feedbacks",setOpen)} className="block rounded-lg px-3 py-2 hover:bg-gray-50">Feedbacks</a>

              {/* Página nova — EEA */}
              <a
                href="/eu-escolho-me-amar"
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2 hover:bg-gray-50 ${isEEA ? "text-[#7A6039] font-semibold" : ""}`}
                aria-current={isEEA ? "page" : undefined}
              >
                Eu Escolho Me Amar
              </a>

              {/* Loja Virtual TB */}
              <a
                href="#loja-virtual-tb"
                onClick={(e)=>handleNav(e,"loja-virtual-tb",setOpen)}
                className={`block rounded-lg px-3 py-2 hover:bg-gray-50 ${isLojaVirtual ? "text-[#2F6FED] font-semibold" : ""}`}
                aria-current={isLojaVirtual ? "page" : undefined}
              >
                Loja Virtual TB
              </a>

              <a
                href="#cta"
                onClick={(e)=>handleNav(e,"cta",setOpen)}
                className="block rounded-lg px-3 py-2 bg-white/80 backdrop-blur border border-white/60 font-semibold text-gray-800"
              >
                Contato
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
