"use client";

import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/contexts/AuthContext";
import { CheckCircle } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const fields = [
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
    id: "delete",
    type: "",
    label: "Deseja deletar sua ficha?",
    button: { id: "deleteButton", label: "Deletar ficha" },
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
  setShowSuccessDialog,
  handleModal,
  setFormData,
  formData,
}) {
  const router = useRouter();
  const [settings, setSettings] = useState({
    comfirm: false,
    belongs: formData.config.belongs || "nao",
    view: formData.config.view || "privada",
    campaigns_master: formData.config.campaigns_master || "editar",
    campaigns_players: formData.config.campaigns_players || "nao",
    belongs_input: formData.config.belongs_input || "",
  });

  const { abrirCampanha, desvincularFichaDaCampanha, deletarFicha } = useAuth();

  const [campanha, setCampanha] = useState(null);

  useEffect(() => {
    const fetchCampanha = async () => {
      try {
        if (formData.config.belongs !== "sim" || !formData.config.belongs_input)
          return;

        const dados = await abrirCampanha(formData.config.belongs_input);
        setCampanha(dados);
      } catch (error) {
        console.error("Erro ao carregar campanha:", error);
      }
    };

    fetchCampanha();
  }, [formData.config.belongs, formData.config.belongs_input]);

  const handleUnlink = async () => {
    try {
      await desvincularFichaDaCampanha(
        formData.id,
        formData.config.belongs_input
      );

      setSettings((prev) => ({
        ...prev,
        belongs: "nao",
        belongs_input: "",
      }));

      setFormData((prevData) => ({
        ...prevData,
        config: {
          ...prevData.config,
          belongs: "nao",
          belongs_input: "",
        },
      }));

      setCampanha(null);
    } catch (error) {
      console.error("Erro ao desvincular:", error);
    }
  };

  const handleDelete = async () => {
    try {
      setFormData((prevData) => ({
        ...prevData,
        imagem: "delete",
      }));

      const deleteFicha = await deletarFicha(formData);

      if (deleteFicha) {
        setShowSuccessDialog({
          open: true,
          icon: <CheckCircle style={{ fontSize: 60, color: "#4caf50" }} />,
          title: "Ficha deletada com sucesso!",
          message: "Redirecionando para o inicio...",
        });
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao deletar ficha:", error);
    }
  };

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
                  <FormLabel>
                    {!formData.id && item.button ? "" : item.label}
                  </FormLabel>

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
                    {item.button && formData.id && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                        sx={{ mb: 1.5 }}
                      >
                        {item.button.label}
                      </Button>
                    )}

                    {item.radio &&
                      item.radio.map((radioItem) => {
                        const isViewPrivateDisabled =
                          item.id === "view" &&
                          radioItem.value === "privada" &&
                          settings.belongs === "sim";

                        const isPlayersDisabled =
                          item.id === "campaigns_players" &&
                          settings.view === "publica";

                        return (
                          <div key={radioItem.id}>
                            <FormControlLabel
                              disabled={
                                isViewPrivateDisabled || isPlayersDisabled
                              }
                              value={radioItem.value}
                              control={<Radio />}
                              label={radioItem.label}
                            />
                          </div>
                        );
                      })}
                  </RadioGroup>
                </div>
              );
            }
          })}

          <hr className="separation" />

          {settings.belongs === "sim" && (
            <Box sx={{ mt: 1, mb: 2 }}>
              <Typography variant="body1">
                Esta ficha está vinculada à campanha:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.5em",
                    color: "var(--color-accent)",
                    fontFamily: "abibas",
                  }}
                >
                  {campanha?.configGeral?.nome || "Carregando..."}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={handleUnlink}
                >
                  Desvincular da campanha
                </Button>
              </Box>
            </Box>
          )}

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
  boxShadow: 24,
};
