"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import { AccountCircle, Favorite, FavoriteBorder } from "@mui/icons-material";
import { TiStarburst } from "react-icons/ti";
import Link from "next/link";

export default function ItemFicha({ data }) {
  return (
    <Link href={`/ficha/${data.id}`}>
      <Card
        sx={{
          //minWidth: "100%",
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
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              zIndex: "4",
            }}
          >
            <span style={{ fontWeight: "200" }}>99</span>
            <IconButton aria-label="add to favorites">
              <FavoriteBorder />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
            }}
          >
            <Box
              sx={{
                //position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  color: "var(--color-2)"
                }}
              >
                {data.status.status_niv}
              </span>
              <TiStarburst style={{ fontSize: "35px" }} />
            </Box>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}
