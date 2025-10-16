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

  // posições do layout flutuante (desktop)
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
      className="relative w-full min-h-[68vh] sm:min-h-[90vh] overflow-hidden bg-white flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 scroll-mt-24"
    >
      {/* glow de fundo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-24 blur-3xl opacity-30 bg-gradient-to-tr from-gray-200 via-gray-100 to-white" />
      </div>

      <h2 className="relative z-10 text-center silver-kinetic text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight mb-6 sm:mb-10">
        Resultados falam mais que promessas
      </h2>

      {/* ✅ MOBILE: carrossel horizontal com thumbs (mais leve) */}
      <div className="relative z-10 w-full sm:hidden">
        <div className="no-scrollbar -mx-3 px-3 overflow-x-auto">
          <div className="flex gap-3">
            {baseCards.map((c) => (
              <a
                key={c.key}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-[76%] xs:w-[65%] aspect-video rounded-2xl border border-white/60 bg-white/80 backdrop-blur shadow-[0_8px_28px_rgba(0,0,0,0.08)] overflow-hidden active:scale-[0.99] transition"
                aria-label={`Visitar ${c.label}`}
              >
                {/* usar imagem (poster) para performance no mobile */}
                <img
                  src={c.poster}
                  alt={c.label}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 💠 DESKTOP/TABLET: layout flutuante com vídeos */}
      <div className="hidden sm:block absolute inset-0">
        {baseCards.map((c, idx) => (
          <motion.div
            key={c.key}
            initial={hidden}
            whileInView={visible(idx)}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            className={`group case-float ${idx % 2 ? "float-alt" : "float-main"}`}
            style={{
              position: "absolute",
              top: `min(${positions[idx % positions.length].top}, 82%)`,
              left: positions[idx % positions.length].left,
              animationDelay: `${idx * 0.6}s`,
              animationDuration: `${9 + idx}s`,
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
                Visite a case
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* estilos */}
      <style>{`
        .case-float {
          width: 240px;
          height: 140px;
          border-radius: 18px;
          display: block;
          overflow: hidden;
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.60);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 10px 40px rgba(0,0,0,0.06);
          transition: transform .35s ease, box-shadow .35s ease;
          animation: floatCard 12s ease-in-out infinite;
          will-change: transform;
          position: relative;
        }
        .case-float:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 26px 80px rgba(0,0,0,0.10); animation-play-state: paused; }
        .case-media { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: filter 0.5s ease, transform 0.5s ease, opacity 0.5s ease; opacity: 0.98; }
        .case-float:hover .case-media { filter: grayscale(0%); transform: scale(1.04); opacity: 1; }
        @keyframes floatCard { 0% { transform: translateY(0) rotateZ(0deg) } 50% { transform: translateY(-18px) rotateZ(0.4deg) } 100% { transform: translateY(0) rotateZ(0deg) } }
        @keyframes floatCardAlt { 0% { transform: translateY(0) translateX(0) rotateZ(0deg) } 25% { transform: translateY(-10px) translateX(8px) rotateZ(-0.2deg) } 50% { transform: translateY(-14px) translateX(0) rotateZ(-0.4deg) } 75% { transform: translateY(-10px) translateX(-8px) rotateZ(-0.2deg) } 100% { transform: translateY(0) translateX(0) rotateZ(0deg) } }
        .float-main { animation-name: floatCard; }
        .float-alt { animation-name: floatCardAlt; }

        /* esconder scrollbar do carrossel mobile */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}