"use client";

import { Box, Typography, Card, IconButton, useMediaQuery } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAuth } from "@/app/contexts/AuthContext";

export default function CardContent({ conteudos, filter, onEdit, onDelete }) {

  const isMobile = useMediaQuery("(max-width:1100px)");
  const { user } = useAuth();

  return (
    <Box
      sx={{
        mt: 3,
        alignItems: "start",
        width: "100%",
        columnCount: isMobile ? 2 : 5,
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
                mb: 3,
                width: "100%",
              }}
            >
              <Box>
                {c.imagem && (
                  <Box>
                    <img
                      src={c.imagem}
                      alt={c.descricao}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Box>
                )}
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                  pt: 1,
                  pb: 2,
                  pr: 2,
                  pl: 2,
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    wordBreak: "break-word",
                    hyphens: "auto",
                    width: "100%",
                  }}
                  variant="subtitle1"
                  fontWeight="700"
                >
                  {c.nome.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    wordBreak: "break-word",
                    hyphens: "auto",
                    width: "100%",
                    mt: 0.5,
                  }}
                  variant="body1"
                  color="text.secondary"
                >
                  {c.descricao}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <Typography
                    sx={{
                      wordBreak: "break-word",
                      hyphens: "auto",
                      width: "auto",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid var(--color-1)",
                      lineHeight: "1",
                    }}
                    fontSize="10px"
                    fontWeight="100"
                    mt={1}
                  >
                    {c.tipo.toUpperCase() === "OUTROS"
                      ? c.outroTipo?.toUpperCase() + " - OUTRO"
                      : c.tipo?.toUpperCase()}
                  </Typography>
                </Box>

                <hr className="separation" />
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
              </Box>
            </Card>
          );
        })}
    </Box>
  );
}
