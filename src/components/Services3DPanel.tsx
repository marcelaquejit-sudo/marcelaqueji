import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Services3DPanel() {
  const [selected, setSelected] = useState<any>(null);

  const items = [
    {
      key: "design",
      title: "DESIGN GRÁFICO",
      desc: "Identidade visual e materiais que elevam sua marca.",
      img: "https://i.imgur.com/K25QoJ6.png",
      services: [
        "IDENTIDADE VISUAL",
        "MATERIAIS COMERCIAIS",
        "ARTES PARA REDES",
        "E-BOOKS",
        "MOCKUPS",
        "VISUAL 3D",
      ],
    },
    {
      key: "dev",
      title: "DESENVOLVIMENTO DE SISTEMAS",
      desc: "Sites e sistemas sob medida, com foco em eficiência.",
      img: "https://i.imgur.com/9PFreUn.png",
      services: [
        "LANDING PAGES",
        "SITES",
        "E-COMMERCE",
        "DASHBOARDS",
        "SaaS SOB DEMANDA",
      ],
    },
    {
      key: "mkt",
      title: "MARKETING",
      desc: "Crescimento orientado a dados e presença relevante.",
      img: "https://i.imgur.com/itAZ9xR.png",
      services: [
        "GESTÃO DE REDES",
        "TRÁFEGO PAGO",
        "GOOGLE MEU NEGÓCIO",
        "FUNIS",
        "CONSULTORIA",
      ],
    },
  ];

  return (
    <section
      id="servicos"
      className="relative w-full min-h-[70vh] sm:min-h-[90vh] overflow-hidden text-gray-700 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 px-4 sm:px-6 py-12 sm:py-16 scroll-mt-24"
    >
      {/* glow de fundo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-24 blur-3xl opacity-40 bg-gradient-to-tr from-gray-200 via-gray-100 to-white animate-pulse" />
      </div>

      {/* título */}
      <div className="absolute top-6 sm:top-10 w-full text-center">
        <h2 className="silver-kinetic text-xl sm:text-2xl font-extrabold tracking-tight uppercase">
          SERVIÇOS
        </h2>
        <p className="mt-1.5 sm:mt-2 text-gray-500 text-sm sm:text-base">
          Clique em um card para ver os detalhes
        </p>
      </div>

      {/* ✅ MOBILE: lista leve e clicável */}
      <div className="sm:hidden mt-20 grid grid-cols-1 gap-3 w-full max-w-md mx-auto">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => setSelected(it)}
            className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/75 backdrop-blur px-4 py-3 shadow-[0_6px_24px_rgba(0,0,0,0.06)] active:scale-[0.99]"
          >
            <img
              src={it.img}
              alt={it.title}
              loading="lazy"
              className="h-10 w-10 object-contain opacity-80"
            />
            <div className="text-left">
              <div className="text-sm font-semibold">{it.title}</div>
              <div className="text-[12px] text-gray-500 line-clamp-2">
                {it.desc}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 💠 DESKTOP/TABLET: anel 3D */}
      <div className="hidden sm:grid relative flex-1 place-items-center mt-24 sm:mt-16">
        <div className="relative [perspective:1600px] h-[320px] w-[320px] md:h-[420px] md:w-[420px]">
          <div className="ring3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
            {items.map((it, i) => {
              const angle = (360 / items.length) * i;
              const isActive = selected?.key === it.key;
              return (
                <div
                  key={it.key}
                  className={`card3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] cursor-pointer transition-transform duration-700 ${
                    isActive
                      ? "scale-110 brightness-110 animate-float"
                      : "hover:scale-105"
                  }`}
                  style={{ transform: `rotateY(${angle}deg) translateZ(260px)` }}
                  onClick={() => setSelected(it)}
                >
                  <div className="relative h-[220px] md:h-[260px] w-[160px] md:w-[200px] rounded-3xl border border-white/40 backdrop-blur-2xl bg-gradient-radial from-white/70 via-white/30 to-transparent shadow-[0_10px_60px_rgba(0,0,0,0.08)] overflow-hidden">
                    <img
                      src={it.img}
                      alt={it.title}
                      className="h-24 md:h-28 w-24 md:w-28 object-contain grayscale drop-shadow-[0_2px_6px_rgba(255,255,255,0.8)] mx-auto mt-10 md:mt-16"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* painel de detalhes (funciona para mobile e desktop) */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.key}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full sm:flex-1 max-w-2xl p-4 sm:p-6 lg:p-8"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-gray-400 hover:text-gray-600"
              aria-label="Fechar detalhes"
            >
              ✕
            </button>

            <div className="mb-4 sm:mb-6">
              <h3 className="silver-kinetic text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                {selected.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 lg:gap-5">
              {selected.services.map((svc: string) => (
                <div
                  key={svc}
                  className="relative rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5"
                >
                  <span className="relative z-10 text-[13px] sm:text-base font-semibold uppercase text-gray-700 tracking-wide">
                    {svc}
                  </span>
                </div>
              ))}
            </div>

            {selected.desc && (
              <p className="mt-3 sm:mt-4 text-sm text-gray-500">{selected.desc}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* estilos */}
      <style>{`
        @keyframes spinY { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        .ring3d { animation: spinY 35s linear infinite; }
        .ring3d:hover { animation-play-state: paused; }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
}