"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import ListFicha from "./components/ListFicha";
import LoadingPage from "./components/Loading";

export default function Home() {
  const { carregarFichasPublicas, loadingPage } = useAuth();
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    const fetchFichas = async () => {
      const { fichas } = await carregarFichasPublicas();
      setFichas(fichas);
    };
    fetchFichas();
  }, []);

  if (loadingPage) return <LoadingPage />;

  return (
    <section>
      <ListFicha datas={fichas} />
    </section>
  );
}
