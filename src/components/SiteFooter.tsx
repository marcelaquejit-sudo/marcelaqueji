import React from "react";

export default function SiteFooter() {
  return (
    // Força a seção do footer a ser transparente
    <footer id="footer" className="relative mt-24 !bg-transparent !bg-none">
      {/* sem “divisor sutil” / gradiente no topo */}
      <div className="mx-auto max-w-6xl px-4 !bg-transparent !bg-none">
        {/* ÚNICO CARD (glass) */}
        <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <a href="#hero" className="inline-flex items-center gap-3" aria-label="Voltar ao início">
              <img
                src="https://i.imgur.com/2SShxU3.png"
                alt="Marcela Queji"
                className="h-8 w-auto md:h-9 select-none"
                loading="lazy"
                decoding="async"
              />
              <span className="sr-only">Marcela Queji</span>
            </a>

            <nav className="grid grid-cols-2 gap-3 text-sm text-gray-700 md:flex md:flex-wrap md:gap-6">
              <a href="#servicos" className="hover:text-gray-900">Serviços</a>
              <a href="#cases" className="hover:text-gray-900">Cases</a>
              <a href="#feedbacks" className="hover:text-gray-900">Feedbacks</a>
              <a href="#sobre" className="hover:text-gray-900">Sobre</a>
              <a href="#cta" className="hover:text-gray-900">Contato</a>
            </nav>

            {/* Ícones sem cartões extras */}
            <div className="flex items-center gap-4 text-gray-800">
              <a href="https://wa.me/5542920015594" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:opacity-80 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.86..."/></svg>
              </a>
              <a href="https://instagram.com/marcelaqueji" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2C4.24..."/></svg>
              </a>
            </div>
          </div>

          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} Entregue ao SENHOR tudo o que você faz, e os seus planos serão estabelecidos.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 hover:text-gray-900"
              aria-label="Voltar ao topo"
            >
              ↑ Topo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
