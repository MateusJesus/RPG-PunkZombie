"use client";

import perStyled from "./pericias.module.css";
import InputFicha from "../../InputFicha";
import RemoveItem from "@/app/components/Buttons/RemoveItem";
import ButtonAdd from "../../ButtonAdd";

export default function Pericias({ setFormData, formData, calcularPer }) {
  const fungo = formData?.customize?.fungo;
  const tema = formData?.customize?.tema;
  const color = formData?.customize?.color;

  const selectPericias = [
    { label: "ACROBACIA", value: "AGI", penArmadura: true },
    { label: "ADESTRAMENTO", value: "CAR", treinado: true },
    { label: "ARTES", value: "CAR" },
    { label: "APARÊNCIA", value: "CAR" },
    { label: "ATLETISMO", value: "FOR", penArmadura: true },
    { label: "CAVALGAR", value: "AGI", treinado: true },
    { label: "CIÊNCIAS", value: "INT", treinado: true },
    { label: "CONHECIMENTO", value: "INT", treinado: true },
    { label: "CULINÁRIA", value: "INT" },
    { label: "CRIME", value: "AGI", treinado: true, penArmadura: true },
    { label: "DIPLOMACIA", value: "CAR" },
    { label: "ENGANAÇÃO", value: "CAR" },
    { label: "FOFOCA", value: "CAR" },
    { label: "FORTITUDE", value: "VIG" },
    { label: "FURTIVIDADE", value: "AGI", penArmadura: true },
    { label: "INICIATIVA", value: "AGI", penArmadura: true },
    { label: "INTIMIDAÇÃO", value: "CAR" },
    { label: "INTUIÇÃO", value: "CAR" },
    { label: "INVESTIGAÇÃO", value: "INT" },
    { label: "LENDAS", value: "INT", treinado: true },
    { label: "LUTA", value: "FOR" },
    { label: "MECÂNICA", value: "INT", treinado: true },
    { label: "MEDICINA", value: "INT", treinado: true },
    { label: "MUTÁGENO", value: "INT", treinado: true },
    { label: "PERCEPÇÃO", value: "CAR" },
    { label: "PILOTAGEM", value: "AGI", treinado: true },
    { label: "PONTARIA", value: "AGI", treinado: true },
    { label: "PROFISSÃO", value: "INT", treinado: true },
    { label: "REFLEXOS", value: "AGI", penArmadura: true },
    { label: "RELIGIÃO", value: "CAR", treinado: true },
    { label: "SOBREVIVÊNCIA", value: "INT" },
    { label: "TÁTICA", value: "INT", treinado: true },
    { label: "TECNOLOGIA", value: "INT", treinado: true },
    { label: "VONTADE", value: "CAR" },
  ];

  const changePericia = (e, index) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedPericias = prevFormData.pericias?.map((pericia, idx) => {
        if (idx === index) {
          return {
            ...pericia,
            [name]: value,
          };
        }
        return pericia;
      });

      return { ...prevFormData, pericias: updatedPericias };
    });
    calcularPer();
  };

  const handlePericiaAdd = () => {
    setFormData({
      ...formData,
      pericias: [
        ...formData.pericias,
        {
          soma: 2,
          nomePericia: "",
          atributoPer: "",
          outros: 0,
        },
      ],
    });
    calcularPer();
  };

  const handlePericiaRemove = (index) => {
    setFormData({
      ...formData,
      pericias: formData.pericias.filter((_, idx) => idx !== index),
    });
  };

  return (
    <div className={perStyled.pericias}>
      <div className={perStyled.pericia_content + " overflow"}>
        <table className="table">
          <thead className={perStyled.theadark}>
            <tr>
              <th
                style={{
                  color:
                    tema === "padrao"
                      ? `${color.color_fonte}`
                      : "var(--color-text)",
                }}
                className="thNumber"
              >
                Total
              </th>
              <th
                style={{
                  color:
                    tema === "padrao"
                      ? `${color.color_fonte}`
                      : "var(--color-text)",
                }}
                className={perStyled.thPer}
              >
                Perícia
              </th>
              <th
                style={{
                  color:
                    tema === "padrao"
                      ? `${color.color_fonte}`
                      : "var(--color-text)",
                }}
                className={perStyled.thAtr}
              >
                Atributos
              </th>
              <th
                style={{
                  color:
                    tema === "padrao"
                      ? `${color.color_fonte}`
                      : "var(--color-text)",
                }}
                className="thNumber"
              >
                1/2
                <br />
                Nível
              </th>
              <th
                style={{
                  color:
                    tema === "padrao"
                      ? `${color.color_fonte}`
                      : "var(--color-text)",
                }}
                className="thNumber"
              >
                Outros
              </th>
              <th
                style={{
                  color:
                    tema === "padrao"
                      ? `${color.color_fonte}`
                      : "var(--color-text)",
                }}
                className="thNumber thUltimo"
              ></th>
            </tr>
          </thead>
          <tbody>
            {formData.pericias?.map((pericia, index) => (
              <tr key={index}>
                <td
                  className={perStyled.tdsoma}
                  style={{
                    backgroundColor:
                      tema === "fungo"
                        ? `hsla(${fungo}deg 100%, 50%, 0.3)`
                        : color.color_box_title,
                    fontFamily: tema === "fungo" ? "abibas" : "",
                  }}
                >
                  <span className={perStyled.soma}>
                    <p>{pericia.soma}</p>
                  </span>
                </td>
                <td>
                  <select
                    className="form_select"
                    style={{
                      backgroundColor:
                        tema === "fungo"
                          ? `hsla(${fungo}deg 100%, 50%, 0.3)`
                          : color.color_input,
                      fontFamily: tema === "fungo" ? "abibas" : "",
                    }}
                    name="nomePericia"
                    type="text"
                    value={pericia.nomePericia}
                    onChange={(e) => changePericia(e, index)}
                  >
                    {selectPericias
                      .filter(
                        (option) =>
                          option.value === (pericia.atributoPer || "FOR")
                      )
                      ?.map((option, index) => (
                        <option key={index} value={index}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                </td>
                <td>
                  <select
                    style={{
                      backgroundColor:
                        tema === "fungo"
                          ? `hsla(${fungo}deg 100%, 50%, 0.3)`
                          : color.color_input,
                      fontFamily: tema === "fungo" ? "abibas" : "",
                    }}
                    name="atributoPer"
                    onChange={(e) => changePericia(e, index)}
                    className="form_select"
                    value={pericia.atributoPer}
                  >
                    <option value="FOR">
                      FOR {formData.atributos.atri_for || 0}
                    </option>
                    <option value="INT">
                      INT {formData.atributos.atri_int || 0}
                    </option>
                    <option value="AGI">
                      AGI {formData.atributos.atri_agi || 0}
                    </option>
                    <option value="VIG">
                      VIG {formData.atributos.atri_vig || 0}
                    </option>
                    <option value="CAR">
                      CAR {formData.atributos.atri_car || 0}
                    </option>
                  </select>
                </td>

                <td>
                  <InputFicha
                    formData={formData}
                    disabled
                    value={formData.status.status_niv || 0}
                  />
                </td>
                <td>
                  <InputFicha
                    formData={formData}
                    name={`outros`}
                    type="number"
                    value={pericia.outros}
                    onChange={(e) => changePericia(e, index)}
                  />
                </td>
                <td>
                  <RemoveItem
                    formData={formData}
                    onClick={() => handlePericiaRemove(index)}
                    type={"button"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ButtonAdd formData={formData} handlePericiaAdd={handlePericiaAdd}>
          adicionar pericia
        </ButtonAdd>
      </div>
    </div>
  );
}
