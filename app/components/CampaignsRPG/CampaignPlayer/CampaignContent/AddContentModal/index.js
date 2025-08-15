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

export default function AddContentModal({
  open,
  handleClose,
  onSave,
  content,
  setContent,
  conteudoEditando,
}) {
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
      <h1 className="title_content">
        {conteudoEditando ? "Editar" : "Adicioar"} conteúdo
      </h1>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          required
          label="Nome do conteúdo"
          name="nome"
          value={content.nome}
          onChange={handleChange}
          inputProps={{ maxLength: 60 }}
        />

        <Box>
          <Typography variant="body2" mb={0.5}>
            Imagem (opcional)
          </Typography>

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
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
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
