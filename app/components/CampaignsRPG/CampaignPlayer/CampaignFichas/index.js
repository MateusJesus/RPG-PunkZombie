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
import AddFichaModal from "./AddFichaModal";
import { useAuth } from "@/app/contexts/AuthContext";
import ListFicha from "@/app/components/ListFicha";

export default function CampaignFichas({ idCampaigns, formData }) {
  const [openModal, setOpenModal] = useState(false);
  const [fichas, setFichas] = useState([]);
  const [fichaEditando, setFichaEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // NOVO: mensagem de erro

  const {
    adicionarFichaCampanha,
    getFichasCampanha,
    excluirFichaCampanha,
    user,
  } = useAuth();

  const fetchFichas = async () => {
    try {
      const fichasCampanha = await getFichasCampanha(idCampaigns);
      setFichas(fichasCampanha);
    } catch (error) {
      console.error("Erro ao buscar fichas:", error.message);
    }
  };

  const handleSaveFicha = async (data) => {
    try {
      setLoading(true);
      await adicionarFichaCampanha(idCampaigns, data);
      setSuccessOpen(true);
      setOpenModal(false);
      setFichaEditando(null);
      setTimeout(() => {
        fetchFichas();
      }, 1000);
    } catch (err) {
      console.error("Erro ao salvar ficha:", err.message);
      setErrorMsg(err.message || "Erro ao salvar ficha.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditFicha = (ficha) => {
    setFichaEditando(ficha);
    setOpenModal(true);
  };

  const handleDeleteFicha = async (ficha) => {
    try {
      setLoading(true);
      await excluirFichaCampanha(idCampaigns, ficha.id);
      fetchFichas();
    } catch (err) {
      console.error("Erro ao excluir ficha:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFichas();
  }, [idCampaigns]);

  return (
    <>
      <AddFichaModal
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
        }}
        onEnviarFicha={handleSaveFicha}
      />
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert severity="success">Ficha enviada com sucesso!</Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMsg}
        autoHideDuration={4000}
        onClose={() => setErrorMsg("")}
      >
        <Alert severity="error">{errorMsg}</Alert>
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
          Fichas da campanha
        </Typography>
        <Typography variant="body1" color="text.secondary" width={500}>
          Aqui estão as fichas dos jogadores vinculadas a esta campanha. Você
          pode visualizar, editar ou remover as fichas conforme sua permissão.
        </Typography>
        <hr className="separation" />

        {(formData?.mestreId === user.uid ||
          formData?.jogadores?.find((j) => j.uid === user.uid)?.fichas?.length <
            Number(formData?.configGeral?.max_fichas)) && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenModal(true)}
          >
            Enviar ficha
          </Button>
        )}
        <hr className="separation" />
      </Box>
      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <ListFicha datas={fichas} />
      )}
    </>
  );
}
