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
      className="relative w-full min-h-[110vh] overflow-hidden text-gray-700 flex flex-col lg:flex-row items-center justify-center gap-8 px-6 py-16 scroll-mt-24"
    >
      {/* Camada de fundo (apenas decorativa) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Título / instruções */}
      <div className="absolute top-10 w-full text-center">
        <h2 className="silver-kinetic text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
          SERVIÇOS
        </h2>
        <p className="mt-2 text-gray-500">
          Clique em um card para ver os detalhes
        </p>
      </div>

      {/* Anel 3D com os cards */}
      <div className="relative flex-1 grid place-items-center mt-20">
        <div className="relative [perspective:1600px] h-[420px] w-[420px]">
          <div className="ring3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
                  <div className="relative h-[260px] w-[200px] rounded-3xl border border-white/40 backdrop-blur-2xl bg-gradient-radial from-white/70 via-white/30 to-transparent shadow-[0_10px_60px_rgba(0,0,0,0.08)] overflow-hidden">
                    <img
                      src={it.img}
                      alt={it.title}
                      className="h-28 w-28 object-contain [filter:grayscale(100%)] drop-shadow-[0_2px_6px_rgba(255,255,255,0.8)] mx-auto mt-16"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Painel de detalhes */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.key}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex-1 max-w-2xl p-4 sm:p-6 lg:p-8"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-gray-400 hover:text-gray-600"
              aria-label="Fechar"
            >
              ✕
            </button>

            <div className="mb-6">
              <h3 className="silver-kinetic text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                {selected.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              {selected.services.map((svc: string) => (
                <div
                  key={svc}
                  className="relative rounded-2xl border border-white/50 bg-white/60 backdrop-blur-xl px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5"
                >
                  <span className="relative z-10 text-sm sm:text-base font-semibold uppercase text-gray-700 tracking-wide">
                    {svc}
                  </span>
                </div>
              ))}
            </div>

            {selected.desc && (
              <p className="mt-4 text-sm text-gray-500">{selected.desc}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
