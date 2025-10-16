import React from "react";

export default function HeroKinetic() {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] w-full text-gray-700 flex items-center overflow-hidden scroll-mt-24"
    >
      {/* fundo liso mantido */}

      <div className="relative mx-auto max-w-[1100px] px-6 py-16 text-center">
        <p className="mb-6 inline-block rounded-full border border-gray-200 px-4 py-1 text-[11px] tracking-widest text-gray-500 uppercase">
          Design • Tecnologia • Marketing
        </p>

        <h1 className="mx-auto leading-[0.9] tracking-tight">
          {/* Linha 1 — mantém efeito e não quebra */}
          <span
            className="kinetic-text block whitespace-nowrap font-extrabold
                       text-[clamp(28px,6.5vw,92px)]"
          >
            EXPERIÊNCIA DIGITAL
          </span>

          {/* Linha 2 — mantém efeito e não quebra */}
          <span
            className="kinetic-text block whitespace-nowrap font-extrabold
                       text-[clamp(28px,6.5vw,92px)]"
          >
            COM EFICIÊNCIA
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-500">
          O que há de mais atual — aplicado para solucionar.
        </p>
      </div>
    </section>
  );
}


