"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function AberturaCampanha({ nome, historia, onFim }) {
  const [showTexto, setShowTexto] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timeoutTexto = setTimeout(() => setShowTexto(true), 2500);
    const timeoutSkip = setTimeout(() => setShowSkip(true), 100);

    return () => {
      clearTimeout(timeoutTexto);
      clearTimeout(timeoutSkip);
    };
  }, []);

  useEffect(() => {
    if (showTexto) {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i >= historia.length) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 3000);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [showTexto, historia]);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(onFim, 2000);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onFim]);

  const handleSkip = () => {
    setFadeOut(true);
  };

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 2rem",
            textAlign: "center",
            fontFamily: "'Abibas', 'Playfair Display', serif",
          }}
        >
          <motion.h1
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ fontSize: "3rem", marginBottom: "2rem" }}
          >
            {nome}
          </motion.h1>

          {/* Texto digitado da história */}
          {showTexto && (
            <motion.p
              initial={{ scale: 3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2 }}
              style={{
                fontSize: "1.25rem",
                maxWidth: "800px",
                fontFamily: "monospace",
                lineHeight: 1.6,
              }}
            >
              {historia}
            </motion.p>
          )}

          {/* Botão de Skip */}
          {showSkip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ position: "absolute", top: 20, right: 20 }}
            >
              <Button variant="outlined" color="inherit" onClick={handleSkip}>
                Pular
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
