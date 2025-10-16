import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  key: string;
  title: string;
  desc: string;
  img: string;
  services: string[];
};

export default function Services3DPanel() {
  const [selected, setSelected] = useState<Item | null>(null);
  const [rot, setRot] = useState(0);          // rotação contínua do anel (deg)
  const rafRef = useRef<number | null>(null);

  const items: Item[] = [
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

  /** Gira automaticamente quando NÃO há painel aberto */
  useEffect(() => {
    if (selected) return; // pausado quando houver seleção
    const step = () => {
      setRot((r) => (r + 0.25) % 360); // velocidade da rotação
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [selected]);

  /** Fechar com ESC */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Tamanhos responsivos do anel */
  const sizeClass =
    "h-[340px] w-[340px] sm:h-[380px] sm:w-[380px] md:h-[420px] md:w-[420px]";

  return (
    <section
      id="servicos"
      className="relative w-full text-gray-700 px-6 pt-10 pb-24 scroll-mt-24"
    >
      <div className="w-full text-center mb-2 sm:mb-4">
        <h2 className="silver-kinetic text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
          SERVIÇOS
        </h2>
        <p className="mt-2 text-gray-500">Clique em um card para ver os detalhes</p>
      </div>

      {/* Layout: mobile empilha; desktop 2 colunas (carrossel | painel) */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Carrossel 3D */}
        <div
          className={[
            "relative flex justify-center",           // sempre central no mobile
            "transition-transform duration-700",      // anima quando desloca
            selected ? "lg:justify-start lg:-translate-x-6" : "lg:justify-center lg:translate-x-0",
          ].join(" ")}
        >
          <div className={`relative [perspective:1600px] ${sizeClass} overflow-visible z-0`}>
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              // o "ring3d" agora é só visual; a rotação contínua é aplicada nos cards
            >
              {items.map((it, i) => {
                const base = (360 / items.length) * i;
                const angle = base + rot;
                const isActive = selected?.key === it.key;

                return (
                  <div
                    key={it.key}
                    className={[
                      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                      "[transform-style:preserve-3d] cursor-pointer transition-transform duration-500",
                      isActive ? "scale-110 brightness-110" : "hover:scale-105",
                    ].join(" ")}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(260px)`,
                    }}
                    onClick={() =>
                      setSelected((curr) => (curr?.key === it.key ? null : it))
                    }
                    aria-label={`Selecionar ${it.title}`}
                    role="button"
                    aria-pressed={isActive}
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

        {/* Painel (desktop: ao lado; mobile: abaixo). Aparece só quando selecionado */}
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
                {selected.services.map((svc) => (
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
    </section>
  );
}
