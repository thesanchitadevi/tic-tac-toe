"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Sparkles from "./Sparkles";
import ConfettiButton from "./ConfettiButton";
import Confetti from "react-confetti"; // Make sure to import

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null)); // No type needed
  const [isXNext, setIsXNext] = useState(true);
  const [showWinEffects, setShowWinEffects] = useState(false);

  const calculateWinner = (squares) => {
    // No parameter type
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner} 🎉`
    : board.every(Boolean)
    ? "Draw! 😊"
    : `Next: ${isXNext ? "X" : "O"}`;

  useEffect(() => {
    if (winner) {
      setShowWinEffects(true);
      const timer = setTimeout(() => setShowWinEffects(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  const handleClick = (i) => {
    // No `: number` needed
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 max-w-md mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        Tic-Tac-Toe
      </motion.h1>

      <motion.p
        className="text-xl font-medium"
        animate={winner ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: winner ? Infinity : 0, duration: 1 }}
      >
        {status}
      </motion.p>

      <div className="grid grid-cols-3 gap-2 w-full">
        {board.map((cell, i) => (
          <Button
            key={i}
            variant="outline"
            size="lg"
            className="w-full h-24 text-4xl relative overflow-hidden bg-background hover:bg-accent/50" // Add bg-background
            onClick={() => handleClick(i)}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: cell ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center text-foreground" // Add text-foreground
            >
              {cell}
            </motion.span>
          </Button>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={resetGame} className="px-8 py-3 text-lg">
            Reset Game
          </Button>
        </motion.div>
        {/* <ConfettiButton /> */}
      </div>

      {/* <Sparkles /> */}

      {showWinEffects && (
        <div className="fixed inset-0 pointer-events-none">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={300}
            recycle={false}
          />
        </div>
      )}
    </div>
  );
}
