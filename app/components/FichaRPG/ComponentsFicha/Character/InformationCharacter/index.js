"use client";

import InformStyled from "./informationCharacter.module.css";
import InputFicha from "../../InputFicha";

export default function InformationFicha({
  handleBlur,
  textFields,
  user,
  formData,
}) {
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc?.[part] ?? "", obj);
  };

  return (
    <div className={InformStyled.informacoes_perso}>
      <div className={InformStyled.content_perso}>
        {textFields?.map((field) => (
          <div key={field.name} className={InformStyled.inf_item}>
            <InputFicha
              formData={formData}
              label={field.label || ""}
              maxLength={field.maxLength}
              disabled={field.type === "disabled" && true}
              name={field.name}
              type={field.type}
              value={
                field.name === "informacoes.nome_jogador"
                  ? formData.usuario
                    ? formData.usuario
                    : user?.displayName
                    ? user?.displayName
                    : ""
                  : getValue(formData, field.name)
              }
              onBlur={handleBlur}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
