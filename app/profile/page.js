"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoadingPage from "../components/Loading";
import ListFicha from "../components/ListFicha";
import { useRouter } from "next/navigation";
import ProfileDetails from "../components/ProfileDetails";
import { Box, Button, Typography } from "@mui/material";

export default function Profile() {
  const { carregarMinhasFichas, loadingPage, user } = useAuth();
  const [fichas, setFichas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFichas = async () => {
      const data = await carregarMinhasFichas();
      setFichas(data);
    };
    if (user) fetchFichas();
  }, [user]);

  useEffect(() => {
    if (!user && !loadingPage) {
      router.push("/");
    }
  }, [user, loadingPage, router]);

  if (loadingPage) return <LoadingPage />;
  if (!user) return null;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Sidebar - Perfil */}
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

      {/* Conteúdo principal - fichas */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Filtrar por:
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <Button color="secundary" variant="outlined">Minhas Fichas</Button>
          <Button color="secundary" variant="outlined">Minhas Campanhas</Button>
          <Button color="secundary" variant="outlined">Campanhas Criadas</Button>
        </Box>

        <ListFicha datas={fichas} />
      </Box>
    </Box>
  );
}
