import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For animation
import Confetti from "react-confetti"; // Optional for confetti if needed
import useWindowSize from 'react-use/lib/useWindowSize'; // To calculate window size for confetti

import logo from "../assets/logo/logo-aura.png"

const Loader = ({ setShowConfetti }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Listen for spacebar press to remove loader
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        setIsLoading(false);
        setShowConfetti(true); // Trigger confetti when loader goes up
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setShowConfetti]);

  return (
    <>
      {isLoading ? (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "-100vh" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800"
        >
          <div className="relative">
            {/* AURA.ai Logo */}
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-purple-600">
              <img src={logo} alt="AURA.ai Logo" className="w-full h-full object-contain" />
            </div>

            {/* Revolving Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                className="w-48 h-48 border border-transparent rounded-full flex items-center justify-center"
              >
                <p className="text-white text-xl tracking-wide animate-spin-slow">
                  AURA.AI AURA.AI AURA.AI AURA.AI
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : (
        <Confetti width={width} height={height} recycle={false} />
      )}
    </>
  );
};

export default Loader;
