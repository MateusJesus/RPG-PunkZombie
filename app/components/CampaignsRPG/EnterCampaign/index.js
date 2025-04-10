"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useAuth } from "@/app/contexts/AuthContext";

export default function EnterCampaign({ formData, idCampaigns, setJustView }) {
  const { user, adicionarJogador } = useAuth();
  //const [codigo, setCodigo] = useState(formData.uid);
  const [senha, setSenha] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleEntrar = async () => {
    if (!idCampaigns) {
      setSnackbar({
        open: true,
        message: "Insira o código da campanha.",
        severity: "warning",
      });
      return;
    }

    try {
      const resultado = await adicionarJogador(
        idCampaigns.trim(),
        senha.trim(),
        user
      );

      if (resultado.tipo === "entrada-direta") {
        setSnackbar({
          open: true,
          message: "Você entrou na campanha com sucesso!",
          severity: "success",
        });
        window.location.reload();
      } else if (resultado.tipo === "pedido-enviado") {
        setSnackbar({
          open: true,
          message: "Pedido de entrada enviado ao mestre.",
          severity: "info",
        });
        window.location.reload();
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        elevation={4}
        sx={{
          borderRadius: 4,
          backgroundColor: "transparent",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          Entrar na Campanha
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} mt={3}>
          {/* <TextField
            label="Código da Campanha"
            variant="outlined"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            fullWidth
            sx={{ borderRadius: 2 }}
          /> */}
          {!(formData.senha_acesso === "") && (
            <TextField
              label="Senha"
              color="secondary"
              variant="outlined"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              fullWidth
              sx={{ borderRadius: 2 }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleEntrar}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: 3,
              textTransform: "none",
              backgroundColor: "var(--green)",
              "&:hover": {
                backgroundColor: "var(--green-hover)",
              },
            }}
          >
            Participar da campanha
          </Button>
          <hr className="separation" />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setJustView(true)}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Ver campanha
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
