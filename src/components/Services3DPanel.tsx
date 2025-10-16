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
      className="relative w-full text-gray-700 px-6 py-16 scroll-mt-24"
    >
      {/* Título */}
      <div className="w-full text-center mb-8">
        <h2 className="silver-kinetic text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
          SERVIÇOS
        </h2>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Clique em um card para ver os detalhes
        </p>
      </div>

      {/* === CARROSSEL CENTRALIZADO NO MEIO DA SEÇÃO === */}
      <div className="relative mx-auto max-w-6xl">
        {/* Palco vertical: garante altura e centralização vertical */}
        <div className="min-h-[520px] sm:min-h-[560px] lg:min-h-[600px] grid place-items-center">
          {/* Palco do anel (centralizado no meio) */}
          <div className="relative [perspective:1600px] h-[340px] w-[340px] sm:h-[380px] sm:w-[380px] md:h-[420px] md:w-[420px]">
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
                    style={{ transform: `rotateY(${angle}deg) translateZ(260px)` }}  {/* raio do anel */}
                    onClick={() => setSelected(it)}
                    aria-label={`Selecionar ${it.title}`}
                  >
                    <div className="relative h-[240px] w-[190px] sm:h-[260px] sm:w-[200px] rounded-3xl border border-white/40 backdrop-blur-2xl bg-gradient-radial from-white/70 via-white/30 to-transparent shadow-[0_10px_60px_rgba(0,0,0,0.08)] overflow-hidden">
                      <img
                        src={it.img}
                        alt={it.title}
                        className="h-24 w-24 sm:h-28 sm:w-28 object-contain [filter:grayscale(100%)] drop-shadow-[0_2px_6px_rgba(255,255,255,0.8)] mx-auto mt-14 sm:mt-16"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* === DETALHES SEMPRE ABAIXO (desktop e mobile) === */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative max-w-4xl mx-auto mt-8"
            >
              {/* Fechar */}
              <div className="flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  aria-label="Fechar detalhes"
                >
                  Fechar ✕
                </button>
              </div>

              <div className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.10)] p-6 sm:p-8">
                <h3 className="silver-kinetic text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-6">
                  {selected.title}
                </h3>

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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

