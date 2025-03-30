"use client";
import Form from "../components/Form";

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


  return (
    <section>
      <Form fields={fields} titleForm={"LOGAR"} />
    </section>
  );
}
