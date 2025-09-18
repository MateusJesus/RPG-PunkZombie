"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoadingPage from "../components/Loading";
import ListFicha from "../components/ListFicha";
import ListCampaign from "../components/ListCampaign";
import ProfileDetails from "../components/ProfileDetails";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

export default function Profile() {
  const {
    carregarMinhasFichas,
    carregarMinhasCampanhasCriadas,
    carregarCampanhasParticipando,
    loadingPage,
    user,
  } = useAuth();

  const router = useRouter();

  // 🔹 Estados separados
  const [fichas, setFichas] = useState([]);
  const [campanhasCriadas, setCampanhasCriadas] = useState([]);
  const [campanhasParticipando, setCampanhasParticipando] = useState([]);
  const [filter, setFilter] = useState("fichas"); // fichas | campanhasCriadas | campanhasParticipando
  const [loadingItems, setLoadingItems] = useState(false);

  // redireciona se não estiver logado
  useEffect(() => {
    if (!user && !loadingPage) {
      router.push("/");
    }
  }, [user, loadingPage, router]);

  // 🔹 Carrega dados baseado no filtro
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoadingItems(true);

      try {
        if (filter === "fichas") {
          const result = await carregarMinhasFichas();
          setFichas(result?.fichas || []);
        } else if (filter === "campanhasCriadas") {
          const result = await carregarMinhasCampanhasCriadas();
          setCampanhasCriadas(result?.campanhas || []);
        } else if (filter === "campanhasParticipando") {
          const result = await carregarCampanhasParticipando();
          // 🔹 filtra apenas campanhas que você participa e não criou
          setCampanhasParticipando(
            (result?.campanhas || []).filter((c) => c.mestreId !== user.uid)
          );
        }
      } catch (err) {
        console.error("Erro ao carregar itens:", err);
        if (filter === "fichas") setFichas([]);
        if (filter === "campanhasCriadas") setCampanhasCriadas([]);
        if (filter === "campanhasParticipando") setCampanhasParticipando([]);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchData();
  }, [user, filter]);

  if (loadingPage || loadingItems) return <LoadingPage />;
  if (!user) return null;

  // 🔹 Determina qual array mostrar baseado no filtro
  const items =
    filter === "fichas"
      ? fichas
      : filter === "campanhasCriadas"
      ? campanhasCriadas
      : campanhasParticipando;

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 64px)",
        overflow: "hidden",
        width: "100%",
      }}
    >
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

      <Box sx={{ flex: 1, overflowY: "auto", p: 4, width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          Filtrar por:
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <Button
            color="secondary"
            variant={filter === "fichas" ? "contained" : "outlined"}
            onClick={() => setFilter("fichas")}
          >
            Minhas Fichas
          </Button>
          <Button
            color="secondary"
            variant={filter === "campanhasCriadas" ? "contained" : "outlined"}
            onClick={() => setFilter("campanhasCriadas")}
          >
            Minhas Campanhas
          </Button>
          <Button
            color="secondary"
            variant={
              filter === "campanhasParticipando" ? "contained" : "outlined"
            }
            onClick={() => setFilter("campanhasParticipando")}
          >
            Campanhas que participo
          </Button>
        </Box>

        <Box sx={{ width: "100%" }}>
          {items.length > 0 ? (
            filter === "fichas" ? (
              <ListFicha datas={items} />
            ) : (
              <ListCampaign datas={items} />
            )
          ) : (
            <p>
              {filter === "fichas"
                ? "Você ainda não tem fichas, vamos criar uma!"
                : "Nenhuma campanha encontrada."}
            </p>
          )}
        </Box>
      </Box>
    </Box>
  );
}
