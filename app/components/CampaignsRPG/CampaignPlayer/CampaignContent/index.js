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
  const [statusContent, setStatusContent] = useState({
    status: false,
    alert: "",
    message: "",
  });
  const [content, setContent] = useState({
    nome: "",
    tipo: "",
    descricao: "",
    outroTipo: "",
    imagem: null,
  });

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
    const { nome, tipo, descricao, outroTipo } = data;

    if (
      nome === "" ||
      tipo === "" ||
      descricao === "" ||
      (tipo === "outros" && outroTipo === "")
    ) {
      setConteudoEditando(null);
      return setStatusContent({
        status: true,
        alert: "error",
        message: "Preencha todos os campos!",
      });
    }

    try {
      setLoading(true);
      if (conteudoEditando) {
        await editarConteudoCampanha(idCampaigns, conteudoEditando.id, data);
      } else {
        await adicionarConteudoCampanha(idCampaigns, data);
      }
      setStatusContent({
        status: true,
        alert: "success",
        message: "Conteúdo adicionado com sucesso!",
      });
      setOpenModal(false);
      setConteudoEditando(null);
      setTimeout(() => {
        fetchConteudos();
      }, 1000);
    } catch (err) {
      console.error("Erro ao salvar conteúdo:", err.message);
    } finally {
      setOpenModal(false);
      setLoading(false);
    }
  };

  const handleEditContent = (conteudo) => {
    setConteudoEditando((prev) => ({
      ...conteudo,
      previewImage: conteudo.imagem,
    }));
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

  useEffect(() => {
    if (conteudoEditando) {
      setContent(conteudoEditando);
      console.log(conteudoEditando);
    } else {
      setContent({
        nome: "",
        tipo: "",
        descricao: "",
        outroTipo: "",
        imagem: null,
      });
    }
  }, [conteudoEditando]);

  const handleClose = () => {
    setConteudoEditando(null);
    setContent({
      nome: "",
      tipo: "",
      descricao: "",
      outroTipo: "",
      imagem: null,
      previewImage: null,
    });
    setOpenModal(false);
  };

  return (
    <>
      <AddContentModal
        content={content}
        setContent={setContent}
        open={openModal}
        handleClose={handleClose}
        onSave={handleAddContent}
        conteudoEditando={conteudoEditando}
      />

      <Snackbar
        open={statusContent.status}
        autoHideDuration={3000}
        onClose={() => setStatusContent({ status: false })}
      >
        <Alert severity={statusContent.alert}>{statusContent.message}</Alert>
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
            (formData.configGeral.permissaoConteudo === "jogadoresContent" &&
              formData.jogadores.some((j) => j.uid === user.uid))) && (
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
          <CircularProgress color="secondary" sx={{ mt: 4 }} />
        ) : conteudos.length !== 0 ? (
          <CardContent
            conteudos={conteudos}
            filter={filtro}
            onEdit={handleEditContent}
            onDelete={handleDeleteContent}
          />
        ) : (
          <Typography variant="body1" color="text.secondary">
            Nenhum conteúdo adicionado no momento...
          </Typography>
        )}
      </Box>
    </>
  );
}
