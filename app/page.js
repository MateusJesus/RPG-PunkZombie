"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material";

export default function Home() {
  const [fichas, setFichas] = useState([
    {
      usuario: "",
      data_hora: "",
      carga: "",
      imagem: null,
      informacoes: {
        nome_jogador: "TEST_jogador",
        nome_personagem: "TEST_Personagem",
        variante: "TEST_variante",
        origem: "TEST_origem",
        classe: "TEST_Classe",
        resistencia: "TEST_Resistencia",
      },
      status: {
        status_niv: "",
        status_sta: "",
        status_statot: "",
        status_pdi: "",
        status_pditot: "",
        status_pdv: "",
        status_pdvtot: "",
      },
      caracteristicas: {
        aparencia: "TEST_aparencia",
        personalidade: "TEST_personalidade",
      },
      atributos: {
        atri_for: "1",
        atri_int: "2",
        atri_agi: "3",
        atri_vig: "4",
        atri_car: "5",
      },
      pericias: [
        {
          soma: 4,
          nomePericia: "1",
          atributoPer: "INT",
          outros: 0,
        },
        {
          soma: 4,
          nomePericia: "3",
          atributoPer: "INT",
          outros: 0,
        },
        {
          soma: 3,
          nomePericia: "1",
          atributoPer: "",
          outros: 0,
        },
        {
          soma: 5,
          nomePericia: "5",
          atributoPer: "AGI",
          outros: 0,
        },
        {
          soma: 7,
          nomePericia: "5",
          atributoPer: "CAR",
          outros: 0,
        },
      ],
      equipamentos: [],
      vestimentas: [],
      armas: [],
      proficiencia: [],
      defesa: {
        defesatot: 10,
      },
      camp1_camp2: {
        titleCamp1: "",
        textCamp1: "",
        titleCamp2: "",
        textCamp2: "",
      },
      camp3: [],
      camp4: [],
    },
    {
      usuario: "",
      data_hora: "",
      carga: "",
      imagem: null,
      informacoes: {
        nome_jogador: "TEST_jogador",
        nome_personagem: "TEST_Personagem",
        variante: "TEST_variante",
        origem: "TEST_origem",
        classe: "TEST_Classe",
        resistencia: "TEST_Resistencia",
      },
      status: {
        status_niv: "",
        status_sta: "",
        status_statot: "",
        status_pdi: "",
        status_pditot: "",
        status_pdv: "",
        status_pdvtot: "",
      },
      caracteristicas: {
        aparencia: "TEST_aparencia",
        personalidade: "TEST_personalidade",
      },
      atributos: {
        atri_for: "1",
        atri_int: "2",
        atri_agi: "3",
        atri_vig: "4",
        atri_car: "5",
      },
      pericias: [
        {
          soma: 4,
          nomePericia: "1",
          atributoPer: "INT",
          outros: 0,
        },
        {
          soma: 4,
          nomePericia: "3",
          atributoPer: "INT",
          outros: 0,
        },
        {
          soma: 3,
          nomePericia: "1",
          atributoPer: "",
          outros: 0,
        },
        {
          soma: 5,
          nomePericia: "5",
          atributoPer: "AGI",
          outros: 0,
        },
        {
          soma: 7,
          nomePericia: "5",
          atributoPer: "CAR",
          outros: 0,
        },
      ],
      equipamentos: [],
      vestimentas: [],
      armas: [],
      proficiencia: [],
      defesa: {
        defesatot: 10,
      },
      camp1_camp2: {
        titleCamp1: "",
        textCamp1: "",
        titleCamp2: "",
        textCamp2: "",
      },
      camp3: [],
      camp4: [],
    },
    {
      usuario: "",
      data_hora: "",
      carga: "",
      imagem: null,
      informacoes: {
        nome_jogador: "TEST_jogador",
        nome_personagem: "TEST_Personagem",
        variante: "TEST_variante",
        origem: "TEST_origem",
        classe: "TEST_Classe",
        resistencia: "TEST_Resistencia",
      },
      status: {
        status_niv: "",
        status_sta: "",
        status_statot: "",
        status_pdi: "",
        status_pditot: "",
        status_pdv: "",
        status_pdvtot: "",
      },
      caracteristicas: {
        aparencia: "TEST_aparencia",
        personalidade: "TEST_personalidade",
      },
      atributos: {
        atri_for: "1",
        atri_int: "2",
        atri_agi: "3",
        atri_vig: "4",
        atri_car: "5",
      },
      pericias: [
        {
          soma: 4,
          nomePericia: "1",
          atributoPer: "INT",
          outros: 0,
        },
        {
          soma: 4,
          nomePericia: "3",
          atributoPer: "INT",
          outros: 0,
        },
        {
          soma: 3,
          nomePericia: "1",
          atributoPer: "",
          outros: 0,
        },
        {
          soma: 5,
          nomePericia: "5",
          atributoPer: "AGI",
          outros: 0,
        },
        {
          soma: 7,
          nomePericia: "5",
          atributoPer: "CAR",
          outros: 0,
        },
      ],
      equipamentos: [],
      vestimentas: [],
      armas: [],
      proficiencia: [],
      defesa: {
        defesatot: 10,
      },
      camp1_camp2: {
        titleCamp1: "",
        textCamp1: "",
        titleCamp2: "",
        textCamp2: "",
      },
      camp3: [],
      camp4: [],
    },
  ]);
  const URL = "http://api-php-punkzombie.free.nf/getInfo.php";

  useEffect(() => {
    // fetch("/api/fichas")
    //   .then((res) => res.text())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error("Erro:", error));
  }, []);

  return (
    <div>
      <h1>Fichas públicas de RPG!!</h1>
      <ul>
        {fichas.length > 0 ? (
          fichas.map((ficha, index) => (
            <li key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  minHeight: 200,
                  display: "flex",
                  marginBottom: 5,
                }}
              >
                <Box
                  sx={{
                    minHeight: "100%",
                    minWidth: 100,
                    background: "orange",
                  }}
                />
                <CardContent
                  sx={{
                    maxWidth: 345,
                    minHeight: 200,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", 
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <Box>
                    <Typography gutterBottom variant="h5" component="div">
                      {ficha.informacoes.nome_jogador}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {ficha.caracteristicas.aparencia}
                    </Typography>
                  </Box>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                </CardContent>
              </Card>
            </li>
          ))
        ) : (
          <p>Não tem fichas ainda, vamos criar uma?</p>
        )}
      </ul>
    </div>
  );
}
