"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useDocHeight() {
  const [h, setH] = useState<number>(
    typeof window !== "undefined" ? document.documentElement.scrollHeight : 0
  );
  useEffect(() => {
    const update = () => setH(document.documentElement.scrollHeight);
    update();
    const interval = setInterval(update, 800);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
  return h || 0;
}

export default function FestiveController() {
  const [mode, setMode] = useState<"normal" | "natal">("normal");
  const [transitioning, setTransitioning] = useState(false);
  const [showNatalIntro, setShowNatalIntro] = useState(false);

  const bellRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    bellRef.current = new Audio(
      "https://cdn.pixabay.com/download/audio/2023/01/26/audio_9a6f8c63e5.mp3?filename=christmas-bells-14639.mp3"
    );
    if (bellRef.current) bellRef.current.volume = 0.5;
  }, []);

  const playBell = () => {
    if (!bellRef.current) return;
    bellRef.current.currentTime = 0;
    bellRef.current.play().catch(() => {});
  };

  const handleToggle = () => {
    if (mode === "natal") {
      setMode("normal");
      return;
    }
    playBell();
    setShowNatalIntro(true);
  };

  return (
    <>
      {/* botão fixo 🎄 */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[1000]">
        <button
          onClick={handleToggle}
          className={`text-2xl ${
            mode === "natal"
              ? "bg-green-100/80 border-green-400"
              : "bg-white/70 border-white/60"
          } backdrop-blur shadow-md rounded-full px-3 py-2 hover:scale-110 transition`}
          title="Ativar modo Natal 🎄"
        >
          🎄
        </button>
      </div>

      {/* transição branca suave */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 bg-white/60 backdrop-blur-md z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* introdução de natal */}
      <AnimatePresence>
        {showNatalIntro && (
          <ChristmasIntroOverlay
            onDone={() => {
              setShowNatalIntro(false);
              setMode("natal");
            }}
          />
        )}
      </AnimatePresence>

      {/* overlay de natal ativa */}
      <AnimatePresence mode="wait">
        {mode === "natal" && <NatalOverlay key="natal" />}
      </AnimatePresence>
    </>
  );
}

/* ============================= 🎄 INTRO DE NATAL ============================= */
function ChristmasIntroOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3600);
    return () => clearTimeout(t);
  }, [onDone]);

  const path =
    "M300,480 Q360,420 300,360 Q240,300 300,240 Q360,180 300,130";

  return (
    <motion.div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-[#0b0f1a]/92"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <svg viewBox="0 0 600 600" className="w-[92vw] max-w-[640px]">
        <radialGradient id="goldGlow" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#FFDFA3" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0b0f1a" stopOpacity="0" />
        </radialGradient>
        <rect width="600" height="600" fill="url(#goldGlow)" />

        <motion.polygon
          points="300,95 309,115 331,118 315,132 319,153 300,143 281,153 285,132 269,118 291,115"
          fill="#F4D03F"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.1, 1], opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          filter="drop-shadow(0 0 8px rgba(244,208,63,.7))"
        />

        <motion.path
          d={path}
          fill="none"
          stroke="#E3B873"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.25 }}
          filter="drop-shadow(0 0 10px rgba(227,184,115,.55))"
        />

        <motion.path
          d="M290,510 Q300,520 310,510"
          fill="none"
          stroke="#E3B873"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 2.5 }}
          filter="drop-shadow(0 0 10px rgba(227,184,115,.55))"
        />

        <motion.div
          style={{
            offsetPath: `path("${path}")`,
            offsetRotate: "0deg",
          }}
          className="w-3 h-3 rounded-full"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.25 }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #7EE1FF 0%, #3AB6FF 50%, rgba(58,182,255,0) 70%)",
              filter: "drop-shadow(0 0 10px rgba(126,225,255,.8))",
            }}
          />
        </motion.div>
      </svg>
    </motion.div>
  );
}

/* ============================= 🎄 MODO NATAL ============================= */
function NatalOverlay() {
  const h = useDocHeight();
  return (
    <motion.div
      className="absolute left-0 top-0 w-full pointer-events-none overflow-visible z-[999]"
      style={{ height: h || "100vh" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <SnowFall docHeight={h} />
      <IceOverlay docHeight={h} />
      <GuirlandaTop />
    </motion.div>
  );
}

function SnowFall({ docHeight }: { docHeight: number }) {
  const count = Math.min(160, Math.max(80, Math.floor(docHeight / 12)));
  const flakes = Array.from({ length: count });
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;

  return (
    <div className="absolute left-0 top-0 w-full" style={{ height: docHeight || "100vh" }}>
      {flakes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[18px] select-none"
          initial={{
            x: Math.random() * vw,
            y: -(Math.random() * (docHeight || 1000)),
            opacity: 0.85,
            scale: 0.6 + Math.random() * 0.7,
          }}
          animate={{
            y: (docHeight || 1000) + 100,
            x: [Math.random() * vw, Math.random() * vw],
            opacity: [0.95, 0.6, 0.95],
          }}
          transition={{
            duration: 10 + Math.random() * 12,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span
            style={{
              background: "linear-gradient(180deg,#f9f9f9,#c0c0c0,#9b9b9b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.45))",
            }}
          >
            ❄
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function IceOverlay({ docHeight }: { docHeight: number }) {
  return (
    <motion.div
      className="absolute left-0 top-0 w-full pointer-events-none"
      style={{ height: docHeight || "100vh" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.22, 0.32, 0.22] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
          "radial-gradient(circle at 50% 20%, rgba(255,255,255,.15), rgba(255,255,255,0) 60%)",
          filter: "blur(4px) brightness(1.1)",
          mixBlendMode: "lighten",
        }}
      />
    </motion.div>
  );
}

function GuirlandaTop() {
  const lights = Array.from({ length: 12 });
  return (
    <div className="fixed top-1 left-0 right-0 flex justify-center gap-4">
      {lights.map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: ["#F4D03F", "#C0392B", "#1E5631"][i % 3] }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.25, 1] }}
          transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
