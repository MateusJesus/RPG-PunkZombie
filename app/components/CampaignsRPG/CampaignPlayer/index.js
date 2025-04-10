"use client";
import React, { useState } from "react";
import JogadoresLista from "./JogadoresLista";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CampaignContent from "./CampaignContent";
import CampaignHistory from "./CampaignHistory";
import CampaignFichas from "./CampaignFichas";

function a11yProps(index) {
  return {
    id: `custom-tab-${index}`,
    "aria-controls": `custom-tabpanel-${index}`,
  };
}

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: ".5em 0" }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function CampaignPlayer({ idCampaigns, isOwner, formData }) {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [];
  if (isOwner) tabs.push({ label: "Pedidos de Entrada" });
  tabs.push({ label: "Participantes" });
  tabs.push({ label: "Fichas" });
  tabs.push({ label: "História" });
  tabs.push({ label: "Conteúdo" });

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="auto"
          textColor="inherit"
          variant="fullWidth"
          indicatorColor="secondary"
          aria-label="Abas da campanha"
          sx={{
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: 16,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => {
        if (tab.label === "Pedidos de Entrada") {
          return (
            <CustomTabPanel key={index} value={value} index={index}>
              {formData.pedidosEntrada?.length > 0 ? (
                <JogadoresLista
                  idCampaigns={idCampaigns}
                  pedidosEntrada={formData.pedidosEntrada}
                  isOwner={isOwner}
                />
              ) : (
                <Typography color="text.secondary">
                  Nenhum pedido de entrada no momento.
                </Typography>
              )}
            </CustomTabPanel>
          );
        }

        if (tab.label === "Participantes") {
          return (
            <CustomTabPanel key={index} value={value} index={index}>
              {formData.jogadores?.length > 0 ? (
                <JogadoresLista
                  idCampaigns={idCampaigns}
                  jogadores={formData.jogadores}
                  formData={formData}
                  isOwner={isOwner}
                />
              ) : (
                <Typography color="text.secondary">
                  Nenhum jogador na campanha.
                </Typography>
              )}
            </CustomTabPanel>
          );
        }

        if (tab.label === "Fichas") {
          return (
            <CustomTabPanel key={index} value={value} index={index}>
              <CampaignFichas formData={formData} idCampaigns={idCampaigns} />
            </CustomTabPanel>
          );
        }

        if (tab.label === "História") {
          return (
            <CustomTabPanel key={index} value={value} index={index}>
              <CampaignHistory formData={formData} />
            </CustomTabPanel>
          );
        }

        if (tab.label === "Conteúdo") {
          return (
            <CustomTabPanel key={index} value={value} index={index}>
              <CampaignContent formData={formData} idCampaigns={idCampaigns} />
            </CustomTabPanel>
          );
        }
      })}
    </>
  );
}
