"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function AddContentModal({ open, handleClose, onSave }) {
  const [content, setContent] = useState({
    nome: "",
    tipo: "",
    outroTipo: "",
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContent((prev) => ({ ...prev, imagem: file }));
    }
  };

  const handleSubmit = () => {
    if (onSave) onSave(content);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <h1 className="title_content">Adicionar conteúdo</h1>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          required
          label="Nome do conteúdo"
          name="nome"
          value={content.nome}
          onChange={handleChange}
          inputProps={{ maxLength: 60 }}
        />
        
        <TextField
          required
          multiline
          rows={4}
          label="Descrição do conteúdo"
          name="descricao"
          value={content.descricao}
          onChange={handleChange}
          inputProps={{ maxLength: 60 }}
        />

        <TextField
          select
          label="Tipo de conteúdo"
          name="tipo"
          value={content.tipo}
          onChange={handleChange}
        >
          <MenuItem value="inimigo">Inimigo</MenuItem>
          <MenuItem value="neutro">Neutro</MenuItem>
          <MenuItem value="aliado">Aliado</MenuItem>
          <MenuItem value="item">Item</MenuItem>
          <MenuItem value="mapa">Mapa</MenuItem>
          <MenuItem value="outros">Outros</MenuItem>
        </TextField>

        {content.tipo === "outros" && (
          <TextField
            label="Descreva o tipo"
            name="outroTipo"
            value={content.outroTipo}
            onChange={handleChange}
            inputProps={{ maxLength: 30 }}
          />
        )}

        <Box>
          <Typography variant="body2" mb={0.5}>
            Imagem (opcional)
          </Typography>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {content.imagem && (
            <Typography variant="caption" color="text.secondary">
              Arquivo selecionado: {content.imagem.name}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleSubmit}>
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
