// src/components/ConfettiButton.tsx
"use client";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";

export default function ConfettiButton() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div className="relative">
      <Button
        onClick={() => {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }}
        variant="secondary"
      >
        🎉 Launch Confetti
      </Button>

      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
    </div>
  );
}
