"use client";

import { useEffect, useState } from "react";
import Character from "./ComponentsFicha/Character";
import {
  Snackbar,
  Dialog,
  DialogContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { CheckCircle, Palette, Save, Settings } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import LoadingPage from "../Loading";
import SettingsComponent from "../SettingsComponent";
import SpeedDialComponent from "../SpeedDialComponent";
import { useRouter } from "next/navigation";
import Customize from "./ComponentsFicha/Customize";

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
      tema: "",
      fungo: "",
      color: {
        color_box: "",
        color_input: "",
        color_box_title: "",
        color_fonte: "",
      },
    },
  });

  const [campaignData, setCampaignData] = useState({});
  const router = useRouter();
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openCustomize, setOpenCustomize] = useState(false);
  const [justSee, setJustSee] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState({
    open: false,
    title: "Carregando",
    message: "Salvando imagem  da ficha...",
    icon: <CircularProgress style={{ fontSize: 60, color: "#4caf50" }} />,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    user,
    salvarFicha,
    abrirFicha,
    abrirCampanha,
    loadingPage,
    editarFicha,
    editarFichaMestre,
  } = useAuth();

  const handleCloseSpeedDial = () => setOpenSpeedDial(false);

  const handleSpeedDialAction = async (name) => {
    if (name === "Configurações") {
      setOpenSettings(true);
    } else if (name === "Customização") {
      setOpenCustomize(true);
    } else if (name === "Save") {
      setLoadingSave(true);

      try {
        if (idFicha) {
          if (
            campaignData &&
            campaignData?.mestreId === user?.uid &&
            campaignData?.id === formData.config.belongs_input
          ) {
            await editarFichaMestre(idFicha, formData);
            setSnackbar({
              open: true,
              message: "Ficha editada com sucesso!",
              severity: "success",
            });
          } else {
            await editarFicha(idFicha, formData);
            setSnackbar({
              open: true,
              message: "Ficha editada com sucesso!",
              severity: "success",
            });
          }
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
            setShowSuccessDialog({
              open: true,
              icon: <CheckCircle style={{ fontSize: 60, color: "#4caf50" }} />,
              title: "Ficha criada com sucesso!",
              message: "Redirecionando...",
            });
            setTimeout(() => {
              setShowSuccessDialog({ open: false });
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
    if (!justSee) return;

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
      setFormData((prev) => ({
        ...prev,
        customize: {
          ...prev.customize,
          tema: "padrao",
          fungo: "0",
          color: {
            color_box: "#9C9C9C",
            color_box_title: "#4e4e4e",
            color_input: "#7c7c7c",
            color_fonte: "#ffffff",
          },
        },
      }));

      setJustSee(true);
      return;
    }

    const fetchFicha = async () => {
      try {
        const dadosFicha = await abrirFicha(idFicha);

        if (!dadosFicha) {
          console.error("Ficha não encontrada ou sem permissão.");
          setSnackbar({
            open: true,
            message:
              "Ficha não encontrada ou você não tem permissão para vê-la.",
            severity: "error",
          });
          return;
        }

        setFormData(dadosFicha);

        let permissaoEdicao = false;

        if (dadosFicha.config.belongs_input) {
          const dadosCampaign = await abrirCampanha(
            dadosFicha.config.belongs_input
          );

          setCampaignData(dadosCampaign);
          if (
            dadosFicha.config.campaigns_master === "editar" &&
            dadosFicha.config.belongs === "sim" &&
            dadosCampaign?.mestreId === user?.uid
          ) {
            permissaoEdicao = true;
          }
        }

        if (user && dadosFicha.uid === user.uid) {
          permissaoEdicao = true;
        }

        setJustSee(permissaoEdicao);
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

          <Customize
            formData={formData}
            setFormData={setFormData}
            openCustomize={openCustomize}
            handleModal={() => setOpenCustomize(false)}
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
        user={user}
        handleChange={handleChange}
        formData={formData}
        setFormData={setFormData}
      />

      {loadingSave && <LoadingPage />}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
      />

      <Dialog open={showSuccessDialog.open} fullWidth maxWidth="xs">
        <DialogContent style={{ textAlign: "center", padding: "2rem" }}>
          {showSuccessDialog.icon}
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            {showSuccessDialog.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {showSuccessDialog.message}
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
