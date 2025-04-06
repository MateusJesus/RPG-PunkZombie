"use client";

import { useState, useEffect } from "react";
import Form from "../components/Form";
import { Alert, Backdrop, CircularProgress } from "@mui/material";
import { useAuth } from "../contexts/AuthContext"; 
import { useRouter } from "next/navigation"; 
import LoadingPage from "../components/Loading";

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
  const { user, signIn, redirectBack, loadingPage } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user && !loadingPage) {
      router.push("/");
    }
  }, [user, loadingPage, router]);

  if (loadingPage) return <LoadingPage />;

  if (user) return null;

  const sendCredentials = async (credentials) => {
    setLoading(true);
    const { email, password } = credentials;

    try {
      await signIn(email, password);
      console.log("Login realizado com sucesso!");
      setWarning({ active: false });
    } catch (error) {
      console.log(error);
      setWarning({
        active: true,
        erroTitle: "Erro ao logar: ",
        errorMessage: error.message.replace("Firebase: ", ""),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {loading && (
        <Backdrop sx={{ color: "#fff", zIndex: 999 }} open>
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
