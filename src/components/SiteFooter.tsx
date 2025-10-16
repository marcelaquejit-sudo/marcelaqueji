import React from "react";

export default function SiteFooter() {
  return (
    <footer id="footer" className="relative mt-24">
      {/* Divisor sutil */}
      <div className="pointer-events-none absolute -top-6 inset-x-0 h-6 bg-gradient-to-b from-transparent to-black/5"></div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-6 py-8">
          {/* Topo do footer */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Logo / Marca */}
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

            {/* Navegação rápida */}
            <nav className="grid grid-cols-2 gap-3 text-sm text-gray-700 md:flex md:flex-wrap md:gap-6">
              <a href="#servicos" className="hover:text-gray-900">Serviços</a>
              <a href="#cases" className="hover:text-gray-900">Cases</a>
              <a href="#feedbacks" className="hover:text-gray-900">Feedbacks</a>
              <a href="#sobre" className="hover:text-gray-900">Sobre</a>
              <a href="#cta" className="hover:text-gray-900">Contato</a>
            </nav>

            {/* Social / Ações */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href="https://wa.me/5542920015594" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/90 backdrop-blur px-3 py-2 text-sm font-medium text-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-white"
                aria-label="Falar no WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.53 0 .24 5.29.24 11.82c0 2.08.56 4.12 1.62 5.91L0 24l6.43-1.8a11.7 11.7 0 0 0 5.63 1.45h.01c6.53 0 11.82-5.29 11.82-11.82c0-3.16-1.23-6.15-3.39-8.31M12.06 21.3c-1.83 0-3.62-.49-5.17-1.41l-.37-.22l-3.82 1.07l1.02-3.72l-.24-.38a9.58 9.58 0 0 1-1.49-5.21c0-5.3 4.31-9.61 9.61-9.61c2.57 0 4.99 1 6.81 2.82a9.55 9.55 0 0 1 2.8 6.8c0 5.3-4.31 9.61-9.61 9.61m5.5-7.21c-.3-.15-1.76-.86-2.03-.95c-.27-.1-.47-.15-.67.15c-.2.3-.77.95-.94 1.14c-.17.2-.35.22-.65.07c-.3-.15-1.26-.46-2.4-1.47c-.89-.79-1.49-1.77-1.66-2.07c-.17-.3-.02-.46.13-.61c.13-.13.3-.35.44-.52c.15-.17.2-.3.3-.5c.1-.2.05-.37-.02-.52c-.07-.15-.67-1.62-.92-2.22c-.24-.58-.48-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.19 5.08 4.48c.71.31 1.27.5 1.71.64c.72.23 1.38.2 1.9.12c.58-.09 1.76-.72 2.01-1.42c.25-.7.25-1.31.17-1.44c-.07-.13-.27-.2-.57-.35" />
                </svg>
              </a>

              {/* Instagram (opcional) */}
              <a
                href="https://instagram.com/marcelaqueji" // troque pelo seu @
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/90 backdrop-blur px-3 py-2 text-sm font-medium text-gray-800 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:bg-white"
                aria-label="Abrir Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3m11 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2M12 7a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7m0 2.2a2.8 2.8 0 1 1 0 5.6a2.8 2.8 0 0 1 0-5.6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Linha fina divisória */}
          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />

          {/* Direitos / Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-gray-600">
            <p>
              © {new Date().getFullYear()} Entregue ao SENHOR tudo o que você faz, e os seus planos serão estabelecidos.
            </p>
            <div className="flex flex-wrap items-center gap-4">
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
      </div>
    </footer>
  );
}
