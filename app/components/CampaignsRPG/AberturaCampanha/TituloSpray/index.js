"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TituloSpray({ children }) {
  return (
    <motion.h1
      initial={{ scale: 2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        fontSize: "3rem",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        fontFamily: "'Abibas', 'Playfair Display', serif",
        color: "white",
        textTransform: "uppercase",
        overflow: "hidden",
      }}
    >
      {children}
    </motion.h1>
  );
}
