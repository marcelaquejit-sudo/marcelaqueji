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

  const [selected, setSelected] = useState<Item | null>(null);
  const [angle, setAngle] = useState(0); // ângulo base do carrossel
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  // auto-rotação quando NENHUM card está selecionado
  useEffect(() => {
    function loop(t: number) {
      if (lastRef.current == null) lastRef.current = t;
      const dt = (t - lastRef.current) / 1000;
      lastRef.current = t;

      // 12° por segundo — suave
      setAngle((a) => a + (selected ? 0 : 12 * dt));
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, [selected]);

  // medidas responsivas do carrossel
  // (desktop maior, mobile menor)
  const radius = 260; // distância Z (desktop)
  const radiusSm = 200; // mobile
  const cardW = 210;
  const cardH = 270;

  // estilo do reflexo (usa mask para fade)
  const reflectionMask: React.CSSProperties = {
    transform: "scaleY(-1)",
    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,0))",
    maskImage: "linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,0))",
    opacity: 0.25,
  };

  // leve textura nas laterais do card
  const patternedBg =
    "linear-gradient(to right, rgba(0,0,0,0.06) 0 14%, transparent 14% 86%, rgba(0,0,0,0.06) 86% 100%), radial-gradient(1200px 180px at 50% -20%, rgba(255,255,255,0.9), rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.35))";

  const CircleCards = ({ small = false }: { small?: boolean }) => {
    const n = items.length;
    const R = small ? radiusSm : radius;

    return (
      <div
        className="relative select-none"
        style={{
          perspective: small ? 1200 : 1600,
          width: small ? 360 : 460,
          height: small ? 360 : 460,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((it, i) => {
            // ângulo ao redor do círculo
            const a = angle + (360 / n) * i;
            // mantém o card "virado" para a câmera (desfaz o rotateY)
            const transform = `rotateY(${a}deg) translateZ(${R}px) rotateY(${-a}deg)`;

            const isActive = selected?.key === it.key;

            return (
              <button
                key={it.key}
                onClick={() => setSelected(it)}
                aria-label={`Selecionar ${it.title}`}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ${
                  isActive ? "scale-[1.06] brightness-110" : "hover:scale-[1.03]"
                }`}
                style={{ transform, transformStyle: "preserve-3d" }}
              >
                {/* CARD */}
                <div
                  className="relative rounded-3xl border border-white/60 shadow-[0_20px_80px_rgba(0,0,0,.10)] backdrop-blur"
                  style={{
                    width: small ? cardW - 20 : cardW,
                    height: small ? cardH - 20 : cardH,
                    backgroundImage: patternedBg,
                    backgroundColor: "rgba(255,255,255,.75)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={it.img}
                    alt={it.title}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 object-contain filter grayscale drop-shadow-[0_2px_6px_rgba(255,255,255,.8)]"
                  />
                </div>

                {/* REFLEXO */}
                <div
                  className="relative mt-2 rounded-3xl border border-white/40 shadow-[0_6px_40px_rgba(0,0,0,.08)]"
                  style={{
                    width: small ? cardW - 20 : cardW,
                    height: (small ? cardH - 20 : cardH) * 0.9,
                    backgroundImage: patternedBg,
                    backgroundColor: "rgba(255,255,255,.75)",
                    ...reflectionMask,
                  }}
                >
                  <img
                    src={it.img}
                    alt=""
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 object-contain filter grayscale drop-shadow-[0_2px_6px_rgba(255,255,255,.8)]"
                    aria-hidden
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section
      id="servicos"
      className="relative w-full text-gray-700 px-6 py-16 sm:py-20 scroll-mt-24"
    >
      <div className="w-full text-center mb-2">
        <h2 className="silver-kinetic text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
          SERVIÇOS
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Clique em um card para ver os detalhes
        </p>
      </div>

      {/* GRID: desktop lado-a-lado; mobile empilhado */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-12">
        {/* Coluna do CARROSSEL */}
        <div className="flex justify-center">
          {/* Quando há seleção, a coluna fica “fixa”; sem seleção, fica central girando */}
          <div className={`transition-transform duration-500 ${selected ? "" : ""}`}>
            {/* mobile usa versão small, desktop a grande */}
            <div className="block lg:hidden">
              <CircleCards small />
            </div>
            <div className="hidden lg:block">
              <CircleCards />
            </div>
          </div>
        </div>

        {/* Coluna do PAINEL (aparece só com seleção; some e volta a girar) */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.key}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative max-w-2xl mx-auto lg:mx-0"
              >
                {/* Fechar */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute -top-2 -right-2 lg:top-0 lg:right-0 rounded-full bg-white/90 border border-white/60 px-3 py-1 shadow hover:bg-white text-gray-600"
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
                      className="rounded-2xl border border-white/50 bg-white/70 backdrop-blur px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,.06)] hover:shadow-[0_18px_60px_rgba(0,0,0,.08)] transition-all hover:-translate-y-0.5"
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
