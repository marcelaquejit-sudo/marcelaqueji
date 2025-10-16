"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FestiveController() {
  const [mode, setMode] = useState<"normal" | "natal" | "reveillon">("normal");
  const [transitioning, setTransitioning] = useState(false);

  // Sons de cada tema
  const sounds = {
    natal: new Audio("https://cdn.pixabay.com/download/audio/2023/01/26/audio_9a6f8c63e5.mp3?filename=christmas-bells-14639.mp3"),
    reveillon: new Audio("https://cdn.pixabay.com/download/audio/2022/03/09/audio_87d2c7dc54.mp3?filename=fireworks-112995.mp3"),
  };

  const handleToggle = (target: "natal" | "reveillon") => {
    if (mode === target) {
      setMode("normal");
      return;
    }
    setTransitioning(true);
    setTimeout(() => {
      setMode(target);
      setTransitioning(false);
    }, 400);
    sounds[target].volume = 0.5;
    sounds[target].play();
  };

  return (
    <>
      {/* Botões fixos */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[1000]">
        <button
          onClick={() => handleToggle("natal")}
          className={`text-2xl ${
            mode === "natal"
              ? "bg-green-100/80 border-green-400"
              : "bg-white/70 border-white/60"
          } backdrop-blur shadow-md rounded-full px-3 py-2 hover:scale-110 transition`}
          title="Ativar modo Natal 🎄"
        >
          🎄
        </button>
        <button
          onClick={() => handleToggle("reveillon")}
          className={`text-2xl ${
            mode === "reveillon"
              ? "bg-yellow-100/80 border-yellow-400"
              : "bg-white/70 border-white/60"
          } backdrop-blur shadow-md rounded-full px-3 py-2 hover:scale-110 transition`}
          title="Ativar modo Réveillon 🎆"
        >
          🎆
        </button>
      </div>

      {/* Fade de transição */}
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

      {/* Overlays */}
      <AnimatePresence mode="wait">
        {mode === "natal" && <NatalOverlay key="natal" />}
        {mode === "reveillon" && <ReveillonOverlay key="reveillon" />}
      </AnimatePresence>
    </>
  );
}

/* ============================= 🎄 NATAL ============================= */

function NatalOverlay() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <SnowFall />
      <IceOverlay />
      <GuirlandaTop />
    </motion.div>
  );
}

/* ❄️ Flocos prateados caindo por toda a tela */
function SnowFall() {
  const flakes = Array.from({ length: 80 });

  return (
    <div className="fixed inset-0 overflow-hidden">
      {flakes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[18px] select-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * -1,
            opacity: 0.8,
            scale: 0.6 + Math.random() * 0.6,
          }}
          animate={{
            y: ["-10%", "110%"],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            opacity: [0.9, 0.5, 0.9],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(180deg,#f9f9f9,#c0c0c0,#a0a0a0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.4))",
            }}
          >
            ❄
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* 🧊 Camada de gelo translúcida */
function IceOverlay() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.25, 0.35, 0.25] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "url('https://i.imgur.com/kOIx4g2.png') repeat top left / cover",
        filter: "blur(4px) brightness(1.15)",
        mixBlendMode: "lighten",
      }}
    />
  );
}

/* 🌟 Luzes da guirlanda */
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

/* ============================= 🎆 RÉVEILLON ============================= */

function ReveillonOverlay() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Fireworks />
      <Confetti />
    </motion.div>
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

