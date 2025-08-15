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
        gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
        gap: 2,
        mt: 3,
        alignItems: "start",
        width: "100%",
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
                height: "auto", 
                p: 2,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <Typography
                sx={{
                  wordBreak: "break-word",
                  hyphens: "auto",
                  width: "100%",
                }}
                variant="subtitle1"
                fontWeight="700"
                mt={1}
              >
                {c.nome.toUpperCase()}
              </Typography>
              <Box>
                {c.imagem && (
                  <Box
                    sx={{
                      height: 150,
                      background: "var(--color-1)",
                    }}
                  >
                    <img
                      src={c.imagem}
                      alt={c.tipo}
                      style={{
                        width: "200px",
                        height: 120,
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
              </Box>
              <Typography
                sx={{
                  wordBreak: "break-word",
                  hyphens: "auto",
                  marginTop: "5px",
                  width: "100%",
                }}
                fontWeight="100"
                variant="subtitle1"
                mt={1}
              >
                {c.tipo.toUpperCase()}
              </Typography>
              <Typography
                sx={{
                  wordBreak: "break-word",
                  hyphens: "auto",
                  width: "100%",
                  marginTop: "5px",
                }}
                variant="body2"
                color="text.secondary"
              >
                {c.descricao}
              </Typography>
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
