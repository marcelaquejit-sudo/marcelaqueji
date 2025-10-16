import React from "react";
import { motion } from "framer-motion";

export default function CasesShowcase() {
  const baseCards = [
    {
      key: "c1",
      type: "video",
      href: "https://www.mentoriafantin.com.br",
      label: "Mentoria Fantin",
      poster: "https://imgur.com/pMT8kBF.jpg",
      sources: [{ src: "https://imgur.com/pMT8kBF.mp4", type: "video/mp4" }],
    },
    {
      key: "c2",
      type: "video",
      href: "https://www.assessoriadespachanteribas.com.br",
      label: "Assessoria Despachante Ribas",
      poster: "https://imgur.com/oSxzMJH.jpg",
      sources: [{ src: "https://imgur.com/oSxzMJH.mp4", type: "video/mp4" }],
    },
    {
      key: "c3",
      type: "video",
      href: "https://www.protectribas.com.br",
      label: "Protect Ribas",
      poster: "https://imgur.com/FOCYvPv.jpg",
      sources: [{ src: "https://imgur.com/FOCYvPv.mp4", type: "video/mp4" }],
    },
    {
      key: "c4",
      type: "video",
      href: "https://www.vitamaxbrasil.com.br",
      label: "Vitamax",
      poster: "https://imgur.com/tAnQu0j.jpg",
      sources: [{ src: "https://imgur.com/tAnQu0j.mp4", type: "video/mp4" }],
    },
  ];

  const positions = [
    { top: "12%", left: "8%" },
    { top: "18%", left: "70%" },
    { top: "58%", left: "12%" },
    { top: "42%", left: "78%" },
  ];

  const hidden = { opacity: 0, y: 80 } as const;
  const visible = (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.12 * i },
  });

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = e.currentTarget.querySelector("video") as HTMLVideoElement | null;
    if (v) {
      try {
        v.play();
      } catch {}
    }
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = e.currentTarget.querySelector("video") as HTMLVideoElement | null;
    if (v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {}
    }
  };

  return (
    <section
      id="cases"
      className="relative w-full min-h-[90vh] overflow-hidden bg-white flex flex-col items-center justify-center px-6 py-24 scroll-mt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-24 blur-3xl opacity-30 bg-gradient-to-tr from-gray-200 via-gray-100 to-white" />
      </div>

      <h2 className="relative z-10 text-center silver-kinetic text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-10">
        Resultados falam mais que promessas
      </h2>

      <div className="absolute inset-0">
        {baseCards.map((c, idx) => {
          const pos = positions[idx % positions.length];
          // evita ${ … ${ … } … } aninhado nos templates:
          const topValue = `min(${pos.top}, 82%)`;
          const leftValue = pos.left;
          const animDelay = `${idx * 0.6}s`;
          const animDuration = `${9 + idx}s`;
          const floatClass = idx % 2 ? "float-alt" : "float-main";

          return (
            <motion.div
              key={c.key}
              initial={hidden}
              whileInView={visible(idx)}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              className={`group case-float ${floatClass}`}
              style={{
                position: "absolute",
                top: topValue,
                left: leftValue,
                animationDelay: animDelay,
                animationDuration: animDuration,
              }}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar ${c.label}`}
                className="absolute inset-0 z-10"
              />
              <video
                className="case-media"
                muted
                playsInline
                loop
                preload="metadata"
                poster={c.poster}
              >
                {c.sources.map((s) => (
                  <source key={s.src} src={s.src} type={s.type} />
                ))}
              </video>

              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-700 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:bg-white"
                >
                  Visitar projeto
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* estilos utilitários (iguais aos anteriores) são aplicados pelo Tailwind */}
    </section>
  );
}
