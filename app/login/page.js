"use client";
import { useState } from "react";
import Form from "../components/Form";
import { Alert, Backdrop, CircularProgress } from "@mui/material";
import { signIn } from "@/pages/api/auth";
import Link from "next/link";

const fields = [
  {
    id: "email",
    label: "Email",
    variant: "standard",
    field: "TextField",
    type: "text",
  },
  {
    id: "password",
    label: "Senha",
    type: "password",
    variant: "standard",
    field: "TextField",
  },
  {
    id: "acceptTerms",
    label: "Manter conectado.",
    field: "Checkbox",
  },
  {
    id: "submitForm",
    label: "Entrar",
    variant: "contained",
    field: "Button",
  },
];

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState({ active: false, errorMessage: "" });

  const sendCredentials = async (crecentials) => {
    setLoading(true);
    const { username, email, password, keepConected } = crecentials;
    try {
      await signIn(email, password);
      console.log("Login realizado com sucesso!");
      setWarning({ active: false });
    } catch (error) {
      console.log(error);
      const cleanErrorMessage = error.message.replace('Firebase: ', '');
      setWarning({ active: true, erroTitle: "Erro ao se cadastrar: ", errorMessage: cleanErrorMessage });
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
        titleForm={"LOGAR"}
      />
    </section>
  );
}
