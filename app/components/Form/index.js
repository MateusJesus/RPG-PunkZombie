"use client";
import {
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

export default function Form({ fields, titleForm }) {
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
      if (field.id === "email") {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (formData[field.id] === "") {
          newError[field.id] = `${field.label} é obrigatório!`;
          valid = false;
        } else if (!emailRegex.test(formData[field.id])) {
          newError[field.id] = "Por favor, insira um email válido!";
          valid = false;
        } else {
          newError[field.id] = "";
        }
      } else if (field.field === "TextField" && formData[field.id] === "") {
        newError[field.id] = `${field.label} é obrigatório!`;
        valid = false;
      } else if (field.field === "TextField" && formData[field.id].length < 3) {
        newError[
          field.id
        ] = `${field.label} possui poucos caracteres! (mínimo de 3)`;
        valid = false;
      } else {
        newError[field.id] = "";
      }
      if (!newError[field.id]) {
        newError[field.id] = "";
      }
    });

    setError(newError);
    return valid;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log({ Susses: formData });
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
        </div>
      </form>
    </div>
  );
}
