"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { TiStarburst } from "react-icons/ti";
import Link from "next/link";
import LikeButton from "../../Buttons/Favorite";
import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function ItemFicha({ data }) {
  const { user, toggleLikeFicha } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!user || !data?.id) return;

    const fetchLikeData = async () => {
      try {
        const result = await toggleLikeFicha("fichas", data.id, user, "buscar");
        setLiked(result.liked);
        setLikeCount(result.likes);
      } catch (error) {
        console.error("Erro ao carregar dados de curtidas:", error);
      }
    };

    fetchLikeData();
  }, [user, data?.id, toggleLikeFicha]); // Certifique-se de que a função toggleLikeFicha seja estável

  const handleLike = async () => {
    if (!user || !data?.id) return;

    try {
      const result = await toggleLikeFicha("fichas", data.id, user, "like");
      setLiked(result.liked);
      setLikeCount(result.likes);
    } catch (error) {
      console.error("Erro ao curtir ficha:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <Link href={`/ficha/${data.id}`}>
        <Card
          sx={{
            maxWidth: "500px",
            cursor: "pointer",
            minWidth: "500px",
            height: "300px",
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <CardContent
            sx={{
              width: "100%",
              height: "290px",
              display: "block",
              overflow: "hidden",
            }}
          >
            <Box>
              <Typography
                sx={{
                  hyphens: "auto",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "300",
                  gap: "5px",
                }}
                gutterBottom
                variant="p"
                component="div"
              >
                <AccountCircle />
                {data.usuario}
              </Typography>
              <hr className="separation" />
              <Typography
                sx={{
                  hyphens: "auto",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  maxHeight: "60px",
                  overflow: "hidden",
                  fontFamily: "abibas",
                }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {data.informacoes.nome_personagem}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16px",
                  color: "text.secondary",
                  hyphens: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  display: "block",
                  whiteSpace: "normal",
                }}
              >
                {data.caracteristicas.personalidade}
              </Typography>
            </Box>
          </CardContent>
          <Box
            sx={{
              position: "relative",
              minHeight: "100%",
              minWidth: "165px",
              background: "var(--color-1)",
            }}
          >
            <img
              src={
                data.imagem ||
                "https://cdn.creazilla.com/silhouettes/3473428/skeleton-silhouette-000000-md.png"
              }
              style={{ width: "165px" }}
            />
            {data.status.status_niv !== "" && (
              <Box
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      color: "var(--color-2)",
                    }}
                  >
                    {data.status.status_niv}
                  </span>
                  <TiStarburst style={{ fontSize: "35px" }} />
                </Box>
              </Box>
            )}
          </Box>
        </Card>
      </Link>
      {user && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {likeCount}
          <LikeButton isLiked={liked} onToggle={handleLike} />
        </Box>
      )}
    </Box>
  );
}
