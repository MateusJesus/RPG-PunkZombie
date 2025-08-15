"use client";

import { useState, useEffect } from "react";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useAuth } from "@/app/contexts/AuthContext";

export default function CampaignHistory({ formData, idCampaign }) {
  const { alterarViewOpening, user } = useAuth();
  const [viewOpening, setViewOpening] = useState(true);

  const jogador = formData.jogadores.find((j) => j.uid === user.uid);

  useEffect(() => {
    if (formData?.jogadores && user?.uid) {
      const jogador = formData.jogadores.find((j) => j.uid === user.uid);

      if (jogador) {
        if (jogador.viewOpening === undefined) {
          setViewOpening(true);
          alterarViewOpening(idCampaign, user.uid, true);
        } else {
          setViewOpening(jogador.viewOpening);
        }
      }
    }
  }, [formData, user]);

  const handleToggleOpening = async (e) => {
    const novoValor = e.target.checked;
    setViewOpening(novoValor);
    await alterarViewOpening(idCampaign, user.uid, novoValor);
  };

  const { historia, observacoes } = formData;

  return (
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
        fontWeight="bold"
        textTransform="uppercase"
        color="text.secondary"
      >
        História da campanha
      </Typography>

      <Typography variant="body1" color="text.secondary" maxWidth={500}>
        Aqui é onde o mestre pode escrever a história da campanha, detalhes do
        mundo e tudo que ajuda os jogadores a se situarem.
      </Typography>
      <hr className="separation" />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%",
        }}
      >
        {" "}
        <Typography variant="body1" color="text.secondary">
          Sempre mostrar abertura
        </Typography>
        <Switch
          color="secondary"
          checked={viewOpening}
          onChange={handleToggleOpening}
          name="viewOpening"
        />
      </Box>

      <hr className="separation" />

      {historia || observacoes ? (
        <Box sx={{ textAlign: "center" }}>
          {historia && (
            <>
              <Typography
                variant="h5"
                fontWeight="bold"
                textTransform="uppercase"
                color="text.secondary"
              >
                História
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {historia}
              </Typography>
            </>
          )}

          {observacoes && (
            <>
              <hr className="separation" />
              <Typography
                variant="h5"
                fontWeight="bold"
                textTransform="uppercase"
                color="text.secondary"
              >
                Observações
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {observacoes}
              </Typography>
            </>
          )}

          <hr className="separation" />
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Nada escrito no momento...
        </Typography>
      )}
    </Box>
  );
}
