import React, { useEffect, useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Fecha o menu ao crescer a tela para md+
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="mt-2 sm:mt-3 rounded-2xl bg-white/85 backdrop-blur border border-white/60 shadow-[0_8px_24px_rgba(0,0,0,0.06)] px-3 sm:px-4 py-2">
          <div className="flex items-center justify-between">
            <a
              href="#hero"
              className="silver-kinetic text-base sm:text-lg font-extrabold tracking-tight"
            >
              MARCELA QUEJI
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-5 text-sm text-gray-700">
              <a href="#servicos" className="hover:text-gray-900">Serviços</a>
              <a href="#cases" className="hover:text-gray-900">Cases</a>
              <a href="#feedbacks" className="hover:text-gray-900">Feedbacks</a>
              <a href="#sobre" className="hover:text-gray-900">Sobre</a>
              <a
                href="#cta"
                className="inline-flex items-center rounded-full border border-white/60 bg-white/90 backdrop-blur px-4 py-1.5 font-semibold text-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-white"
              >
                Contato
              </a>
            </nav>

            {/* Mobile button */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              aria-expanded={open}
              className="md:hidden rounded-xl border border-gray-200 px-3 py-2 text-gray-700"
            >
              ☰
            </button>
          </div>

          {/* Mobile nav */}
          {open && (
            <>
              {/* Overlay pra fechar tocando fora */}
              <button
                aria-hidden
                className="fixed inset-0 md:hidden bg-black/10"
                onClick={() => setOpen(false)}
              />
              <div className="md:hidden mt-2 grid gap-1.5 text-sm text-gray-700 relative z-10">
                <a
                  onClick={() => setOpen(false)}
                  href="#servicos"
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                >
                  Serviços
                </a>
                <a
                  onClick={() => setOpen(false)}
                  href="#cases"
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                >
                  Cases
                </a>
                <a
                  onClick={() => setOpen(false)}
                  href="#feedbacks"
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                >
                  Feedbacks
                </a>
                <a
                  onClick={() => setOpen(false)}
                  href="#sobre"
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                >
                  Sobre
                </a>
                <a
                  onClick={() => setOpen(false)}
                  href="#cta"
                  className="block rounded-lg px-3 py-2 bg-white/90 backdrop-blur border border-white/60 font-semibold text-gray-800 shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
                >
                  Contato
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}