"use client";
import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function JogadoresLista({
  pedidosEntrada,
  formData,
  jogadores,
  isOwner,
  idCampaigns,
  atualizarCampanha,
}) {

  const { gerenciarPedidoEntrada, sairDaCampanha, user } = useAuth();
  const router = useRouter();

  const handleSair = async () => {
    try {
      await sairDaCampanha(idCampaigns, user.uid);
      router.push("/");
    } catch (err) {
      console.error("Erro ao sair da campanha:", err);
    }
  };

  const handleAcao = async (jogadorObj, acao) => {
    try {
      await gerenciarPedidoEntrada(idCampaigns, jogadorObj, acao);
      atualizarCampanha();
    } catch (err) {
      console.error("Erro ao processar pedido:", err);
    }
  };

  const jogadoresList = jogadores ?? pedidosEntrada ?? [];

  const mestre = jogadoresList.find((j) => j.uid === formData?.mestreId);

  const outrosJogadores = jogadoresList.filter(
    (j) => j.uid !== formData?.mestreId
  );

  return (
    <>
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
          fontWeight={"bold"}
          textTransform={"uppercase"}
          color="text.secondary"
        >
          Lista de {pedidosEntrada ? "Pedidos" : "Jogadores"}
        </Typography>
        <Typography variant="body1" color="text.secondary" width={500}>
          {pedidosEntrada
            ? "Aqui estão os jogadores que solicitaram entrada na campanha. Você pode aceitar ou recusar seus pedidos."
            : "Aqui estão os jogadores que participam da campanha. Você pode expulsar jogadores se necessário."}
        </Typography>
        <hr className="separation" />
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usuário</TableCell>
            <TableCell>Participantes</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Exibir Mestre */}
          {mestre && (
            <TableRow key={mestre.uid}>
              <TableCell>{mestre.username} (Mestre)</TableCell>
              <TableCell>Mestre</TableCell>
              <TableCell />
            </TableRow>
          )}

          {/* Exibir jogadores ou pedidos */}
          {outrosJogadores.map((jogadorId) => (
            <TableRow key={jogadorId.uid}>
              <TableCell>
                {jogadorId.username}
                {jogadorId.uid === user.uid && " (Você)"}
              </TableCell>
              <TableCell>Participando</TableCell>
              {isOwner ? (
                pedidosEntrada ? (
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      onClick={() => handleAcao(jogadorId, "aceitar")}
                    >
                      Aceitar
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleAcao(jogadorId, "recusar")}
                    >
                      Recusar
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleAcao(jogadorId, "remover")}
                    >
                      Expulsar
                    </Button>
                  </TableCell>
                )
              ) : jogadorId.uid === user.uid ? (
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    color="warning"
                    onClick={handleSair}
                  >
                    Sair
                  </Button>
                </TableCell>
              ) : (
                <TableCell></TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
