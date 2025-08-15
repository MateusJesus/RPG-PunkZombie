"use client";

import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddFichaModal from "./AddFichaModal";
import { useAuth } from "@/app/contexts/AuthContext";
import ListFicha from "@/app/components/ListFicha";
import SearchIcon from "@mui/icons-material/Search";

export default function CampaignFichas({ idCampaigns, formData }) {
  const [openModal, setOpenModal] = useState(false);
  const [fichas, setFichas] = useState([]);
  const [fichasFiltradas, setFichasFiltradas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [busca, setBusca] = useState("");

  const {
    adicionarFichaCampanha,
    getFichasCampanhaVisiveis,
    user,
    abrirCampanha,
  } = useAuth();

  useEffect(() => {
    fetchFichas();
  }, [idCampaigns]);

  const fetchFichas = async () => {
    try {
      setLoading(true);
      const fichasVisiveis = await getFichasCampanhaVisiveis(
        formData?.jogadores,
        user,
        formData?.mestreId
      );
      setFichasFiltradas(fichasVisiveis);
    } catch (error) {
      console.error("Erro ao buscar fichas:", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveFicha = async (data) => {
    try {
      setLoading(true);
      await adicionarFichaCampanha(idCampaigns, data);

      const campanhaAtualizada = await abrirCampanha(idCampaigns);

      const fichasVisiveis = await getFichasCampanhaVisiveis(
        campanhaAtualizada.jogadores,
        user,
        campanhaAtualizada.mestreId
      );

      setFichasFiltradas(fichasVisiveis);

      setSuccessOpen(true);
      setOpenModal(false);
    } catch (err) {
      console.error("Erro ao salvar ficha:", err.message);
      setErrorMsg(err.message || "Erro ao salvar ficha.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuscaChange = (e) => {
    const termo = e.target.value.toLowerCase();
    setBusca(termo);
    const resultados = fichasFiltradas.filter((ficha) =>
      ficha.nome?.toLowerCase().includes(termo)
    );
    setFichasFiltradas(resultados);
  };

  return (
    <>
      <AddFichaModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        onEnviarFicha={handleSaveFicha}
      />
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert severity="success">Ficha enviada com sucesso!</Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMsg}
        autoHideDuration={4000}
        onClose={() => setErrorMsg("")}
      >
        <Alert severity="error">{errorMsg}</Alert>
      </Snackbar>

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
          Fichas da campanha
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={500}>
          Aqui estão as fichas dos jogadores vinculadas a esta campanha. Você
          pode visualizar, editar ou remover as fichas conforme sua permissão.
        </Typography>
        <hr className="separation" />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 2,
            mt: 1,
            width: "100%",
          }}
        >
          <TextField
            label="Buscar ficha"
            variant="outlined"
            color="secondary"
            size="small"
            value={busca}
            onChange={handleBuscaChange}
            sx={{ minWidth: "250px", maxWidth: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {(formData?.mestreId === user.uid ||
            formData?.jogadores?.find((j) => j.uid === user.uid)?.fichas
              ?.length < Number(formData?.configGeral?.max_fichas)) && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(true)}
              sx={{ height: "40px" }}
            >
              Enviar ficha
            </Button>
          )}
        </Box>

        <hr className="separation" />
      </Box>

      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <ListFicha datas={fichasFiltradas} />
      )}
    </>
  );
}
