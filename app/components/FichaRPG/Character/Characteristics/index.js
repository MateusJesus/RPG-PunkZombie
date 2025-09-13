"use client";

import CharStyled from "./characteristic.module.css";

import InputFicha from "../../ComponentsFicha/InputFicha";

export default function Characteristic({ handleBlur, textFields, formData }) {
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc?.[part] ?? "", obj);
  };

  return (
    <div className={CharStyled.caracteristica}>
      <div className={CharStyled.content_perso}>
        {textFields?.map((field) => (
          <div key={field.name} className={CharStyled.inf_item}>
            <InputFicha
              formData={formData}
              label={field.label || ""}
              maxLength={field.maxLength}
              name={field.name}
              type={field.type}
              value={getValue(formData, field.name)}
              onBlur={handleBlur}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
