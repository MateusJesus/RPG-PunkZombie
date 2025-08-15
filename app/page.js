"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import ListFicha from "./components/ListFicha";
import SearchIcon from "@mui/icons-material/Search";
import LoadingPage from "./components/Loading";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import Link from "next/link";

export default function Home() {
  const { carregarFichasPublicas, loadingPage, user } = useAuth();
  const [fichas, setFichas] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const fetchFichas = async () => {
      const { fichas } = await carregarFichasPublicas();
      setFichas(fichas);
    };
    fetchFichas();
  }, []);

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
  };

  const fichasFiltradas = fichas.filter((ficha) =>
    ficha.informacoes.nome_personagem
      .toLowerCase()
      .includes(busca.toLowerCase())
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
            O que é PUNKZOMBIE?
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth={500}
            sx={{ textAlign: "justify", maxWidth: 500 }}
          >
            Punkzombie é um jogo de RPG focado nas pessoas que restaram depois
            de um apocalipse fúngico, que buscam garantir sua sobrevivência e
            resolver suas pendências e problemas do antigo ou do novo mundo.
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
            <Link href={"/ficha"}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ height: "40px" }}
              >
                criar ficha
              </Button>
            </Link>
          )}
        </Box>
        <hr className="separation" />
      </Box>

      <ListFicha datas={fichasFiltradas} />
    </section>
  );
}
