import React from "react";
import { motion } from "framer-motion";

export default function FeedbackFloatingSection() {
  const feedbacks = [
    { id: 'tiago',     type: 'text',  author: 'Tiago Fantin',   text: 'Muito competente, está em um nível alto e cobra um valor justo.', stars: 5 },
    { id: 'fernando',  type: 'text',  author: 'Fernando Ubaldo', text: 'Trabalho muito ótimo, super recomendo.', stars: 5 },
    { id: 'mariane',   type: 'text',  author: 'Mariane Ribeiro', text: 'Ajudou a engajar no Instagram, direção de conteúdo e organização. Sempre muito prestativa!', stars: 5 },
    { id: 'daniele',   type: 'text',  author: 'Daniele Lúcio',   text: 'Serviço excelente e completo. Sempre ouvindo o cliente. Profissionalismo impecável!', stars: 5 },
    { id: 'isabelly',  type: 'text',  author: 'Isabelly Soares', text: 'Você é INCRÍVEL, maravilhosa, atenciosa. O slogan ficou a minha cara. Obrigada!', stars: 5 },
    { id: 'kariny',    type: 'stars', author: 'Kariny Dalzotto',               aspect: 'Profissionalismo', stars: 5 },
    { id: 'giovanne',  type: 'stars', author: 'Giovanne Rocha',                aspect: 'Profissionalismo', stars: 5 },
    { id: 'shary',     type: 'stars', author: 'Sharyane Morais Ribeiro',       aspect: 'Receptividade, Qualidade, Profissionalismo, Valor', stars: 5 },
    { id: 'kayane',    type: 'stars', author: 'Kayane Talevi',                 aspect: 'Receptividade, Qualidade, Profissionalismo, Valor', stars: 5 },
    { id: 'patricia',  type: 'stars', author: 'Patrícia Lima da Cruz',         aspect: 'Receptividade, Qualidade, Profissionalismo, Valor', stars: 5 },
    { id: 'silmara',   type: 'stars', author: 'Silmara Guimarães',             aspect: 'Valor', stars: 4 },
    { id: 'gustavo',   type: 'stars', author: 'Gustavo Henrique',              aspect: 'Avaliação 5★', stars: 5 },
    { id: 'skyhawk',   type: 'stars', author: 'SkyHawk',                       aspect: 'Avaliação 5★', stars: 5 },
    { id: 'guilherme', type: 'stars', author: 'Guilherme Gonçalves (Local Guide)', aspect: 'Avaliação 5★', stars: 5 },
  ];

  // posições do layout antigo (desktop)
  const spots = [
    { top: '10%', left: '8%' },  { top: '14%', left: '36%' }, { top: '16%', left: '66%' },
    { top: '28%', left: '20%' }, { top: '30%', left: '50%' }, { top: '32%', left: '78%' },
    { top: '46%', left: '10%' }, { top: '48%', left: '38%' }, { top: '50%', left: '70%' },
    { top: '64%', left: '22%' }, { top: '66%', left: '54%' }, { top: '68%', left: '80%' },
    { top: '80%', left: '12%' }, { top: '82%', left: '42%' }, { top: '84%', left: '72%' },
  ];

  return (
    <section id="feedbacks" className="relative w-full bg-white scroll-mt-24">
      {/* Título */}
      <h2 className="text-center silver-kinetic text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight pt-16">
        Feedbacks e Resultados
      </h2>

      {/* ✅ MOBILE: lista com snap/efeito suave */}
      <div className="sm:hidden relative mt-6 pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -inset-24 blur-3xl opacity-30 bg-gradient-to-tr from-gray-200 via-gray-100 to-white animate-pulse" />
        </div>

        <div className="h-[78vh] overflow-y-auto px-4 snap-y snap-mandatory space-y-5 no-scrollbar">
          {feedbacks.map((f, i) => (
            <motion.article
              key={f.id}
              initial={{ opacity: 0.6, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ amount: 0.65, once: false }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="snap-center rounded-3xl border border-white/50 bg-white/85 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 text-base pr-2">{f.author}</h3>
                <span className="text-yellow-400 text-sm">{'★'.repeat(Math.max(0, Math.min(5, f.stars || 5)))}</span>
              </div>
              <p className="mt-2 text-gray-600 text-[15px] leading-snug">
                {f.type === "text" ? f.text : f.aspect}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* 💠 DESKTOP: mantém os cards flutuantes/arrastáveis */}
      <div className="hidden sm:block relative w-full min-h-[110vh] overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -inset-24 blur-3xl opacity-30 bg-gradient-to-tr from-gray-200 via-gray-100 to-white animate-pulse" />
        </div>

        <div className="absolute inset-0">
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
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                className="absolute w-[320px] cursor-grab active:cursor-grabbing rounded-3xl border border-white/40 backdrop-blur-2xl bg-white/70 shadow-[0_10px_60px_rgba(0,0,0,0.08)] p-4 hover:scale-[1.03] transition"
                style={{ top: `min(${spot.top}, 88%)`, left: spot.left }}
                animate={{ y: [0, -10, 0], transition: { duration, repeat: Infinity, ease: 'easeInOut' } }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700 text-base truncate pr-2">{f.author}</h3>
                  <span className="text-yellow-400 whitespace-nowrap">{'★'.repeat(Math.max(0, Math.min(5, f.stars || 5)))}</span>
                </div>
                <p className="text-gray-600 text-[15px] leading-snug">
                  {f.type === "text" ? f.text : f.aspect}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}