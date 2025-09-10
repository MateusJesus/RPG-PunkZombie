"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function AddContentModal({
  open,
  handleClose,
  onSave,
  content,
  setContent,
  conteudoEditando,
  setImageContent,
}) {
  const { setImageFicha } = useAuth();

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
      setImageFicha(file);
      setContent((prev) => ({
        ...prev,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = () => {
    if (onSave) onSave(content);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth>
      <h1 className="title_content">
        {conteudoEditando ? "Editar" : "Adicionar"} conteúdo
      </h1>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          required
          label="Nome do conteúdo"
          name="nome"
          defaultValue={content.nome}
          onBlur={handleChange}
          inputProps={{ maxLength: 60 }}
        />

        <Box>
          <Typography variant="body2" mb={0.5}>
            Imagem (opcional)
          </Typography>

          {content.previewImage && (
            <>
              <img
                src={content.previewImage}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              />
              <br></br>
            </>
          )}

          <label
            htmlFor="upload-image"
            style={{
              display: "inline-block",
              padding: "0.5em 1em",
              backgroundColor: "var(--color-1)",
              color: "#fff",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 500,
              transition: "background 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-3)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-1)")
            }
          >
            Selecionar imagem
          </label>

          <input
            id="upload-image"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />

          {content.imagem && (
            <Typography
              variant="caption"
              color="text.secondary"
              mt={1}
              display="block"
            >
              Arquivo selecionado: {content.imagem.name}
            </Typography>
          )}
        </Box>

        <TextField
          required
          multiline
          rows={4}
          label="Descrição do conteúdo"
          name="descricao"
          defaultValue={content.descricao}
          onBlur={handleChange}
          inputProps={{ maxLength: 100 }}
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
            defaultValue={content.outroTipo}
            onBlur={handleChange}
            inputProps={{ maxLength: 30 }}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleSubmit}>
          {conteudoEditando ? "Editar" : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
