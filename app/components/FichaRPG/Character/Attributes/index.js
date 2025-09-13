"use client";

import attrStyled from "./attributes.module.css";

import InputFicha from "../../ComponentsFicha/InputFicha";
import ContentFicha from "../../ComponentsFicha/ContentFicha";

export default function Attributes({ handleBlur, textFields, formData }) {
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc?.[part] ?? "", obj);
  };

  return (
    <div className={attrStyled.atributos}>
      {textFields?.map((field) => (
        <div key={field.name} className={attrStyled.inf_item}>
          <ContentFicha formData={formData} title={field.title}>
            <InputFicha
              label={field.label || ""}
              maxLength={field.maxLength}
              formData={formData}
              name={field.name}
              type={field.type}
              value={getValue(formData, field.name)}
              onBlur={handleBlur}
            />
          </ContentFicha>
        </div>
      ))}
    </div>
  );
}
