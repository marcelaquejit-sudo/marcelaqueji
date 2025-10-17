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

      {/* transição branca suave (mantido, mesmo sem uso de setTransitioning) */}
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

  const treePath = `
    M300 110
    L270 150 L330 150
    L250 200 L350 200
    L230 250 L370 250
    L210 300 L390 300
    L190 350 L410 350
    L175 390 L425 390
  `;
  const trunkPath = `M285 410 L285 470 L315 470 L315 410 Z`;

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
          points="300,85 310,105 332,108 316,122 320,143 300,133 280,143 284,122 268,108 290,105"
          fill="#F4D03F"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.15, 1], opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          filter="drop-shadow(0 0 10px rgba(244,208,63,.75))"
        />

        <motion.path
          d={treePath}
          fill="none"
          stroke="#E3B873"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
          filter="drop-shadow(0 0 10px rgba(227,184,115,.55))"
        />

        <motion.path
          d={trunkPath}
          fill="#E3B873"
          initial={{ scaleY: 0, opacity: 0, transformOrigin: "50% 100%" }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 2.5 }}
          filter="drop-shadow(0 0 8px rgba(227,184,115,.45))"
        />

        <motion.path
          d="M180 500 Q300 540 420 500"
          fill="none"
          stroke="#E3B873"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 2.6 }}
          filter="drop-shadow(0 0 8px rgba(227,184,115,.45))"
        />

        <motion.div
          style={{ offsetPath: `path("${treePath}")`, offsetRotate: "0deg" }}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #7EE1FF 0%, #3AB6FF 50%, rgba(58,182,255,0) 70%)",
              filter: "drop-shadow(0 0 10px rgba(126,225,255,.75))",
            }}
          />
        </motion.div>

        {[{x:270,y:150},{x:330,y:150},{x:250,y:200},{x:350,y:200},{x:230,y:250},{x:370,y:250},{x:210,y:300},{x:390,y:300},{x:190,y:350},{x:410,y:350}].map((p,i)=>(
          <motion.circle
            key={i}
            cx={p.x} cy={p.y} r="5"
            fill={["#F4D03F","#C0392B","#1E5631"][i%3]}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0,1,0.6,1], scale: [0.5,1.2,1] }}
            transition={{ delay: 2.1 + i*0.06, duration: 0.9, repeat: Infinity, repeatDelay: 2 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

/* ============================= 🎄 MODO NATAL ============================= */
function NatalOverlay() {
  const h = useDocHeight();
  return (
    <>
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

      {/* trenó separado do overlay, mas no mesmo nível */}
      <SantaSled />
    </>
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

function GarlandEdge({ side="top" }: { side?: "top"|"bottom" }) {
  const dots = Array.from({ length: 18 });
  return (
    <div className={`pointer-events-none fixed ${side==='top'?'top-0':'bottom-0'} left-0 right-0 z-[998] flex justify-center gap-4 py-2`}>
      {dots.map((_, i) => (
        <motion.div
          key={i}
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: ["#F4D03F","#C0392B","#1E5631"][i%3] }}
          animate={{ opacity: [0.3,1,0.3], scale:[1,1.25,1] }}
          transition={{ duration: 1 + (i%5)*0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function SantaSled() {
  return (
    <motion.div
      className="fixed z-[997] left-[-15vw] top-[12vh] text-3xl select-none pointer-events-none"
      animate={{ x: ["-15vw","120vw"] , y: ["0vh","-2vh","0vh"] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 6 }}
      style={{ textShadow: "0 2px 8px rgba(0,0,0,.25)" }}
    >
      🛷🎅🏻✨
    </motion.div>
  );
}

