"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import bg_image from "@/public/assets/bg_title_campanha.png";

export default function TituloSprayBackground() {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ delay: 2, duration: 1.8, ease: "easeOut" }}
      style={{
        position: "absolute",
        zIndex: -1,
        top: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        src={bg_image}
        alt="Spray Background"
        fill
        style={{
          zIndex: -1,
          pointerEvents: "none",
          position: "absolute",
          opacity: 0.6,
        }}
        priority
      />
    </motion.div>
  );
}
