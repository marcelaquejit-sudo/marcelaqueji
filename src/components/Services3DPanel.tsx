import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Services3DPanel() {
  const [selected, setSelected] = useState<any>(null);

  // Fecha com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
      className="relative w-full text-gray-700 px-6 pt-10 pb-24 scroll-mt-24"
    >
      {/* Título */}
      <div className="w-full text-center mb-6 sm:mb-8">
        <h2 className="silver-kinetic text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
          SERVIÇOS
        </h2>
        <p className="mt-2 text-gray-500">Clique em um card para ver os detalhes</p>
      </div>

      {/* Layout: mobile empilha; desktop duas colunas (carrossel | painel) */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Carrossel 3D */}
        <div className="relative flex justify-center order-1 lg:order-none">
          <div className="relative [perspective:1600px] h-[340px] w-[340px] sm:h-[380px] sm:w-[380px] md:h-[420px] md:w-[420px] overflow-visible z-0">
            <div className="ring3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {items.map((it, i) => {
                const angle = (360 / items.length) * i;
                const isActive = selected?.key === it.key; // só ativa quando selecionado
                return (
                  <div
                    key={it.key}
                    className={`card3d absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] cursor-pointer transition-transform duration-700 ${
                      isActive ? "scale-110 brightness-110 animate-float" : "hover:scale-105"
                    }`}
                    style={{ transform: `rotateY(${angle}deg) translateZ(260px)` }}
                    onClick={() =>
                      setSelected((curr: any) => (curr?.key === it.key ? null : it)) // toggle
                    }
                    aria-label={`Selecionar ${it.title}`}
                    aria-pressed={isActive}
                    role="button"
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

        {/* Painel de informações (ao lado no desktop, abaixo no mobile) */}
        <div className="order-2 lg:order-none z-10">
          <AnimatePresence mode="popLayout">
            {selected && (
              <motion.div
                key={selected.key}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative max-w-2xl mx-auto lg:mx-0"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-2 z-10 text-gray-400 hover:text-gray-600"
                  aria-label="Fechar detalhes"
                >
                  ✕
                </button>

                <div className="mb-6">
                  <h3 className="silver-kinetic text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
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
        </div>
      </div>
    </section>
  );
}
