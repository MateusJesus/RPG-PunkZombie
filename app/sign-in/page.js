"use client";
import { signUp } from "@/pages/api/auth";
import Form from "../components/Form";
import { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Link from "next/link";

const fields = [
  {
    id: "username",
    name: "username",
    label: "Usuário",
    variant: "standard",
    field: "TextField",
  },
  {
    id: "email",
    label: "Email",
    variant: "standard",
    field: "TextField",
    type: "text",
  },
  {
    id: "password",
    name: "password",
    label: "Senha",
    type: "password",
    variant: "standard",
    field: "TextField",
  },
  {
    id: "acceptTerms",
    name: "acceptTerms",
    label: "Manter conectado.",
    field: "Checkbox",
  },
  {
    id: "submitForm",
    label: "Cadastrar",
    variant: "contained",
    field: "Button",
  },
];

export default function Singin() {
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState({ active: false, errorMessage: "" });

  const sendCredentials = async (crecentials) => {
    setLoading(true);
    const { username, email, password, keepConected } = crecentials;
    try {
      await signUp(email, password, username);
      setWarning({ active: false });
    } catch (error) {
      console.log("Erro ao se cadastrar: " + error);
      const cleanErrorMessage = error.message.replace("Firebase: ", "");
      setWarning({
        active: true,
        erroTitle: "Erro ao se cadastrar: ",
        errorMessage: cleanErrorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {loading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Form
        warning={warning}
        setWarning={setWarning}
        fields={fields}
        sendCredentials={sendCredentials}
        titleForm={"cadastre-se"}
      />
    </section>
  );
}
