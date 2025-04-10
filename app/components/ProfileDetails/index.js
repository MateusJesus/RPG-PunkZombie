"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function ProfileDetails() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Typography>Você precisa estar logado para ver o perfil.</Typography>
    );
  }

  return (
    <CardContent sx={{ textAlign: "center" }}>
      <Avatar
        sx={{
          bgcolor: deepPurple[500],
          width: 80,
          height: 80,
          fontSize: 32,
          margin: "0 auto 16px",
        }}
      >
        {user.displayName ? user.displayName[0] : "?"}
      </Avatar>

      <Typography variant="h5" fontWeight={500}>
        {user.displayName || "Usuário sem nome"}
      </Typography>

      <Typography variant="body1" color="text.secondary">
        {user.email}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ textAlign: "left" }}>
        <Typography variant="subtitle2" color="text.secondary">
          ID do Usuário:
        </Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
          {user.uid}
        </Typography>

        {/* Se quiser adicionar mais dados personalizados futuramente */}
        {/* <Typography variant="subtitle2" color="text.secondary" mt={2}>
              Data de criação: 
            </Typography>
            <Typography variant="body2">01/04/2025</Typography> */}
      </Box>

      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 3 }}
        onClick={() => alert("Função de editar ainda não implementada.")}
      >
        Editar Perfil
      </Button>
    </CardContent>
  );
}
