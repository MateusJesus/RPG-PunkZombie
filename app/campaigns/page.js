"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import Link from "next/link";
import ListCampaign from "../components/ListCampaign";
import LoadingPage from "../components/Loading";

export default function Home() {
  const { listarCampanhasPublicas, loadingPage, user } = useAuth();
  const [campanhas, setCampanhas] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const fetchcampanhas = async () => {
      const { campanhas } = await listarCampanhasPublicas();
      setCampanhas(campanhas);
    };
    fetchcampanhas();
  }, []);

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
  };

  const campanhasFiltradas = campanhas.filter((campanha) =>
    campanha.configGeral.nome.toLowerCase().includes(busca.toLowerCase())
  );

  if (loadingPage) return <LoadingPage />;
  
  return (
    <section>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          height: "50vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            height: "100vh",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            textTransform="uppercase"
            color="text.secondary"
            mb={"10px"}
          >
            Campanhas públicas
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth={500}
            sx={{ textAlign: "justify", maxWidth: 500 }}
          >
            Campanhas são aventuras criadas por mestres onde jogadores podem
            participar com suas fichas. Aqui você encontra campanhas públicas
            disponíveis para explorar ou entrar.
          </Typography>
        </Box>
        <hr className="separation" />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 2,
            mt: 1,
            width: "100%",
          }}
        >
          <TextField
            label="Buscar ficha"
            variant="outlined"
            color="secondary"
            size="small"
            name="search"
            value={busca}
            onChange={handleBuscaChange}
            sx={{ minWidth: "250px", maxWidth: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          {user && (
            <Link href={"/config-campaign"}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ height: "40px" }}
              >
                criar campanha
              </Button>
            </Link>
          )}
        </Box>
        <hr className="separation" />
      </Box>

      <ListCampaign datas={campanhasFiltradas} />
    </section>
  );
}
