"use client";

import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddContentModal from "./AddContentModal";
import { useAuth } from "@/app/contexts/AuthContext";
import CardContent from "./CardContent";

export default function CampaignContent({ idCampaigns, formData }) {
  const [openModal, setOpenModal] = useState(false);
  const [conteudos, setConteudos] = useState([]);
  const [conteudoEditando, setConteudoEditando] = useState(null);
  const [filtro, setFiltro] = useState("todos");
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const {
    adicionarConteudoCampanha,
    getConteudosCampanha,
    editarConteudoCampanha,
    excluirConteudoCampanha,
    user,
  } = useAuth();

  const tipos = [
    "todos",
    "item",
    "inimigo",
    "neutro",
    "aliado",
    "mapa",
    "outros",
  ];

  const fetchConteudos = async () => {
    try {
      const conteudosCampanha = await getConteudosCampanha(idCampaigns);
      setConteudos(conteudosCampanha);
    } catch (error) {
      console.error("Erro ao buscar conteúdos:", error.message);
    }
  };

  const handleAddContent = async (data) => {
    try {
      setLoading(true);
      if (conteudoEditando) {
        await editarConteudoCampanha(idCampaigns, conteudoEditando.id, data);
      } else {
        await adicionarConteudoCampanha(idCampaigns, data);
      }
      setSuccessOpen(true);
      setOpenModal(false);
      setConteudoEditando(null);
      setTimeout(() => {
        fetchConteudos();
      }, 1000);
    } catch (err) {
      console.error("Erro ao salvar conteúdo:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditContent = (conteudo) => {
    setConteudoEditando(conteudo);
    setOpenModal(true);
  };

  const handleDeleteContent = async (conteudo) => {
    try {
      setLoading(true);
      await excluirConteudoCampanha(idCampaigns, conteudo.id);
      fetchConteudos();
    } catch (err) {
      console.error("Erro ao excluir conteúdo:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConteudos();
  }, [idCampaigns]);

  return (
    <>
      <AddContentModal
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setConteudoEditando(null);
        }}
        onSave={handleAddContent}
        conteudoEditando={conteudoEditando}
      />
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert severity="success">Conteúdo adicionado com sucesso!</Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={"bold"}
          textTransform={"uppercase"}
          color="text.secondary"
        >
          Conteúdo da campanha
        </Typography>
        <Typography variant="body1" color="text.secondary" width={500}>
          Este espaço é dedicado ao conteúdo exclusivo da campanha. Pode incluir
          informações sobre a história, personagens importantes, eventos
          marcantes, itens especiais e muito mais.
        </Typography>
        <hr className="separation" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "initial",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body1"
              textAlign={"initial"}
              textTransform={"uppercase"}
              color="text.secondary"
              mr={1}
            >
              Filtrar por:
            </Typography>
            <Box>
              {tipos.map((tipo) => (
                <Button
                  key={tipo}
                  size="small"
                  variant={filtro === tipo ? "contained" : "outlined"}
                  color="inherit"
                  onClick={() => setFiltro(tipo)}
                  sx={{ p: "0 10px", m: "3px" }}
                >
                  {tipo.toUpperCase()}
                </Button>
              ))}
            </Box>
          </Box>
          {(formData.mestreId === user.uid ||
            formData.configGeral.permissaoConteudo === "jogadoresContent") && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(true)}
            >
              Adicionar conteúdo
            </Button>
          )}
        </Box>
        <hr className="separation" />

        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : (
          <CardContent
            conteudos={conteudos}
            filter={filtro}
            onEdit={handleEditContent}
            onDelete={handleDeleteContent}
          />
        )}
      </Box>
    </>
  );
}
