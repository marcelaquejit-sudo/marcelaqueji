import React, { useMemo } from "react";
import { motion } from "framer-motion";

/** Pontinhos de brilho animados para sobrepor no card */
export default function Sparkles({
  count = 6,
  color = "#ffffff",
}: { count?: number; color?: string }) {
  // posições/tempos diferentes a cada render do card
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: 4 + Math.random() * 92, // %
        top: 8 + Math.random() * 72,  // %
        delay: Math.random() * 1.2,
        dur: 1.1 + Math.random() * 0.8,
        size: 8 + Math.round(Math.random() * 6), // px
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${s.left}%`, top: `${s.top}%` }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.8 + Math.random() * 0.8,
          }}
        >
          {/* Estrelinha simples (cross/star) */}
          <svg
            width={s.size}
            height={s.size}
            viewBox="0 0 24 24"
            style={{
              color,
              filter: "drop-shadow(0 0 6px rgba(255,255,255,.7))",
              opacity: 0.9,
            }}
          >
            <path
              fill="currentColor"
              d="M12 2l1.6 4.1L18 8l-4.4 1.9L12 14l-1.6-4.1L6 8l4.4-1.9L12 2z"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
