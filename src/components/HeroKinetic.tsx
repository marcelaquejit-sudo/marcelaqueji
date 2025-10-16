import React from "react";

export default function HeroKinetic() {
  return (
    <section id="hero" className="relative min-h-[70vh] w-full bg-white text-gray-700 flex items-center overflow-hidden scroll-mt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-24 blur-3xl opacity-40 bg-gradient-to-tr from-gray-200 via-gray-100 to-white animate-pulse" />
      </div>
      <div className="relative mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="mb-6 inline-block rounded-full border border-gray-200 px-4 py-1 text-xs tracking-widest text-gray-500 uppercase">
          Design • Tecnologia • Marketing
        </p>
        <h1 className="mx-auto leading-[0.95]">
          <span className="kinetic-text block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold">EXPERIÊNCIA DIGITAL</span>
          <span className="kinetic-text block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold">COM EFICIÊNCIA</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-gray-500">O que há de mais atual — aplicado para solucionar.</p>
      </div>
    </section>
  );
}
