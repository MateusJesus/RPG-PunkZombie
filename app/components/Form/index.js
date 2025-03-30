"use client";
import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import classStyled from "./form.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { signIn, signUp } from "@/pages/api/auth";
import Link from "next/link";

const textFieldStyles = {
  "& .MuiInputLabel-root": { color: "#a1a1a1" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#76b95f" },
  "& .MuiInput-underline:before": {
    borderBottomColor: "var(--color-2)",
    opacity: 1,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#76b95f !important",
  },
  "&:hover .MuiInput-underline:before": {
    borderBottomColor: "var(--color-2) !important",
    opacity: 1,
  },
  "& .MuiInputBase-input": {
    color: "var(--text-color)",
  },
};

export default function Form({
  fields,
  titleForm,
  sendCredentials,
  warning,
  setWarning,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    keepConected: false,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    setError((prevError) => ({
      ...prevError,
      [id]: "",
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      keepConected: checked,
    });
  };

  const validateForm = () => {
    const newError = {};
    let valid = true;

    fields.forEach((field) => {
      const value = formData[field.id]; // Pega o valor do campo

      if (field.id === "email") {
        // 🔹 Validação de Email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value) {
          newError[field.id] = `${field.label} é obrigatório!`;
          valid = false;
        } else if (!emailRegex.test(value)) {
          newError[field.id] = "Por favor, insira um email válido!";
          valid = false;
        }
      } else if (field.id === "password") {
        if (!value) {
          newError[field.id] = "A senha é obrigatória!";
          valid = false;
        } else if (value.length < 6) {
          newError[field.id] = "A senha deve ter pelo menos 6 caracteres!";
          valid = false;
        }
      } else if (field.field === "TextField") {
        if (!value) {
          newError[field.id] = `${field.label} é obrigatório!`;
          valid = false;
        } else if (value.length < 3) {
          newError[
            field.id
          ] = `${field.label} possui poucos caracteres! (mínimo de 3)`;
          valid = false;
        }
      }
    });

    setError(newError);
    return valid;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    sendCredentials(formData);
  };

  return (
    <div className={classStyled.container}>
      <form
        className={`${classStyled.formStyled} box`}
        onSubmit={(e) => submitForm(e)}
      >
        <h1 style={{ fontSize: 25 }} className="title_content">
          {titleForm}
        </h1>

        <div className={classStyled.content}>
          {" "}
          {warning.active && (
            <Alert
              severity="error"
              variant="outlined"
              onClose={() => setWarning({ active: false })}
            >
              <AlertTitle>{warning.erroTitle}</AlertTitle>
              {String(warning.errorMessage)}
            </Alert>
          )}
          {fields.map((item) => {
            if (item.field === "TextField") {
              return (
                <TextField
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  variant={item.variant}
                  value={formData[item.id]}
                  onChange={handleInputChange}
                  sx={textFieldStyles}
                  error={Boolean(error[item.id])}
                  helperText={error[item.id]}
                  type={
                    item.id === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : item.type || "text"
                  }
                  InputProps={
                    item.id === "password" && {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword
                                ? "hide the password"
                                : "display the password"
                            }
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <VisibilityOff
                                sx={{ color: "var(--text-color)" }}
                              />
                            ) : (
                              <Visibility sx={{ color: "var(--text-color)" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  }
                />
              );
            }

            if (item.field === "Checkbox") {
              return (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      checked={formData.keepConected}
                      onChange={handleCheckboxChange}
                      sx={{
                        color: "var(--color-2)",
                        "&:hover": {
                          color: "var(--green-hover)",
                        },
                        "&.Mui-checked": {
                          color: "var(--green)",
                        },
                      }}
                    />
                  }
                  label={item.label}
                />
              );
            }

            if (item.field === "Button") {
              return (
                <Button key={item.id} variant={item.variant} type="submit">
                  {item.label}
                </Button>
              );
            }

            return null;
          })}
          <p className={classStyled.textRedirect}>
            {titleForm !== "LOGAR" && "Já é cadastrado? Entre"}
            {titleForm === "LOGAR" && "Ainda não se Cadastrou? Cadastre-se!"}
          </p>
        </div>
      </form>
    </div>
  );
}
