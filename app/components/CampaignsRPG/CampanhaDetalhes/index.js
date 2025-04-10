"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function CampanhaDetalhes({ formData, isOwner, idCampaigns }) {
  const router = useRouter();

  return (
    <Card>
      <h1 className="title_content">Campanha</h1>
      <CardContent>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontFamily: "Abibas" }}
        >
          {formData.configGeral.nome}
        </Typography>
        <Typography
          sx={{ textAlign: "center", mb: "30px" }}
          variant="body2"
          color="text.secondary"
        >
          {formData.descricao}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <Box>
            {isOwner && (
              <Typography variant="body2" color="text.secondary">
                Visibilidade: {formData.configGeral.visibilidade}
              </Typography>
            )}

            {isOwner && (
              <Typography variant="body2" color="text.secondary">
                Jogadores permitidos: {formData.configGeral.permissaoFichas}
              </Typography>
            )}
          </Box>
          {isOwner && (
            <Tooltip title="Configurações da campanha">
              <IconButton
                onClick={() => router.push(`/config-campaign/${idCampaigns}`)}
              >
                <Settings />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            Jogadores:{" "}
            {
              formData.jogadores.filter((j) => j.uid !== formData.mestreId)
                .length
            }
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Typography variant="body2" color="text.secondary">
              Status:
            </Typography>
            <Chip
              size="small"
              label={formData.configGeral.status}
              variant="outlined"
              color={
                formData.configGeral.status === "pausada"
                  ? "warning"
                  : formData.configGeral.status === "ativa"
                  ? "success"
                  : "error"
              }
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
