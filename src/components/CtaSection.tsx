import React from "react";

export default function CtaSection() {
  const phone = "5542920015594"; // seu número
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Oi, vi seu site e quero falar sobre um projeto."
  )}`;

  return (
    <section id="cta" className="relative w-full py-24 px-6 bg-white scroll-mt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-24 blur-3xl opacity-30 bg-gradient-to-tr from-gray-200 via-gray-100 to-white" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <h2 className="silver-kinetic text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          Se concentre no que é bom, delegue todo o resto.
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transforme ideias em resultados com eficiência.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir conversa no WhatsApp"
            className="inline-flex items-center rounded-full border border-white/60 bg-white/90 backdrop-blur px-5 py-2 font-semibold text-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:bg-white"
          >
            Vamos conversar
          </a>

          <a
            href="#cases"
            className="inline-flex items-center rounded-full border border-gray-200 px-5 py-2 font-semibold text-gray-600 hover:text-gray-800"
          >
            Ver cases
          </a>
        </div>
      </div>
    </section>
  );
}

