import React from "react";

export default function HeroKinetic() {
  return (
    <section
      id="hero"
      className="relative w-full bg-white text-gray-700 flex items-center overflow-hidden scroll-mt-20 sm:scroll-mt-24 min-h-[64vh] sm:min-h-[70vh]"
    >
      {/* fundo suave */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-24 blur-3xl opacity-40 bg-gradient-to-tr from-gray-200 via-gray-100 to-white animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 text-center">
        <p className="mb-4 sm:mb-6 inline-block rounded-full border border-gray-200 px-3 sm:px-4 py-1 text-[10px] sm:text-xs tracking-widest text-gray-500 uppercase">
          Design • Tecnologia • Marketing
        </p>

        <h1 className="mx-auto leading-[0.98]">
          <span className="kinetic-text block font-extrabold text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl">
            EXPERIÊNCIA DIGITAL
          </span>
          <span className="kinetic-text block font-extrabold text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl">
            COM EFICIÊNCIA
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-gray-500">
          O que há de mais atual — aplicado para funcionar melhor.
        </p>
      </div>

      {/* estilos do efeito prata/kinetic (com fallback mais leve no mobile) */}
      <style>{`
        .kinetic-text {
          background: linear-gradient(120deg, #d7d7d7, #a7a7a7, #7d7d7d, #d7d7d7);
          background-size: 240% 240%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: sheen 6s ease-in-out infinite, tilt 6s ease-in-out infinite;
        }
        @keyframes sheen {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        @keyframes tilt {
          0% { transform: perspective(1000px) rotateX(7deg) rotateY(-6deg) }
          50% { transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) }
          100% { transform: perspective(1000px) rotateX(7deg) rotateY(-6deg) }
        }
        /* versão mobile: animação mais simples e sem tilt pra estabilidade e performance */
        @media (max-width: 640px) {
          .kinetic-text { animation: sheen 6s linear infinite; transform: none; }
        }
      `}</style>
    </section>
  );
}