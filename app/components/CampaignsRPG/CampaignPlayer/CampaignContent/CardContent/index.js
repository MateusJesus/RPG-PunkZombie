"use client";

import { Box, Typography, Card, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAuth } from "@/app/contexts/AuthContext";

export default function CardContent({ conteudos, filter, onEdit, onDelete }) {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 2,
        mt: 3,
      }}
    >
      {conteudos
        .filter((c) => filter === "todos" || c.tipo === filter)
        .map((c, index) => {
          const ehAutor = user?.uid === c.uid || user?.uid === c.addPor;

          return (
            <Card
              key={index}
              sx={{
                width: "100%",
                height: "100%",
                p: 2,
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "column",
                bottom: 0,
              }}
            >
              <Box>
                {" "}
                <Typography
                  sx={{
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }}
                  variant="subtitle1"
                  fontWeight="bold"
                  mt={1}
                >
                  {c.nome.toUpperCase()}
                </Typography>
                <Box
                  sx={{
                    height: 150,
                    background: "var(--color-1)",
                  }}
                >
                  {c.imagem && (
                    <img
                      src={c.imagem}
                      alt={c.tipo}
                      style={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  )}
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                  {c.tipo.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {c.descricao}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  bottom: 0,
                }}
              >
                <Typography variant="caption" color="text.disabled">
                  {c.username}
                </Typography>

                {ehAutor && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <IconButton size="small" onClick={() => onEdit(c)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => onDelete(c)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Card>
          );
        })}
    </Box>
  );
}
