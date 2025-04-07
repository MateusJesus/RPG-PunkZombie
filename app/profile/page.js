"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoadingPage from "../components/Loading";
import ListFicha from "../components/ListFicha";
import { useRouter } from "next/navigation";
import ProfileDetails from "../components/ProfileDetails";
import { Box, Button, Typography } from "@mui/material";

export default function Profile() {
  const { carregarMinhasFichas, loadingPage, user } = useAuth();
  const [fichas, setFichas] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();
  const observer = useRef();

  // redireciona se não estiver logado
  useEffect(() => {
    if (!user && !loadingPage) {
      router.push("/");
    }
  }, [user, loadingPage, router]);

  // primeira carga
  useEffect(() => {
    const fetchFichas = async () => {
      const { fichas, lastVisible } = await carregarMinhasFichas(); // sem lastDoc na primeira vez
      setFichas(fichas);
      setLastDoc(lastVisible);
    };
    if (user) fetchFichas();
  }, [user]);

  // scroll infinito
  const lastFichaElementRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && lastDoc) {
          setLoadingMore(true);
          const { fichas: novasFichas, lastVisible } = await carregarMinhasFichas(lastDoc);

          setFichas((prev) => {
            const idsExistentes = new Set(prev.map((f) => f.id));
            const novasUnicas = novasFichas.filter((f) => !idsExistentes.has(f.id));
            return [...prev, ...novasUnicas];
          });

          setLastDoc(lastVisible);
          setLoadingMore(false);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, lastDoc]
  );

  if (loadingPage) return <LoadingPage />;
  if (!user) return null;

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)", overflow: "hidden" }}>
      <Box
        sx={{
          width: "30%",
          minWidth: "300px",
          backgroundColor: "var(--color-4)",
          p: 3,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <ProfileDetails />
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Filtrar por:
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <Button color="secundary" variant="outlined">Minhas Fichas</Button>
          <Button color="secundary" variant="outlined">Minhas Campanhas</Button>
          <Button color="secundary" variant="outlined">Campanhas Criadas</Button>
        </Box>

        {fichas.length > 0 ? (
          <ListFicha datas={fichas} lastRef={lastFichaElementRef} />
        ) : (
          <p>Você ainda não tem fichas, vamos criar uma!</p>
        )}

        {loadingMore && <p>Carregando mais fichas...</p>}
      </Box>
    </Box>
  );
}
