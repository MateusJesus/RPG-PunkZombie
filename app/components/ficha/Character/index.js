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
    formData.atributos.atri_for,
    formData.atributos.atri_int,
    formData.atributos.atri_car,
    formData.atributos.atri_vig,
    formData.atributos.atri_agi,
    formData.status.status_niv,
  ]);

  const calcularPer = () => {
    setFormData((prevFormData) => {
      const updatedPericias = prevFormData.pericias?.map((pericia) => ({
        ...pericia,
        soma:
          (Number(
            (pericia.atributoPer === "FOR" && formData.atributos.atri_for) ||
              (pericia.atributoPer === "AGI" && formData.atributos.atri_agi) ||
              (pericia.atributoPer === "INT" && formData.atributos.atri_int) ||
              (pericia.atributoPer === "VIG" && formData.atributos.atri_vig) ||
              (pericia.atributoPer === "CAR" && formData.atributos.atri_car) ||
              (pericia.atributoPer === "" && formData.atributos.atri_for)
          ) || 0) +
          2 +
          (parseInt(prevFormData.status.status_niv / 2 || 0) || 0) +
          (Number(pericia.outros) || 0),
      }));
      return { ...prevFormData, pericias: updatedPericias };
    });
  };

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
                    id="nomeJogador" // Adicionei o id correspondente ao htmlFor no label
                    name="informacoes.nome_jogador"
                    type="text"
                    value={formData.informacoes.nome_jogador}
                    onChange={handleChange}
                  />
                </div>
                <div className={classStyled.inf_item}>
                  <label htmlFor="variante">Variante:</label>
                  <input
                    maxLength="15"
                    id="variante" // Adicionei o id correspondente ao htmlFor no label
                    name="informacoes.variante"
                    type="text"
                    value={formData.informacoes.variante}
                    onChange={handleChange}
                  />
                </div>
                <div className={classStyled.inf_item}>
                  <label htmlFor="origem">Origem:</label>
                  <input
                    id="origem" // Adicionei o id correspondente ao htmlFor no label
                    name="informacoes.origem"
                    type="text"
                    value={formData.informacoes.origem}
                    onChange={handleChange}
                  />
                </div>
                <div className={classStyled.inf_item}>
                  <label htmlFor="classe">Classe:</label>
                  <input
                    id="classe"
                    name="informacoes.classe"
                    type="text"
                    value={formData.informacoes.classe}
                    onChange={handleChange}
                  />
                </div>
                <div className={classStyled.inf_item}>
                  <label htmlFor="resistPer">Resistência:</label>
                  <input
                    maxLength="30"
                    id="resistPer"
                    name="informacoes.resistencia"
                    type="text"
                    value={formData.informacoes.resistencia}
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
                      name="status.status_niv"
                      value={formData.status.status_niv}
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
                      name="status.status_pdv"
                      value={formData.status.status_pdv}
                      onChange={handleChange}
                    />
                    <hr />
                    <input
                      maxLength="2"
                      className={classStyled.input_num}
                      type="text"
                      name="status.status_pdvtot"
                      value={formData.status.status_pdvtot}
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
                      name="status.status_sta"
                      value={formData.status.status_sta}
                      onChange={handleChange}
                    />
                    <hr />
                    <input
                      maxLength="2"
                      className={classStyled.input_num}
                      type="text"
                      name="status.status_statot"
                      value={formData.status.status_statot}
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
                      name="status.status_pdi"
                      value={formData.status.status_pdi}
                      onChange={handleChange}
                    />
                    <hr />
                    <input
                      maxLength="2"
                      className={classStyled.input_num}
                      type="text"
                      name="status.status_pditot"
                      value={formData.status.status_pditot}
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
                    <p className={classStyled.res_defesa_txt}>
                      {formData.defesa.defesatot}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classStyled.carac_personagem}>
            <div className={classStyled.caracteristica + " box"}>
              <h2 className="title_content">Aparência</h2>
              <textarea
                name="caracteristicas.aparencia"
                cols="30"
                rows="5"
                value={formData.caracteristicas.aparencia}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className={classStyled.caracteristica + " box"}>
              <h2 className="title_content">Personalidade</h2>
              <textarea
                name="caracteristicas.personalidade"
                cols="30"
                rows="5"
                value={formData.caracteristicas.personalidade}
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
              name="informacoes.nome_personagem"
              value={formData.informacoes.nome_personagem}
              onChange={handleChange}
            />
          </div>
          <div className={classStyled.imagem_perso + " box"}>
            {formData.imagem ? (
              <img src={formData.imagem || ""} alt="Imagem do personagem" />
            ) : (
              <label
                htmlFor="inputImgPerso"
                className={classStyled.custom_file_upload}
              >
                <span>
                  <FaFileImage className={classStyled.icon} />
                  <br />
                  Clique ou arraste e
                  <br />
                  solte sua imagem aqui.
                </span>
                <input
                  id="inputImgPerso"
                  type="file"
                  name="inputImgPerso"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>
        <div className={classStyled.atri_peri}>
          <div className={classStyled.atributos}>
            <div className={classStyled.atributo + " box"}>
              <h2 className={classStyled.title_content + " title_content"}>
                FOR
              </h2>
              <input
                type="text"
                maxLength="2"
                name="atributos.atri_for"
                value={formData.atributos.atri_for}
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
                name="atributos.atri_int"
                value={formData.atributos.atri_int}
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
                name="atributos.atri_agi"
                value={formData.atributos.atri_agi}
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
                name="atributos.atri_vig"
                value={formData.atributos.atri_vig}
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
                name="atributos.atri_car"
                value={formData.atributos.atri_car}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classStyled.pericias + " box"}>
            <h2 className={classStyled.title_content + " title_content"}>
              Perícias
            </h2>
            <div className={classStyled.pericia_content + " overflow"}>
              <table className="table">
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
                <tbody>
                  {formData.pericias?.map((pericia, index) => (
                    <tr key={index}>
                      <td className={classStyled.tdsoma}>
                        <p>{pericia.soma}</p>
                      </td>
                      <td>
                        <select
                          className="form_select"
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
                        <p className="textTable">
                          {parseInt(formData.status.status_niv / 2 || 0)}
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
