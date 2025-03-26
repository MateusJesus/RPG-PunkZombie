"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [fichas, setFichas] = useState([]);
  const URL = "http://localhost:3000/api/users";

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao obter os dados");
        }
        return response.json();
      })
      .then((data) => {
        setFichas(data);
        console.log("Dados recebidos:", data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, []);

  return (
    <div>
      <h1>Fichas de RPG</h1>
      <ul>
        {fichas.map((ficha, index) => (
          <li key={index}>{ficha.nomePersonagem}</li>
        ))}
      </ul>
    </div>
  );
}
