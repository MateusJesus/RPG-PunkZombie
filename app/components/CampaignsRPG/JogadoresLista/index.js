"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useAuth } from "@/app/contexts/AuthContext";

export default function JogadoresLista({
  pedidosEntrada,
  jogadores,
  isOwner,
  idCampaigns,
}) {
  const { gerenciarPedidoEntrada, user } = useAuth();

  const handleAcao = async (jogadorObj, acao) => {
    try {
      await gerenciarPedidoEntrada(idCampaigns, jogadorObj, acao);
      window.location.reload();
    } catch (err) {
      console.error("Erro ao processar pedido:", err);
    }
  };

  return (
    <Card className="shadow-md">
      <CardContent>
        <Typography variant="h6" className="mb-4">
          {jogadores ? "Jogadores da campanha" : "Pedidos de entrada"}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome de Usuário</TableCell>
              {isOwner && <TableCell>ID do usuário</TableCell>}
              <TableCell>Status</TableCell>
              {isOwner && <TableCell>Ações</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {(jogadores ? jogadores : pedidosEntrada)?.map((jogadorId) => (
              <TableRow key={jogadorId.uid}>
                <TableCell>
                  {jogadorId.nome} {jogadorId.uid === user.uid && "(Você)"}
                </TableCell>
                {isOwner && <TableCell>{jogadorId.uid}</TableCell>}
                <TableCell>Participando</TableCell>
                {isOwner ? (
                  pedidosEntrada ? (
                    <TableCell>
                      <Button
                        size="small"
                        color="success"
                        onClick={() => handleAcao(jogadorId, "aceitar")}
                      >
                        Aceitar
                      </Button>
                      <Button
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
                        size="small"
                        color="error"
                        onClick={() => handleAcao(jogadorId, "remover")}
                      >
                        Expulsar
                      </Button>
                    </TableCell>
                  )
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
