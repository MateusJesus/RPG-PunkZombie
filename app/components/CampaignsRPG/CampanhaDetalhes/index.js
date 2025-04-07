"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function CampanhaDetalhes({ formData, isOwner, idCampaigns }) {
  const router = useRouter();

  return (
    <Card className="mb-6 shadow-md">
      <CardContent>
        <div className="flex justify-between items-start">
          <div>
            <Typography variant="h5">{formData.nome}</Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {formData.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Visibilidade: {formData.visibilidade}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mt-2">
              Descrição: {formData.descricao}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              História: {formData.historia}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Jogadores permitidos: {formData.permissaoFichas}
            </Typography>
          </div>

          {isOwner && (
            <Tooltip title="Configurações da campanha">
              <IconButton
                onClick={() => router.push(`/config-campaign/${idCampaigns}`)}
              >
                <Settings />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
