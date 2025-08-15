"use client";

import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import { useRef, useState } from "react";

const fields = [
  {
    id: "tema",
    type: "",
    label: "Selecione o tema da ficha:",
    radio: [
      { id: "fungo", label: "Fungo", value: "fungo" },
      { id: "padrao", label: "Padrão", value: "padrao" },
    ],
  },
  {
    id: "fungo",
    type: "hidden",
    label: "Qual cor de fungo gostaria de tema?",
    radio: [
      { id: "vermelho", label: "Vermelho", value: 0 },
      { id: "rosa", label: "Rosa", value: 320 },
      { id: "roxo", label: "Roxo", value: 270 },
      { id: "amarelo", label: "Amarelo", value: 60 },
      { id: "verde", label: "Verde", value: 120 },
      { id: "personalizar", label: "Personalizar", value: "personalizar" },
    ],
  },
  {
    id: "slider_fungo",
    type: "slider",
    label: "Cor personalizada:",
    value: "0",
    min: 0,
    max: 360,
  },
  {
    id: "colors",
    type: "color",
    label: "Tema personalizado:",
    inputs: [
      {
        id: "color",
        type: "color",
        label: "Fundo",
      },
      {
        id: "color_fonte",
        type: "color_fonte",
        label: "Fonte",
      },
    ],
  },
];

export default function Customize({
  openCustomize,
  handleModal,
  setFormData,
  formData,
}) {
  const timeoutRef = useRef(null);

  const [custom, setCustom] = useState({
    tema: formData.customize.tema || "fungo",
    fungo: formData.customize.fungo || "0",
    slider_fungo: formData.customize.slider_fungo || "0",
    color: formData.customize.color?.color_box || "#9C9C9C",
    color_fonte: formData.customize.color?.color_fonte || "#ffffff",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    setFormData((prev) => ({
      ...prev,
      customize: {
        ...prev.customize,
        tema: custom.tema,
        fungo:
          custom.tema === "fungo"
            ? custom.fungo === "personalizar"
              ? custom.slider_fungo
              : custom.fungo
            : "0",
        color: {
          color_box: custom.color || "#9C9C9C",
          color_input: darkenHex(custom.color, 0.2),
          color_box_title: darkenHex(custom.color, 0.5),
          color_fonte: custom.color_fonte || "#ffffff",
        },
      },
    }));

    handleModal();
  };

  function handleChangeDebounced(e) {
    clearTimeout(timeoutRef.current);

    const { name, value } = e.target;

    timeoutRef.current = setTimeout(() => {
      setCustom((prev) => ({
        ...prev,
        [name]: value,
      }));
    }, 100);
  }

  function darkenHex(hex, percent) {
    // Remove o "#" se tiver
    hex = hex.replace(/^#/, "");

    // Converte o HEX para R, G e B
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Aplica a diminuição
    r = Math.floor(r * (1 - percent));
    g = Math.floor(g * (1 - percent));
    b = Math.floor(b * (1 - percent));

    // Garante que fique entre 0 e 255
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Converte de volta para HEX
    const darkHex = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    return darkHex;
  }

  return (
    <Modal
      aria-labelledby="custom-modal-title"
      open={openCustomize}
      onClose={handleModal}
    >
      <Box sx={style}>
        <h1 className="title_content">Customização da Ficha</h1>
        <Box
          sx={{
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {fields?.map((field) => {
            if (field.type === "") {
              return (
                <div key={field.id}>
                  <FormLabel>{field.label}</FormLabel>
                  <RadioGroup
                    name={field.id}
                    value={custom[field.id]}
                    onChange={handleChange}
                  >
                    {field.radio.map((option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                </div>
              );
            }

            return null;
          })}

          {fields?.map((field) => {
            if (field.type === "hidden" && custom.tema === "fungo") {
              return (
                <div key={field.id}>
                  <FormLabel>{field.label}</FormLabel>
                  <RadioGroup
                    name={field.id}
                    value={custom[field.id]}
                    onChange={handleChange}
                  >
                    {field.radio.map((option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                </div>
              );
            }

            return null;
          })}

          {custom.tema === "padrao" && <hr className="separation" />}

          <Box
            sx={{ display: "grid", gridTemplateColumns: " 2fr 1fr", gap: 2 }}
          >
            <Box>
              <Box
                sx={{
                  display: "grid",
                  gap: 1,
                }}
              >
                {fields.map((fields, index) => {
                  if (fields.type === "color" && custom.tema === "padrao") {
                    {
                      return (
                        <div key={index + "tema"}>
                          <FormLabel>Tema personalizado:</FormLabel>

                          {fields.inputs.map((field) => {
                            return (
                              <div
                                key={field.id}
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  style={{
                                    padding: "0",
                                    margin: "0",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    height: "30px",
                                    width: "26px",
                                    WebkitAppearance: "none",
                                    appearance: "none",
                                  }}
                                  type="color"
                                  name={field.id}
                                  defaultValue={custom[field.id]}
                                  onChange={handleChangeDebounced}
                                />
                                <FormLabel htmlFor={field.id}>
                                  {field.label}
                                </FormLabel>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                  }
                })}

                {fields.map((slider) => {
                  if (
                    slider.type === "slider" &&
                    custom.tema === "fungo" &&
                    custom.fungo === "personalizar"
                  ) {
                    return (
                      <div key={slider.id}>
                        <FormLabel>{slider.label}</FormLabel>
                        <Slider
                          name={slider.id}
                          sx={{
                            color: `hsl(${custom.slider_fungo}, 100%, 50%)`,
                          }}
                          defaultValue={0}
                          value={custom.slider_fungo}
                          onChange={handleChange}
                          min={slider.min}
                          max={slider.max}
                          aria-label="Default"
                          valueLabelDisplay="auto"
                        />
                      </div>
                    );
                  }
                })}
              </Box>
            </Box>

            <Box>
              {custom.tema === "padrao" && (
                <Box
                  sx={{
                    backgroundColor: `${custom.color}`,
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: `${darkenHex(custom.color, 0.5)}`,
                      width: "100%",
                      padding: "3px",
                      textAlign: "center",
                      color: `${custom.color_fonte}`,
                      textTransform: "uppercase",
                      fontWeight: "700",
                    }}
                  >
                    Exemplo
                  </Box>
                  <Box
                    sx={{
                      padding: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: `${darkenHex(custom.color, 0.2)}`,
                        width: "100%",
                        padding: "11px",
                        borderRadius: "4px",
                        display: "block",
                        textAlign: "center",
                        color: "white",
                        textTransform: "uppercase",
                        fontWeight: "700",
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Button
            variant="contained"
            style={{ borderRadius: "0px" }}
            onClick={handleConfirm}
          >
            Confirmar customização
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "90%",
  bgcolor: "var(--color-1)",
  boxShadow: 24,
};
