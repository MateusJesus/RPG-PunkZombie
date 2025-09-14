"use client";
import React, { useState } from "react";
import { Box, Tab, Tabs, IconButton, useMediaQuery } from "@mui/material";
import { IoReloadOutline } from "react-icons/io5";
import JogadoresLista from "./JogadoresLista";
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
      {value === index && <Box sx={{ p: ".5em 0" }}>{children}</Box>}
    </div>
  );
}

export default function CampaignPlayer({
  idCampaigns,
  isOwner,
  formData,
  atualizarCampanha,
}) {
  const [value, setValue] = useState(0);

  const isMobile = useMediaQuery("(max-width:1100px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [];

  if (isOwner && formData.pedidosEntrada?.length > 0) {
    tabs.push({
      label: "Pedidos de Entrada",
      content: (
        <JogadoresLista
          atualizarCampanha={atualizarCampanha}
          idCampaigns={idCampaigns}
          pedidosEntrada={formData.pedidosEntrada}
          isOwner={isOwner}
        />
      ),
    });
  }

  tabs.push(
    {
      label: "Participantes",
      content: (
        <JogadoresLista
          onClick={atualizarCampanha}
          idCampaigns={idCampaigns}
          jogadores={formData.jogadores}
          formData={formData}
          isOwner={isOwner}
        />
      ),
    },
    {
      label: "Fichas",
      content: <CampaignFichas formData={formData} idCampaigns={idCampaigns} />,
    },
    {
      label: "História",
      content: <CampaignHistory idCampaign={idCampaigns} formData={formData} />,
    },
    {
      label: "Conteúdo",
      content: (
        <CampaignContent formData={formData} idCampaigns={idCampaigns} />
      ),
    }
  );

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="auto"
          textColor="inherit"
          variant={isMobile ? "scrollable" : "fullWidth"}
          indicatorColor="secondary"
          aria-label="Abas da campanha"
          sx={{
            flex: 1,
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: 16,
              minWidth: isMobile ? "auto" : 120,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>

        <IconButton onClick={atualizarCampanha} sx={{ ml: 1 }}>
          <IoReloadOutline />
        </IconButton>
      </Box>

      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </>
  );
}
