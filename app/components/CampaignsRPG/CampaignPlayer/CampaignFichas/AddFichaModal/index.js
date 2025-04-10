"use client";

import {
  Modal,
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function AddFichaModal({ open, handleClose, onEnviarFicha }) {
  const [fichasUsuario, setFichasUsuario] = useState([]);
  const [fichaSelecionada, setFichaSelecionada] = useState("");
  const { carregarMinhasFichas } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const fichas = await carregarMinhasFichas();
        setFichasUsuario(fichas.fichas);
        
      } catch (err) {
        console.error("Erro ao buscar fichas do usuário:", err.message);
      }
    };

    if (open) {
      fetchFichas();
    }
  }, [open, carregarMinhasFichas]);

  const handleEnviar = () => {
    if (fichaSelecionada) {
      onEnviarFicha(fichaSelecionada);
      handleClose();
      setFichaSelecionada("");
    }
  };

  const handleCriarNova = () => {
    handleClose();
    router.push("/ficha");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2} fontWeight="bold">
          Enviar ficha para a campanha
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Selecionar ficha</InputLabel>
          <Select
            value={fichaSelecionada}
            label="Selecionar ficha"
            onChange={(e) => setFichaSelecionada(e.target.value)}
          >
            {fichasUsuario.map((ficha) => (
              <MenuItem key={ficha.id} value={ficha.id}>
                {ficha.informacoes.nome_personagem || "(Sem nome)"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={handleCriarNova}>
            Criar nova
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEnviar}
            disabled={!fichaSelecionada}
          >
            Enviar ficha
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
