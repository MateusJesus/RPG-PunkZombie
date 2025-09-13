"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import LikeButton from "../../Buttons/Favorite";

export default function ItemCampaign({ data }) {
  const { user, toggleLikeCampanha } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchLikeData = async () => {
      const result = await toggleLikeCampanha(
        "campanhas",
        data.id,
        user,
        "buscar"
      );
      setLiked(result.liked);
      setLikeCount(result.likes);
    };

    fetchLikeData();
  }, [user]);

  const handleLike = async () => {
    if (!user) return;

    try {
      const result = await toggleLikeCampanha(
        "campanhas",
        data.id,
        user,
        "like"
      );
      setLiked(result.liked);
      setLikeCount(result.likes);
    } catch (error) {
      console.error("Erro ao curtir campanha:", error);
    }
  };

  console.log(data);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <Link href={`/campaigns/${data.id}`}>
        <Card
          sx={{
            maxWidth: "500px",
            cursor: "pointer",
            minWidth: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "block",
              overflow: "hidden",
              padding: "1em 1em 0em 1em",
              margin: "0",
            }}
          >
            <Typography
              sx={{
                hyphens: "auto",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                display: "flex",
                alignItems: "center",
                fontWeight: "300",
                margin: "0",
                gap: "5px",
              }}
              variant="body1"
              component="div"
            >
              <AccountCircle />
              {data.username}
            </Typography>

            {!data.imagem && <hr className="separation" />}
          </Box>

          {data.imagem && (
            <Box>
              <img
                style={{
                  width: "100%",
                }}
                src={data.imagem}
              />
            </Box>
          )}

          <CardContent
            sx={{
              maxWidth: "500px",
              cursor: "pointer",
              minWidth: "500px",
              height: "150px",
              margin: "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "10px",
              padding: "0em 1em 1em 1em",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "290px",
                display: "block",
                overflow: "hidden",
              }}
            >
              <Typography
                sx={{
                  hyphens: "auto",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  maxHeight: "60px",
                  fontFamily: "abibas",
                  overflow: "hidden",
                }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {data.configGeral.nome}
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
                {data.descricao}
              </Typography>
            </Box>

            <Typography
              sx={{
                margin: "0",
                fontSize: "14px",
                color: "text.secondary",
              }}
            >
              {data.jogadores.length}/{data.configGeral.max_players} jogadores
            </Typography>
          </CardContent>
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
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              userSelect: "none",
            }}
          ></Typography>
        </Box>
      )}
    </Box>
  );
}
