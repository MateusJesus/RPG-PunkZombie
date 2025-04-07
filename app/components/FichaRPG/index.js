"use client";

import { useEffect, useState } from "react";
import Character from "./Character";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Snackbar,
  CircularProgress,
  Backdrop,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { CheckCircle, Palette, Save, Settings } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import LoadingPage from "../Loading";
import SettingsComponent from "../SettingsComponent";
import SpeedDialComponent from "../SpeedDialComponent";
import { useRouter } from "next/navigation";

export default function FichaRPG({ idFicha }) {
  const [formData, setFormData] = useState({
    carga: "",
    imagem: null,
    informacoes: {
      nome_jogador: "",
      nome_personagem: "",
      variante: "",
      origem: "",
      classe: "",
      resistencia: "",
    },
    status: {
      status_niv: "",
      status_sta: "",
      status_statot: "",
      status_pdi: "",
      status_pditot: "",
      status_pdv: "",
      status_pdvtot: "",
    },
    caracteristicas: {
      aparencia: "",
      personalidade: "",
    },
    atributos: {
      atri_for: "",
      atri_int: "",
      atri_agi: "",
      atri_vig: "",
      atri_car: "",
    },
    pericias: [],
    equipamentos: [],
    vestimentas: [],
    armas: [],
    proficiencia: [],
    defesa: {
      defesatot: 10,
    },
    camp1_camp2: {
      titleCamp1: "",
      textCamp1: "",
      titleCamp2: "",
      textCamp2: "",
    },
    camp3: [],
    camp4: [],
    config: {
      comfirm: false,
      belongs: "",
      view: "",
      campaigns_master: "",
      campaigns_players: "",
      belongs_input: "",
    },
    customize: {
      tema: null,
      cor: null,
    },
  });

  const router = useRouter();
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [justSee, setJustSee] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { user, salvarFicha, abrirFicha, loadingPage, editarFicha } = useAuth();

  const handleCloseSpeedDial = () => setOpenSpeedDial(false);

  const handleSpeedDialAction = async (name) => {
    if (name === "Configurações") {
      setOpenSettings(true);
    } else if (name === "Save") {
      setLoadingSave(true);

      try {
        if (idFicha) {
          await editarFicha(idFicha, formData);
          setSnackbar({
            open: true,
            message: "Ficha editada com sucesso!",
            severity: "success",
          });
        } else {
          if (formData.config.belongs === "") {
            setOpenSettings(true);
            setSnackbar({
              open: true,
              message: "Preencha as configurações antes de salvar.",
              severity: "warning",
            });
          } else {
            const idFichaSalva = await salvarFicha(formData);
            setShowSuccessDialog(true);
            setTimeout(() => {
              setShowSuccessDialog(false);
              router.push("/ficha/" + idFichaSalva);
            }, 2500);
          }
        }
      } catch (error) {
        console.error(error);
        setSnackbar({
          open: true,
          message: "Erro ao salvar a ficha!",
          severity: "error",
        });
      } finally {
        setLoadingSave(false);
      }
    }
    handleCloseSpeedDial();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const keys = name.split(".");
      let updatedData = { ...prevData };
      let temp = updatedData;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]] = { ...temp[keys[i]] };
      }
      temp[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };

  useEffect(() => {
    if (!idFicha) {
      setJustSee(true);
      return;
    }

    const fetchFicha = async () => {
      try {
        const dados = await abrirFicha(idFicha);

        if (!dados) {
          console.error("Ficha não encontrada ou sem permissão.");
          setSnackbar({
            open: true,
            message:
              "Ficha não encontrada ou você não tem permissão para vê-la.",
            severity: "error",
          });
          return;
        }

        setFormData(dados);

        if (user && dados.uid === user.uid) {
          setJustSee(true);
        } else if (dados.config.view === "privada_link") {
          setJustSee(true); 
        }
      } catch (error) {
        console.error("Erro ao carregar ficha:", error);
        setSnackbar({
          open: true,
          message: "Erro ao carregar ficha!",
          severity: "error",
        });
      }
    };

    fetchFicha();
  }, [idFicha, user]);
  if (loadingPage) return <LoadingPage />;

  return (
    <div>
      <form>
        {!justSee ? (
          ""
        ) : (
          <>
            <SettingsComponent
              formData={formData}
              setFormData={setFormData}
              openSettings={openSettings}
              handleModal={() => setOpenSettings(false)}
            />
            <SpeedDialComponent
              SpeedDialActions={SpeedDialActions}
              openSpeedDial={openSpeedDial}
              setOpenSpeedDial={setOpenSpeedDial}
              handleSpeedDialAction={handleSpeedDialAction}
            />
          </>
        )}
        <Character
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
      </form>

      {loadingSave && <LoadingPage />}

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
            Ficha criada com sucesso!
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Redirecionando...
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const SpeedDialActions = [
  { icon: <Save />, name: "Save" },
  { icon: <Settings />, name: "Configurações" },
  { icon: <Palette />, name: "Customização" },
];
