"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FestiveController() {
  const [mode, setMode] = useState<"normal" | "natal" | "reveillon">("normal");

  return (
    <>
      {/* Botões fixos */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[1000]">
        <button
          onClick={() => setMode(mode === "natal" ? "normal" : "natal")}
          className="text-2xl bg-white/70 backdrop-blur border border-white/60 shadow-md rounded-full px-3 py-2 hover:scale-110 transition"
          title="Ativar modo Natal 🎄"
        >
          🎄
        </button>
        <button
          onClick={() => setMode(mode === "reveillon" ? "normal" : "reveillon")}
          className="text-2xl bg-white/70 backdrop-blur border border-white/60 shadow-md rounded-full px-3 py-2 hover:scale-110 transition"
          title="Ativar modo Réveillon 🎆"
        >
          🎆
        </button>
      </div>

      {mode === "natal" && <NatalOverlay />}
      {mode === "reveillon" && <ReveillonOverlay />}
    </>
  );
}

/* 🎄 Natal */
function NatalOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[999]">
      <SnowFall />
      <GuirlandaTop />
    </div>
  );
}

function SnowFall() {
  const flakes = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {flakes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white text-lg"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            opacity: 0.8,
          }}
          animate={{
            y: ["0%", "120%"],
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❄️
        </motion.div>
      ))}
    </div>
  );
}

function GuirlandaTop() {
  const lights = Array.from({ length: 12 });

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center gap-4 mt-2">
      {lights.map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: ["#F4D03F", "#C0392B", "#1E5631"][i % 3],
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* 🎆 Reveillon */
function ReveillonOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[999]">
      <Fireworks />
      <Confetti />
    </div>
  );
}

function Fireworks() {
  const bursts = Array.from({ length: 8 });
  return (
    <div className="absolute inset-0">
      {bursts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
            scale: 0,
            opacity: 0.8,
          }}
          animate={{
            y: Math.random() * window.innerHeight * 0.5,
            scale: [0, 1.5, 0],
            opacity: [1, 0.7, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeOut",
          }}
        >
          <span className="text-yellow-400 text-3xl">✨</span>
        </motion.div>
      ))}
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 25 });
  return (
    <div className="absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: 0,
          }}
          animate={{
            y: "120%",
            rotate: 360,
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🎉
        </motion.div>
      ))}
    </div>
  );
}
