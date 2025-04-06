"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import ListFicha from "./components/ListFicha";
import LoadingPage from "./components/Loading";

export default function Home() {
  const { carregarFichasPublicas, loadingPage } = useAuth();
  const [fichas, setFichas] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const fetchFichas = async () => {
      const { fichas, lastVisible } = await carregarFichasPublicas();
      setFichas(fichas);
      setLastDoc(lastVisible);
    };
    fetchFichas();
  }, []);

  const lastFichaElementRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && lastDoc) {
          setLoadingMore(true);
          const { fichas: novasFichas, lastVisible } = await carregarFichasPublicas(lastDoc);
          setFichas((prev) => [...prev, ...novasFichas]);
          setLastDoc(lastVisible);
          setLoadingMore(false);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, lastDoc]
  );

  if (loadingPage) return <LoadingPage />;

  return (
    <section>
      <ListFicha datas={fichas} lastRef={lastFichaElementRef} />
      {loadingMore && <p>Carregando mais fichas...</p>}
    </section>
  );
}
