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
  const [rotation, setRotation] = useState(0);          // rotação base do anel
  const [paused, setPaused] = useState(false);          // pausa quando abre detalhes

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const SPEED = 10; // graus por segundo (ajuste se quiser mais rápido/lento)
  const RADIUS = 240; // translateZ do anel (ajuste raio do círculo)

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
      services: ["LANDING PAGES", "SITES", "E-COMMERCE", "DASHBOARDS", "SaaS SOB DEMANDA"],
    },
    {
      key: "mkt",
      title: "MARKETING",
      desc: "Crescimento orientado a dados e presença relevante.",
      img: "https://i.imgur.com/itAZ9xR.png",
      services: ["GESTÃO DE REDES", "TRÁFEGO PAGO", "GOOGLE MEU NEGÓCIO", "FUNIS", "CONSULTORIA"],
    },
  ];

  // loop de rotação contínua
  useEffect(() => {
    function tick(t: number) {
      if (!paused) {
        if (lastTimeRef.current == null) lastTimeRef.current = t;
        const dt = (t - lastTimeRef.current) / 1000; // segundos
        lastTimeRef.current = t;
        setRotation((r) => (r + SPEED * dt) % 360);
      } else {
        // se pausado, reseta o marcador de tempo para não pular na retomada
        lastTimeRef.current = t;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [paused]);

  const handleSelect = (it: Item) => {
    setSelected(it);
    setPaused(true);
  };

  const handleClose = () => {
    setSelected(null);
    setPaused(false);
  };

  return (
    <section id="servicos" className="relative w-full scroll-mt-24 px-6 py-16 text-gray-700">
      {/* Título */}
      <div className="w-full text-center mb-8">
        <h2 className="silver-kinetic text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
          SERVIÇOS
        </h2>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Clique em um card para ver os detalhes
        </p>
      </div>

      {/* PALCO central, altura fixa para não “sumir” */}
      <div className="relative mx-auto max-w-6xl overflow-visible">
        <div className="relative h-[440px] sm:h-[500px] lg:h-[540px] grid place-items-center overflow-visible">
          {/* wrapper com perspectiva */}
          <div className="relative h-[360px] w-[360px] sm:h-[400px] sm:w-[400px] md:h-[420px] md:w-[420px] [perspective:1600px] overflow-visible">
            {/* centro geométrico do anel */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transformStyle: "preserve-3d" }}
            >
              {items.map((it, i) => {
                const angle = (360 / items.length) * i;
                const isActive = selected?.key === it.key;
                // soma rotação base para animar o anel
                const totalAngle = angle + rotation;

                return (
                  <div
                    key={it.key}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-500 ${
                      isActive ? "scale-110 brightness-110" : "hover:scale-105"
                    }`}
                    style={{
                      transform: `rotateY(${totalAngle}deg) translateZ(${RADIUS}px)`,
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => handleSelect(it)}
                    aria-label={`Selecionar ${it.title}`}
                  >
                    <div className="relative h-[230px] w-[180px] sm:h-[250px] sm:w-[190px] rounded-3xl border border-white/40 backdrop-blur-2xl bg-white/70 shadow-[0_10px_60px_rgba(0,0,0,0.08)] overflow-hidden">
                      <img
                        src={it.img}
                        alt={it.title}
                        className="h-24 w-24 sm:h-28 sm:w-28 object-contain grayscale drop-shadow-[0_2px_6px_rgba(255,255,255,0.8)] mx-auto mt-14 sm:mt-16"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* DETALHES (abaixo – pausa a rotação enquanto visível) */}
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
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
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
                  {selected.services.map((svc) => (
                    <div
                      key={svc}
                      className="rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5"
                    >
                      <span className="text-sm sm:text-base font-semibold uppercase text-gray-700 tracking-wide">
                        {svc}
                      </span>
                    </div>
                  ))}
                </div>

                {selected.desc && <p className="mt-4 text-sm text-gray-500">{selected.desc}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
