"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { Snackbar, Dialog, DialogContent, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import InfoCampaign from "./InfoCampaign";
import LoadingPage from "../../Loading";

export default function ConfigCampaignComponent({ idCampanha }) {
  const router = useRouter();
  const { user, criarCampanha, editarCampanha, abrirCampanha, loadingPage } =
    useAuth();

  const [formData, setFormData] = useState({
    configGeral: {
      nome: "",
      status: "ativa",
      max_fichas: "",
      max_players: "",
      visibilidade: "publico",
      permissaoFichas: "auto",
      permissaoConteudo: "jogadoresContent",
    },
    contents: [],
    jogadores: [],
    descricao: "",
    imagem: "",
    historia: "",
  });

  const [loadingSave, setLoadingSave] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSave(true);

    try {
      if (idCampanha) {
        await editarCampanha(idCampanha, formData);
        setSnackbar({
          open: true,
          message: "Campanha atualizada com sucesso!",
          severity: "success",
        });
        setShowSuccessDialog(true);
        setTimeout(() => {
          router.push("/campaigns/" + idCampanha);
        }, 2500);
      } else {
        const novaId = await criarCampanha(formData);
        setShowSuccessDialog(true);
        setTimeout(() => {
          router.push("/campaigns/" + novaId);
        }, 2500);
      }
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Erro ao salvar a campanha.",
        severity: "error",
      });
    } finally {
      setLoadingSave(false);
    }
  };

  useEffect(() => {
    if (!idCampanha) return;

    const fetchCampanha = async () => {
      try {
        const dados = await abrirCampanha(idCampanha);
        setFormData(dados);
      } catch (error) {
        console.error("Erro ao carregar campanha:", error);
      }
    };

    fetchCampanha();
  }, [idCampanha]);

  if (loadingPage || loadingSave) return <LoadingPage />;

  return (
    <section>
      {!showSuccessDialog && (
        <InfoCampaign
          idCampanha={idCampanha}
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
      />

      <Dialog open={showSuccessDialog} fullWidth maxWidth="xs">
        <DialogContent style={{ textAlign: "center", padding: "2rem" }}>
          <CheckCircle style={{ fontSize: 60, color: "#4caf50" }} />
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            {idCampanha
              ? "Campanha atualizada com sucesso!"
              : "Campanha criada com sucesso!"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Redirecionando...
          </Typography>
        </DialogContent>
      </Dialog>
    </section>
  );
}
