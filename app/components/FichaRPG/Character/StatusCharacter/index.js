"use client";

import StatusStyled from "./status.module.css";
import InputFicha from "../../ComponentsFicha/InputFicha";
import ContentFicha from "../../ComponentsFicha/ContentFicha";
import TitleContent from "../../ComponentsFicha/TitleContent";

export default function StatusCharacter ({ handleBlur, textFields, formData }) {
  
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc?.[part] ?? "", obj);
  };

  return (
    <div className={StatusStyled.status}>
      <div className={StatusStyled.status_content}>
        {textFields?.map((fields, index) => (
          <div key={"status" + index} className={StatusStyled.if_status}>
            <TitleContent formData={formData} style={{ height: 3, width: 4 }}>
              {fields.title}
            </TitleContent>
            <ContentFicha formData={formData}>
              <div className={StatusStyled.content}>
                {fields.camps.map((field, index) => (
                  <div key={"campStatus" + index}>
                    <InputFicha
                      formData={formData}
                      label={field.label || ""}
                      disabled={field.type === "disabled" && true}
                      maxLength={field.maxLength}
                      name={field.name}
                      type={field.type}
                      value={getValue(formData, field.name)}
                      onBlur={handleBlur}
                    />
                  </div>
                ))}
              </div>
            </ContentFicha>
          </div>
        ))}
      </div>
    </div>
  );
}
