"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import EnterCampaign from "./EnterCampaign";
import CampanhaDetalhes from "./CampanhaDetalhes";
import JogadoresLista from "./JogadoresLista";
import LoadingPage from "../Loading";
import AberturaCampanha from "./AberturaCampanha";
import { Box, Modal, Typography, CircularProgress } from "@mui/material";

export default function CampaignsRPG({ idCampaigns }) {
  const { user, abrirCampanha, loadingPage } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [showAbertura, setShowAbertura] = useState(false);
  const [aberturaFinalizada, setAberturaFinalizada] = useState(false);

  // Busca a campanha e verifica o papel do usuário
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
        //setAberturaFinalizada(true);
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

  // Estilo padrão para os modais
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

  if (showAbertura && !aberturaFinalizada && jogando) {
    return (
      <AberturaCampanha
        nome={formData.nome}
        historia={formData.historia}
        onFim={() => setAberturaFinalizada(true)}
      />
    );
  }
  

  return (
    <Box p={3}>
      {/* Detalhes da campanha */}
      <CampanhaDetalhes
        formData={formData}
        isOwner={isOwner}
        idCampaigns={idCampaigns}
      />

      {/* Modal: aguardando permissão */}
      <Modal open={aguardandoPermissao}>
        <Box sx={modalStyle}>
          <CircularProgress />
          <Typography variant="h6" mt={2}>
            Aguardando permissão do mestre...
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Assim que sua entrada for aprovada, você poderá visualizar e
            interagir com a campanha.
          </Typography>
        </Box>
      </Modal>

      {/* Modal: entrar na campanha */}
      {!aguardandoPermissao && !isOwner && !isPlayer && (
        <Modal open>
          <Box sx={modalStyle}>
            <EnterCampaign />
          </Box>
        </Modal>
      )}

      {/* Lista de jogadores */}
      {(isOwner || isPlayer) && (
        <JogadoresLista
          idCampaigns={idCampaigns}
          jogadores={formData.jogadores}
          isOwner={isOwner}
        />
      )}

      {/* Lista de pedidos de entrada (somente para o mestre) */}
      {isOwner && formData.pedidosEntrada?.length > 0 && (
        <JogadoresLista
          idCampaigns={idCampaigns}
          pedidosEntrada={formData.pedidosEntrada}
          isOwner={isOwner}
        />
      )}
    </Box>
  );
}
