import React from "react";
import { motion } from "framer-motion";
import Sparkles from "./Sparkles";

export default function FeedbackFloatingSection() {
  const feedbacks = [
    { id: 'tiago',     type: 'text',  author: 'Tiago Fantin',   text: 'Muito competente, está em um nível alto e cobra um valor justo.', stars: 5 },
    { id: 'fernando',  type: 'text',  author: 'Fernando Ubaldo', text: 'Trabalho muito ótimo, super recomendo.', stars: 5 },
    { id: 'mariane',   type: 'text',  author: 'Mariane Ribeiro', text: 'Ajudou a engajar no Instagram, direção de conteúdo e organização. Sempre muito prestativa!', stars: 5 },
    { id: 'daniele',   type: 'text',  author: 'Daniele Lúcio',   text: 'Serviço excelente e completo. Sempre ouvindo o cliente. Profissionalismo impecável!', stars: 5 },
    { id: 'isabelly',  type: 'text',  author: 'Isabelly Soares', text: 'Você é INCRÍVEL, maravilhosa, atenciosa. O slogan ficou a minha cara. Obrigada!', stars: 5 },
    { id: 'kariny',    type: 'stars', author: 'Kariny Dalzotto', aspect: 'Profissionalismo', stars: 5 },
    { id: 'giovanne',  type: 'stars', author: 'Giovanne Rocha',  aspect: 'Profissionalismo', stars: 5 },
    { id: 'shary',     type: 'stars', author: 'Sharyane Morais Ribeiro', aspect: 'Receptividade, Qualidade, Profissionalismo, Valor', stars: 5 },
    { id: 'kayane',    type: 'stars', author: 'Kayane Talevi', aspect: 'Receptividade, Qualidade, Profissionalismo, Valor', stars: 5 },
    { id: 'patricia',  type: 'stars', author: 'Patrícia Lima da Cruz', aspect: 'Receptividade, Qualidade, Profissionalismo, Valor', stars: 5 },
    { id: 'silmara',   type: 'stars', author: 'Silmara Guimarães', aspect: 'Valor', stars: 4 },
    { id: 'gustavo',   type: 'stars', author: 'Gustavo Henrique', aspect: 'Avaliação 5★', stars: 5 },
    { id: 'skyhawk',   type: 'stars', author: 'SkyHawk', aspect: 'Avaliação 5★', stars: 5 },
    { id: 'guilherme', type: 'stars', author: 'Guilherme Gonçalves (Local Guide)', aspect: 'Avaliação 5★', stars: 5 },
  ];

  const spots = [
    { top: '10%', left: '8%' },  { top: '14%', left: '36%' }, { top: '16%', left: '66%' },
    { top: '28%', left: '20%' }, { top: '30%', left: '50%' }, { top: '32%', left: '78%' },
    { top: '46%', left: '10%' }, { top: '48%', left: '38%' }, { top: '50%', left: '70%' },
    { top: '64%', left: '22%' }, { top: '66%', left: '54%' }, { top: '68%', left: '80%' },
    { top: '80%', left: '12%' }, { top: '82%', left: '42%' }, { top: '84%', left: '72%' },
  ];

  return (
    <section
      id="feedbacks"
      className="relative w-full min-h-[120vh] flex flex-col items-center justify-center overflow-hidden px-6 py-24 scroll-mt-24"
    >
      {/* fundo suave com leve gradiente, sem cor sólida */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-24 blur-3xl opacity-30 bg-gradient-to-tr from-gray-200 via-gray-100 to-white animate-pulse" />
      </div>

      {/* ====== DESKTOP ====== */}
      <div className="hidden md:block absolute inset-0">
        {feedbacks.map((f, i) => {
          const spot = spots[i % spots.length];
          const delay = (i % 6) * 0.18;
          const duration = 6.5 + (i % 5);
          return (
            <motion.div
              key={f.id}
              drag
              dragElastic={0.12}
              dragMomentum={false}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut", delay },
              }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              className="absolute relative w-[260px] sm:w-[320px] cursor-grab active:cursor-grabbing rounded-3xl border border-[#c9c9c9]/60 backdrop-blur-2xl bg-white/70 p-4 transition-transform duration-300 ease-out hover:scale-[1.03]"
              style={{ top: `min(${spot.top}, 88%)`, left: spot.left }}
              animate={{
                y: [0, -10, 0],
                transition: { duration, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {/* brilhos em alguns cards (ex.: a cada 3) */}
              {i % 3 === 0 && <Sparkles count={6} color="#F4F1D0" />}

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700 text-sm sm:text-base truncate pr-2">
                  {f.author}
                </h3>
                <span className="text-yellow-400 whitespace-nowrap">
                  {"★".repeat(Math.max(0, Math.min(5, f.stars || 5)))}
                </span>
              </div>
              <p className="text-gray-600 text-sm sm:text-[15px] leading-snug">
                {f.type === "text" ? f.text : f.aspect}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* ====== MOBILE ====== */}
      <div className="md:hidden flex flex-col gap-6 w-full max-w-sm">
        {feedbacks.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
            }}
            viewport={{ once: false, amount: 0.4 }}
            className="relative rounded-3xl border border-[#c9c9c9]/60 backdrop-blur-2xl bg-white/70 p-4"
          >
            {/* brilhos em alguns cards no mobile (ex.: a cada 4) */}
            {i % 4 === 1 && <Sparkles count={5} color="#FFFFFF" />}

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700 text-sm truncate pr-2">
                {f.author}
              </h3>
              <span className="text-yellow-400 whitespace-nowrap">
                {"★".repeat(Math.max(0, Math.min(5, f.stars || 5)))}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-snug">
              {f.type === "text" ? f.text : f.aspect}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
