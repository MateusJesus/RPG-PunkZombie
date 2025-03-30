"use client";
import Form from "../components/Form";

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


  return (
    <section>
      <Form fields={fields} titleForm={"cadastre-se"} />
    </section>
  );
}
