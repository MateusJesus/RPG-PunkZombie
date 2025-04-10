"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import EnterCampaign from "./EnterCampaign";
import CampanhaDetalhes from "./CampanhaDetalhes";
import JogadoresLista from "./CampaignPlayer/JogadoresLista";
import LoadingPage from "../Loading";
import AberturaCampanha from "./AberturaCampanha";
import { Box, Modal, Typography, CircularProgress } from "@mui/material";
import { Password } from "@mui/icons-material";
import CampaignPlayer from "./CampaignPlayer";

export default function CampaignsRPG({ idCampaigns }) {
  const { user, abrirCampanha, loadingPage } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [justView, setJustView] = useState(false);
  const [showAbertura, setShowAbertura] = useState(false);
  const [aberturaFinalizada, setAberturaFinalizada] = useState(false);

  useEffect(() => {
    if (!idCampaigns || !user) return;

    const fetchCampanha = async () => {
      try {
        const dados = await abrirCampanha(idCampaigns);
        setFormData(dados);
        const ehOwner = user.uid === dados.mestreId;
        const ehPlayer = dados.jogadores?.some((j) => j.uid === user.uid);
        setIsOwner(ehOwner);
        setIsPlayer(ehPlayer);
        setShowAbertura(true);
      } catch (error) {
        console.error("Erro ao carregar campanha:", error);
      }
    };

    fetchCampanha();
  }, [idCampaigns, user]);

  if (loadingPage || !formData) return <LoadingPage />;

  const aguardandoPermissao = formData.pedidosEntrada?.some(
    (pedido) => pedido.uid === user.uid
  );
  
  const jogando = formData.jogadores?.some(
    (jogador) => jogador.uid === user.uid
  );

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    minWidth: 320,
    textAlign: "center",
  };

  if ((isOwner || isPlayer) && showAbertura && !aberturaFinalizada && jogando) {
    return (
      <AberturaCampanha
        nome={formData.configGeral.nome}
        historia={formData.historia}
        onFim={() => setAberturaFinalizada(true)}
      />
    );
  }

  if (!aguardandoPermissao && !isOwner && !isPlayer && !justView) {
    return (
      <Modal open>
        <Box sx={modalStyle}>
          <EnterCampaign
            setJustView={setJustView}
            formData={formData}
            idCampaigns={idCampaigns}
          />
        </Box>
      </Modal>
    );
  }

  if (aguardandoPermissao && !isOwner && !isPlayer) {
    return (
      <Modal open>
        <Box sx={modalStyle}>
          <CircularProgress color="secondary" />
          <Typography variant="h6" mt={2}>
            Aguardando permissão do mestre...
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Assim que sua entrada for aprovada, você poderá visualizar e
            interagir com a campanha.
          </Typography>
        </Box>
      </Modal>
    );
  }

  return (
    <Box>
      {(isOwner || jogando || justView) && (
        <>
          <CampanhaDetalhes
            formData={formData}
            isOwner={isOwner}
            idCampaigns={idCampaigns}
          />

          <CampaignPlayer
            formData={formData}
            idCampaigns={idCampaigns}
            isOwner={isOwner}
          />
        </>
      )}
    </Box>
  );
}
