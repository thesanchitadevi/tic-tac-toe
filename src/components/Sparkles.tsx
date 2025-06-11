// src/components/Sparkles.tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const triggerSparkles = () => {
    const newSparkles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
    }));
    setSparkles(newSparkles);
  };

  useEffect(() => {
    if (sparkles.length > 0) {
      const timer = setTimeout(() => setSparkles([]), 1500);
      return () => clearTimeout(timer);
    }
  }, [sparkles]);

  return (
    <div className="relative">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            x: sparkle.x,
            y: sparkle.y,
            scale: [0, 1, 0],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 0.5,
          }}
          className="absolute w-2 h-2 rounded-full bg-yellow-400 pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
          }}
        />
      ))}
      <button
        onClick={triggerSparkles}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg"
      >
        Trigger Sparkles ✨
      </button>
    </div>
  );
}
