"use client";

import { useEffect, useState } from "react";
import Character from "./Character";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { Palette, Save, Settings } from "@mui/icons-material";
import SettingsFicha from "../SettingsFicha";
import { useAuth } from "../../contexts/AuthContext";
import LoadingPage from "../Loading";

const actions = [
  { icon: <Save />, name: "Save" },
  { icon: <Settings />, name: "Configurações" },
  { icon: <Palette />, name: "Customização" },
];

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
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [justSee, setJustSee] = useState(false);
  const { user, salvarFicha, abrirFicha, loadingPage, editarFicha } = useAuth();

  const handleCloseSpeedDial = () => setOpenSpeedDial(false);

  const handleSpeedDialAction = (name) => {
    if (name === "Configurações") {
      setOpenSettings(true);
    } else if (name === "Save") {
      idFicha
        ? editarFicha(idFicha, formData)
        : formData.config.comfirm
        ? salvarFicha(formData)
        : setOpenSettings(true);
    }
    handleCloseSpeedDial;
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
    if (!idFicha) setJustSee(true);

    if (!idFicha) return;

    const fetchFicha = async () => {
      const dados = await abrirFicha(idFicha);
      setFormData(dados);
      if (user) {
        if (dados.uid === user.uid) setJustSee(true);
      } else {
        alert("usuario não logado")
        setJustSee(false);
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
            <SettingsFicha
              formData={formData}
              setFormData={setFormData}
              openSettings={openSettings}
              handleModal={() => setOpenSettings(false)}
            />
            <SpeedDial
              ariaLabel="SpeedDial controlled openSpeedDial example"
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                "& .MuiFab-primary": {
                  bgcolor: "secondary.main",
                  color: "dark",
                  "&:hover": { bgcolor: "secondary.dark" },
                },
              }}
              icon={<SpeedDialIcon />}
              onClick={() => setOpenSpeedDial((prev) => !prev)}
              open={openSpeedDial}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  name={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleSpeedDialAction(action.name)}
                  sx={{
                    bgcolor: "secondary.main",
                    "&:hover": {
                      bgcolor: "secondary.dark",
                      transform: "scale(1.1)",
                    },
                  }}
                />
              ))}
            </SpeedDial>
          </>
        )}
        <Character
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
      </form>
    </div>
  );
}
