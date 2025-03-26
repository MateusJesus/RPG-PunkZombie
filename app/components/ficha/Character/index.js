"use client";

import classStyled from "./personagem.module.css";
import { FaFileImage } from "react-icons/fa";
import { useEffect } from "react";
import { IoShieldSharp } from "react-icons/io5";
import RemoveItem from "../../Buttons/RemoveItem";

export default function Character({
  handleImageChange,
  handleChange,
  formData,
  setFormData,
}) {
  useEffect(() => {
    calcularPer();
  }, [
    formData.forca,
    formData.agilidade,
    formData.vigor,
    formData.carisma,
    formData.inteligencia,
    formData.niv,
  ]);

  const calcularPer = () => {
    setFormData((prevFormData) => {
      const updatedPericias = prevFormData.pericias.map((pericia) => ({
        ...pericia,
        soma:
          (Number(
            (pericia.atributoPer === "FOR" && formData.forca) ||
              (pericia.atributoPer === "AGI" && formData.agilidade) ||
              (pericia.atributoPer === "INT" && formData.inteligencia) ||
              (pericia.atributoPer === "VIG" && formData.vigor) ||
              (pericia.atributoPer === "CAR" && formData.carisma) ||
              (pericia.atributoPer === "" && formData.forca)
          ) || 0) +
          2 +
          (parseInt(prevFormData.niv / 2 || 0) || 0) +
          (Number(pericia.outros) || 0),
      }));
      return { ...prevFormData, pericias: updatedPericias };
    });
  };

  const changePericia = (e, index) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedPericias = prevFormData.pericias.map((pericia, idx) => {
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
          nomePericia: 0,
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

  return (
    <section className={classStyled.personagem}>
      <h2 className={classStyled.title_content + " title_content"}>
        Personagem
      </h2>
      <div className={classStyled.sobre_personagem}>
        <div className={classStyled.informacoes_status}>
          <div className={classStyled.div_inf_stat}>
            <div className={classStyled.informacoes_perso + " box"}>
              <h2 className={classStyled.title_content + " title_content"}>
                Informações
              </h2>
              <div className={classStyled.content_perso}>
                <div className={classStyled.inf_item}>
                  <label htmlFor="nomeJogador">Nome do Jogador:</label>
                  <input
                    maxLength="20"
                    id="nomeJogador"
                    name="nomeJogador"
                    type="text"
                    value={formData.nomeJogador}
                    onChange={handleChange}
                  />
                </div>
                <div className={classStyled.inf_item}>
                  <label htmlFor="variante">Variante:</label>
                  <input
                    maxLength="15"
                    id="variante"
                    name="variante"
                    type="text"
                    value={formData.variante}
                    onChange={handleChange}
                  />
                </div>
                <div className={classStyled.inf_item}>
                  <label htmlFor="origem">Origem:</label>
                  <input
                    id="origem"
                    name="origem"
                    type="text"
                    value={formData.origem}
                    onChange={handleChange}
                  />
                </div>
                <div className={classStyled.inf_item}>
                  <label htmlFor="classe">Classe:</label>
                  <input
                    id="classe"
                    name="classe"
                    type="text"
                    value={formData.classe}
                    onChange={handleChange}
                  />
                </div>
                <div className={classStyled.inf_item}>
                  <label htmlFor="resistPer">Resistencia:</label>
                  <input
                    maxLength="30"
                    id="resistPer"
                    name="resistPer"
                    type="text"
                    value={formData.resistencia}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className={classStyled.status}>
              <div className={classStyled.status_content}>
                <div className={classStyled.if_status + " box"}>
                  <h2 className={classStyled.title_content + " title_content"}>
                    NIV
                  </h2>
                  <div className={classStyled.content}>
                    <input
                      maxLength="2"
                      className={classStyled.input_num}
                      type="text"
                      name="niv"
                      id="status_niv"
                      value={formData.niv}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classStyled.if_status + " box"}>
                  <h2 className={classStyled.title_content + " title_content"}>
                    PV
                  </h2>
                  <div className={classStyled.content}>
                    <input
                      maxLength="2"
                      className={classStyled.input_num}
                      type="text"
                      name="pdv"
                      id="status_pdv"
                      value={formData.pdv}
                      onChange={handleChange}
                    />
                    <hr />
                    <input
                      maxLength="2"
                      className={classStyled.input_num}
                      type="text"
                      name="pdvTotal"
                      id="status_pdvtot"
                      value={formData.pdvTotal}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classStyled.if_status + " box"}>
                  <h2 className={classStyled.title_content + " title_content"}>
                    STA
                  </h2>
                  <div className={classStyled.content}>
                    <input
                      maxLength="2"
                      className={classStyled.input_num}
                      type="text"
                      name="sta"
                      id="status_sta"
                      value={formData.sta}
                      onChange={handleChange}
                    />
                    <hr />
                    <input
                      maxLength="2"
                      className={classStyled.input_num}
                      type="text"
                      name="staTotal"
                      id="status_statot"
                      value={formData.staTotal}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classStyled.if_status + " box"}>
                  <h2 className={classStyled.title_content + " title_content"}>
                    PDI
                  </h2>
                  <div className={classStyled.content}>
                    <input
                      maxLength="2"
                      className={classStyled.input_num}
                      type="text"
                      name="pdi"
                      id="status_pdi"
                      value={formData.pdi}
                      onChange={handleChange}
                    />
                    <hr />
                    <input
                      maxLength="2"
                      className={classStyled.input_num}
                      type="text"
                      name="pdiTotal"
                      id="status_pditot"
                      value={formData.pdiTotal}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classStyled.if_status + " box"}>
                  <h2 className={classStyled.title_content + " title_content"}>
                    DEF
                  </h2>
                  <div className={classStyled.content}>
                    <IoShieldSharp className={classStyled.res_defesa} />
                    <p className={classStyled.res_defesa_txt} id="res_defesa">
                      {formData.defesa}
                    </p>
                    <input type="hidden" name="defesaTotal" id="defesaTotal" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classStyled.carac_personagem}>
            <div className={classStyled.caracteristica + " box"}>
              <h2 className="title_content">Aparência</h2>
              <textarea
                name="aparencia"
                id="aparencia"
                cols="30"
                rows="5"
                value={formData.aparencia}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className={classStyled.caracteristica + " box"}>
              <h2 className="title_content">Personalidade</h2>
              <textarea
                name="personalidade"
                id="personalidade"
                cols="30"
                rows="5"
                value={formData.personalidade}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className={classStyled.resistencia_foto}>
          <div className={classStyled.resistencia + " box"}>
            <h2 className={classStyled.title_content + " title_content"}>
              Nome
            </h2>
            <input
              type="text"
              name="nomePersonagem"
              id="resist_perso"
              value={formData.nomePersonagem}
              onChange={handleChange}
            />
          </div>
          <div className={classStyled.imagem_perso + " box"}>
            {formData.imagem ? (
              <img
                id="img_personagem"
                src={formData.imagem || "sd"}
                alt="Imagem do personagem"
              />
            ) : (
              <label
                htmlFor="inputImgPerso"
                id="customFileUpload"
                className={classStyled.custom_file_upload}
              >
                <span id="spanFileUpload">
                  <FaFileImage className={classStyled.icon} />
                  <br />
                  Clique ou arraste e
                  <br />
                  solte sua imagem aqui.
                </span>
                <input
                  type="file"
                  name="inputImgPerso"
                  id="inputImgPerso"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>
        <div className={classStyled.atri_peri}>
          <div id="atributos" className={classStyled.atributos}>
            <div className={classStyled.atributo + " box"}>
              <h2 className={classStyled.title_content + " title_content"}>
                FOR
              </h2>
              <input
                type="text"
                maxLength="2"
                name="forca"
                id="atri_for"
                value={formData.forca}
                onChange={handleChange}
              />
            </div>
            <div className={classStyled.atributo + " box"}>
              <h2 className={classStyled.title_content + " title_content"}>
                INT
              </h2>
              <input
                type="text"
                maxLength="2"
                name="inteligencia"
                id="atri_int"
                value={formData.inteligencia}
                onChange={handleChange}
              />
            </div>
            <div className={classStyled.atributo + " box"}>
              <h2 className={classStyled.title_content + " title_content"}>
                AGI
              </h2>
              <input
                type="text"
                maxLength="2"
                name="agilidade"
                id="atri_agi"
                value={formData.agilidade}
                onChange={handleChange}
              />
            </div>
            <div className={classStyled.atributo + " box"}>
              <h2 className={classStyled.title_content + " title_content"}>
                VIG
              </h2>
              <input
                type="text"
                maxLength="2"
                name="vigor"
                id="atri_vig"
                value={formData.vigor}
                onChange={handleChange}
              />
            </div>
            <div className={classStyled.atributo + " box"}>
              <h2 className={classStyled.title_content + " title_content"}>
                CAR
              </h2>
              <input
                type="text"
                maxLength="2"
                name="carisma"
                id="atri_car"
                value={formData.carisma}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classStyled.pericias + " box"}>
            <h2 className={classStyled.title_content + " title_content"}>
              Perícias
            </h2>
            <div
              id="periciaScroll"
              className={classStyled.pericia_content + " overflow"}
            >
              <table className="table" id="tablePer">
                <thead className={classStyled.theadark}>
                  <tr>
                    <th className="thNumber">Total</th>
                    <th className={classStyled.thPer}>Perícia</th>
                    <th className={classStyled.thAtr}>Atributos</th>
                    <th className="thNumber">
                      1/2
                      <br />
                      Nível
                    </th>
                    <th className="thNumber">Outros</th>
                    <th className="thNumber thUltimo"></th>
                  </tr>
                </thead>
                <tbody id="tBodyPer">
                  {formData.pericias.map((pericia, index) => (
                    <tr key={index}>
                      <td className={classStyled.tdsoma}>
                        <p>{pericia.soma}</p>
                      </td>
                      <td>
                        <select
                          className="form_select"
                          name={`nomePericia`}
                          type="text"
                          value={pericia.nomePericia}
                          onChange={(e) => changePericia(e, index)}
                        >
                          {selectPericias
                            .filter(
                              (option) =>
                                option.value === (pericia.atributoPer || "FOR")
                            )
                            .map((option, index) => (
                              <option key={index} value={index}>
                                {option.label}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td>
                        <select
                          name="atributoPer"
                          onChange={(e) => changePericia(e, index)}
                          className="form_select"
                        >
                          <option value="FOR">FOR {formData.forca}</option>
                          <option value="INT">
                            INT {formData.inteligencia}
                          </option>
                          <option value="AGI">AGI {formData.agilidade}</option>
                          <option value="VIG">VIG {formData.vigor}</option>
                          <option value="CAR">CAR {formData.carisma}</option>
                        </select>
                      </td>
                      <td>
                        <p className="textTable">
                          {parseInt(formData.niv / 2 || 0)}
                        </p>
                      </td>
                      <td>
                        <input
                          name={`outros`}
                          type="number"
                          value={pericia.outros}
                          onChange={(e) => changePericia(e, index)}
                        />
                      </td>
                      <td>
                        <RemoveItem
                          onClick={() => handlePericiaRemove(index)}
                          type={"button"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                className="botaoAdicionar"
                onClick={handlePericiaAdd}
              >
                <strong>ADICIONAR PERÍCIA</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// const CharacterStyled = styled.section`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   height: 100%;
//   width: 100%;
//   padding-top: 4em;

//   .sobre_personagem {
//     display: flex;
//     justify-content: space-between;
//     gap: 10px;
//     width: 100%;
//     height: 100%;
//   }

//   .informacoes_status {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//   }

//   .div-inf_stat {
//     display: flex;
//     gap: 10px;
//   }

//   .informacoes_perso {
//     width: 100%;
//   }

//   .informacoes_perso .title_content {
//     padding: 1em;
//   }

//   .content_perso {
//     display: flex;
//     gap: 7px;
//     flex-direction: column;
//     margin: 0.5em;
//   }

//   .inf_item {
//     display: flex;
//     flex-direction: column;
//     text-transform: uppercase;
//     font-size: 9px;
//     font-weight: 700;
//   }

//   .status {
//     width: 100%;
//   }

//   .status_content {
//     gap: 10px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//   }

//   .if_status {
//     display: flex;
//     align-items: center;
//     height: 100%;
//   }

//   .status .title_content {
//     width: 6em;
//   }

//   .content {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//     padding: 0 0.5em;
//   }

//   .content input {
//     text-align: center;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 15px;
//     width: 100%;
//     height: 100%;
//     padding: 0.5em;
//     font-weight: 700;
//   }

//   .carac_personagem {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     height: 100%;
//   }

//   .caracteristica {
//     height: 100%;
//   }

//   .resistencia_foto {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     width: 44em;
//   }

//   .resistencia {
//     display: flex;
//     align-items: center;
//   }

//   .resistencia .title_content {
//     padding: 1em;
//   }

//   .resistencia input {
//     margin: 0.5em;
//     height: 2.5em;
//     width: 100%;
//   }

//   .imagem_perso {
//     height: 40em;
//     width: 100%;
//     text-align: center;
//   }

//   .imagem_perso img {
//     height: auto;
//     cursor: pointer;
//     text-align: center;
//   }

//   .imagem_perso input {
//     display: none;
//   }

//   .imagem_perso .icon {
//     font-size: 30px;
//   }

//   #imagemContainer {
//     position: relative;
//     height: auto;
//     display: flex;
//     justify-content: center;
//     padding: 1em;
//     height: 100%;
//   }

//   .custom-file-upload {
//     font-weight: 400;
//     position: absolute;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     overflow: hidden;
//     margin: 1em;
//     border: 2px dashed var(--color-3);
//     border-radius: 10px;
//     cursor: pointer;
//     transition: background ease-in-out 0.5s;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//   }

//   .custom-file-upload:hover {
//     border: 2px dashed var(--color-4);
//     background-color: rgba(129, 129, 129, 0.2);
//   }

//   .degrade {
//     font-weight: 600;
//     position: absolute;
//     transform: translateY(0.5em);
//     display: flex;
//     align-items: center;
//     font-size: 15px;
//     padding: 0.3em 10em 0.3em 1em;
//     justify-content: center;
//     color: var(--white);
//     background: rgb(255, 0, 0);
//     background: -moz-linear-gradient(
//       90deg,
//       rgba(255, 0, 0, 0.5) 0%,
//       rgba(255, 0, 0, 0.5) 50%,
//       rgba(255, 0, 0, 0) 100%
//     );
//     background: -webkit-linear-gradient(
//       90deg,
//       rgba(255, 0, 0, 0.5) 0%,
//       rgba(255, 0, 0, 0.5) 50%,
//       rgba(255, 0, 0, 0) 100%
//     );
//     background: linear-gradient(
//       90deg,
//       rgba(255, 0, 0, 0.5) 0%,
//       rgba(255, 0, 0, 0.5) 50%,
//       rgba(255, 0, 0, 0) 100%
//     );
//     filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff0000",endColorstr="#ff0000",GradientType=1);
//     animation: fade 2s infinite;
//   }

//   @keyframes fade {
//     0% {
//       opacity: 0;
//     }
//     50% {
//       opacity: 1;
//     }
//     100% {
//       opacity: 0;
//     }
//   }
//   .atri_peri {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     width: 80%;
//   }

//   .atributos {
//     width: 100%;
//     display: flex;
//     gap: 10px;
//     justify-content: space-between;
//   }

//   .atributos input {
//     width: calc(100% - 1em);
//     font-size: 17px;
//     margin: 0.5em;
//     text-align: center;
//     font-weight: 700;
//   }
//   .pericias {
//     text-align: center;
//     height: 100%;
//   }

//   .pericia_content {
//     overflow-x: hidden;
//     overflow-y: auto;
//     padding: 0.2em;
//     height: 32.5em;
//   }

//   .thPer {
//     width: 18em;
//   }

//   .tdsoma {
//     background-color: var(--color-3);
//     border-radius: 10em;
//     position: relative;
//     height: 2em;
//     width: 2em;
//     display: block;
//     line-height: 2em;
//   }

//   .tdsoma p {
//     color: var(--white);
//     left: 0;
//     right: 0;
//     position: absolute;
//   }
// `;
