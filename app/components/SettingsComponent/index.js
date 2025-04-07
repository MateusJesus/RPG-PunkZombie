"use client";

import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";

const fields = [
  {
    id: "belongs",
    type: "",
    label: "Sua ficha pertence a uma campanha?",
    radio: [
      { id: "belongs_yes", label: "Sim", value: "sim" },
      { id: "belongs_no", label: "Não", value: "nao" },
    ],
  },
  {
    id: "view",
    type: "",
    label: "Quem pode visualizar sua ficha?",
    radio: [
      { id: "view_public", label: "Todos (Pública)", value: "publica" },
      { id: "view_private", label: "Privada", value: "privada" },
      {
        id: "view_link",
        label: "Privada com link (apenas quem tiver o link pode ver)",
        value: "privada_link",
      },
    ],
  },
  {
    id: "campaigns_players",
    type: "hidden",
    label: "Jogadores da campanha poderão ver sua ficha?",
    radio: [
      { id: "players_yes", label: "Sim", value: "sim" },
      { id: "players_no", label: "Não", value: "nao" },
    ],
  },
  {
    id: "campaigns_master",
    type: "hidden",
    label: "Mestre da campanha pode:",
    radio: [
      { id: "master_view", label: "Apenas ver a ficha", value: "ver" },
      { id: "master_edit", label: "Ver e editar a ficha", value: "editar" },
    ],
  },
];

export default function SettingsComponent({
  openSettings,
  handleModal,
  setFormData,
  formData,
}) {
  const [settings, setSettings] = useState({
    comfirm: false,
    belongs: formData.config.belongs || "nao",
    view: formData.config.view || "privada",
    campaigns_master: formData.config.campaigns_master || "editar",
    campaigns_players: formData.config.campaigns_players || "nao",
    belongs_input: formData.config.belongs_input || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    setFormData((prevData) => ({
      ...prevData,
      config: {
        comfirm: true,
        belongs: settings.belongs || "nao",
        view: settings.view || "privada",
        campaigns_master: settings.campaigns_master || "editar",
        campaigns_players: settings.campaigns_players || "nao",
        belongs_input:
          settings.belongs === "sim" ? settings.belongs_input || "" : "",
      },
    }));

    handleModal();
  };

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={openSettings}
      onClose={handleModal}
    >
      <Box sx={style}>
        <h1 className="title_content">Configurações da ficha</h1>
        <Box sx={{ m: 2, display: "flex", flexDirection: "column" }}>
          {fields.map((item) => {
            if (
              item.type === "" ||
              (item.type === "hidden" && settings.belongs === "sim")
            ) {
              return (
                <div key={item.id}>
                  <FormLabel>{item.label}</FormLabel>
                  <RadioGroup
                    aria-labelledby={`${item.id}-label`}
                    name={item.id}
                    value={
                      "campaigns_players" === item.id &&
                      settings.view === "publica"
                        ? "sim"
                        : settings[item.id]
                    }
                    onChange={handleChange}
                  >
                    {item.radio.map((radioItem) => (
                      <div key={radioItem.id}>
                        <FormControlLabel
                          disabled={
                            item.id === "campaigns_players" &&
                            settings.view === "publica"
                          }
                          value={radioItem.value}
                          control={<Radio />}
                          label={radioItem.label}
                        />
                        {settings.belongs === "sim" &&
                          radioItem.value === "sim" &&
                          item.id === "belongs" && (
                            <TextField
                              placeholder="Digite o id da campanha"
                              name="belongs_input"
                              variant="standard"
                              value={settings.belongs_input}
                              onChange={handleChange}
                            />
                          )}
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              );
            }
          })}
          <Button variant="contained" onClick={handleConfirm}>
            Confirmar configurações
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "90%",
  bgcolor: "var(--color-1)",
  border: "2px solid #000",
  boxShadow: 24,
};
