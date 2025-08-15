"use client";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function LikeButton({ isLiked = false, onToggle }) {
  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
      transition={{ duration: 0.4 }}
    >
      <IconButton onClick={onToggle} aria-label="Curtir" size="small">
        {isLiked ? (
          <Favorite />
        ) : (
          <FavoriteBorder sx={{ color: "gray" }} />
        )}
      </IconButton>
    </motion.div>
  );
}
