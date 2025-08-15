"use client";
import Link from "next/link";
import { useState } from "react";

export default function NotFound() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Página não encontrada</h1>
      <p>Ops! Parece que essa página não existe.</p>
      <Link
        href="/"
        style={{
          color: isHovering ? "var(--green-hover)" : "var(--green)",
          fontWeight: "200",
          textDecoration: "none",
          transition: "color 0.3s",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        Voltar ao início
      </Link>
    </div>
  );
}
