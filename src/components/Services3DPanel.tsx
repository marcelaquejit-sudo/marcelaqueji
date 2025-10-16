import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  key: string;
  title: string;
  desc: string;
  img: string;
  services: string[];
};

export default function Services3DPanel() {
  const items: Item[] = [
    {
      key: "design",
      title: "DESIGN GRÁFICO",
      desc: "Identidade visual e materiais que elevam sua marca.",
      img: "https://i.imgur.com/K25QoJ6.png",
      services: ["IDENTIDADE VISUAL","MATERIAIS COMERCIAIS","ARTES PARA REDES","E-BOOKS","MOCKUPS","VISUAL 3D"],
    },
    {
      key: "dev",
      title: "DESENVOLVIMENTO DE SISTEMAS",
      desc: "Sites e sistemas sob medida, com foco em eficiência.",
      img: "https://i.imgur.com/9PFreUn.png",
      services: ["LANDING PAGES","SITES","E-COMMERCE","DASHBOARDS","SaaS SOB DEMANDA"],
    },
    {
      key: "mkt",
      title: "MARKETING",
      desc: "Crescimento orientado a dados e presença relevante.",
      img: "https://i.imgur.com/itAZ9xR.png",
      services: ["GESTÃO DE REDES","TRÁFEGO PAGO","GOOGLE MEU NEGÓCIO","FUNIS","CONSULTORIA"],
    },
  ];

  const [selected, setSelected] = useState<Item | null>(null);

  // textura suave nas laterais
  const patternedBg =
    "linear-gradient(to right, rgba(0,0,0,0.05) 0 10%, transparent 10% 90%, rgba(0,0,0,0.05) 90% 100%), radial-gradient(1200px 200px at 50% -10%, rgba(255,255,255,.95), rgba(255,255,255,.65) 60%, rgba(255,255,255,.45))";

  const Card = ({ it }: { it: Item }) => {
    const baseW = 210;
    const baseH = 270;
    const reflectionMask: React.CSSProperties = {
      transform: "scaleY(-1)",
      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,0))",
      maskImage: "linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,0))",
      opacity: 0.25,
    };
    return (
      <button
        onClick={() => setSelected(it)}
        className="group relative flex flex-col items-center transition-transform hover:-translate-y-0.5"
        aria-label={`Selecionar ${it.title}`}
      >
        {/* CARD (sem borda) */}
        <div
          className="relative rounded-3xl shadow-[0_16px_80px_rgba(0,0,0,.10)] backdrop-blur"
          style={{
            width: baseW,
            height: baseH,
            backgroundImage: patternedBg,
            backgroundColor: "rgba(255,255,255,.85)",
            overflow: "hidden",
          }}
        >
          <img
            src={it.img}
            alt={it.title}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 object-contain filter grayscale drop-shadow-[0_2px_6px_rgba(255,255,255,.85)]"
          />
        </div>

        {/* REFLEXO */}
        <div
          className="relative mt-2 rounded-3xl shadow-[0_6px_40px_rgba(0,0,0,.08)]"
          style={{
            width: baseW,
            height: baseH * 0.9,
            backgroundImage: patternedBg,
            backgroundColor: "rgba(255,255,255,.85)",
            ...reflectionMask,
          }}
        >
          <img
            src={it.img}
            alt=""
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 object-contain filter grayscale drop-shadow-[0_2px_6px_rgba(255,255,255,.85)]"
          />
        </div>
      </button>
    );
  };

  return (
    <section id="servicos" className="relative w-full text-gray-700 px-6 py-16 sm:py-20 scroll-mt-24">
      <div className="w-full text-center mb-4">
        <h2 className="silver-kinetic text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">SERVIÇOS</h2>
        <p className="text-gray-500 text-sm sm:text-base mt-1">Clique em um card para ver os detalhes</p>
      </div>

      {/* GRID responsiva: cards e painel lado a lado no desktop */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-start gap-10 lg:gap-12">
        {/* COLUNA DOS CARDS – sem rotação, centralizados */}
        <div className="flex items-start justify-center">
          <div className="flex gap-8 sm:gap-10 lg:gap-12">
            {items.map((it) => (
              <Card key={it.key} it={it} />
            ))}
          </div>
        </div>

        {/* COLUNA DO PAINEL – aparece ao lado (desktop) / abaixo (mobile) */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.key}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative max-w-2xl mx-auto lg:mx-0"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute -top-2 -right-2 lg:top-0 lg:right-0 rounded-full bg-white/90 px-3 py-1 shadow hover:bg-white text-gray-600"
                  aria-label="Fechar detalhes"
                >
                  ✕
                </button>

                <h3 className="silver-kinetic text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                  {selected.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                  {selected.services.map((svc) => (
                    <div
                      key={svc}
                      className="rounded-2xl bg-white/75 backdrop-blur px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,.06)] hover:shadow-[0_18px_60px_rgba(0,0,0,.08)] transition-all hover:-translate-y-0.5"
                    >
                      <span className="text-sm sm:text-base font-semibold uppercase text-gray-700 tracking-wide">
                        {svc}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm text-gray-500">{selected.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
