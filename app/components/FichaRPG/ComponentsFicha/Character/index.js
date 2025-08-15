"use client";

import classStyled from "./personagem.module.css";
import { FaFileImage } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoShieldSharp } from "react-icons/io5";
import RemoveItem from "../../../Buttons/RemoveItem";
import ContentFicha from "../ContentFicha";
import InformationCharacter from "./InformationCharacter";
import StatusCharacter from "./StatusCharacter";
import Characteristic from "./Characteristics";
import InputFicha from "../InputFicha";
import ImageCharacter from "./ImageCharacter";
import Attributes from "./Attributes";
import Pericias from "./Pericias";
import TitleContent from "../TitleContent";

export default function Character({
  user,
  handleChange,
  formData,
  setFormData,
}) {
  useEffect(() => {
    calcularPer();
  }, [formData.atributos, formData.status.status_niv]);

  const textFieldsCharacter = {
    camposInformacoes: [
      {
        label: "Nome do Jogador",
        name: "informacoes.nome_jogador",
        id: "nomeJogador",
        type: "disabled",
        maxLength: 20,
      },
      {
        label: "Variante",
        name: "informacoes.variante",
        id: "variante",
        type: "text",
        maxLength: 15,
      },
      {
        label: "Origem",
        name: "informacoes.origem",
        id: "origem",
        type: "text",
        maxLength: 15,
      },
      {
        label: "Classe",
        name: "informacoes.classe",
        id: "classe",
        type: "text",
        maxLength: 15,
      },
      {
        label: "Resistência",
        name: "informacoes.resistencia",
        id: "resistPer",
        type: "text",
        maxLength: 30,
      },
    ],

    campsStatus: [
      {
        title: "NIV",
        camps: [
          {
            name: "status.status_niv",
            maxLength: "2",
            type: "text",
            maxLength: 2,
          },
        ],
      },
      {
        title: "PV",
        camps: [
          {
            name: "status.status_pdv",
            maxLength: "2",
            type: "text",
            maxLength: 2,
          },
          {
            name: "status.status_pdvtot",
            maxLength: "2",
            type: "text",
            maxLength: 2,
          },
        ],
      },

      {
        title: "STA",
        camps: [
          {
            name: "status.status_sta",
            maxLength: "2",
            type: "text",
            maxLength: 2,
          },
          {
            name: "status.status_statot",
            maxLength: "2",
            type: "text",
            maxLength: 2,
          },
        ],
      },

      {
        title: "PDI",
        camps: [
          {
            name: "status.status_pdi",
            maxLength: "2",
            type: "text",
            maxLength: 2,
          },
          {
            name: "status.status_pditot",
            maxLength: "2",
            type: "text",
            maxLength: 2,
          },
        ],
      },
      {
        title: "DEF",
        camps: [
          {
            name: "defesa.defesatot",
            maxLength: "2",
            type: "disabled",
          },
        ],
      },
    ],

    campAparencia: [
      {
        name: "caracteristicas.aparencia",
        type: "textarea",
        maxLength: 450,
      },
    ],

    campPersonalidade: [
      {
        name: "caracteristicas.personalidade",
        type: "textarea",
        maxLength: 450,
      },
    ],

    camposAtributos: [
      {
        title: "FOR",
        name: "atributos.atri_for",
        type: "text",
        maxLength: 2,
      },
      {
        title: "INT",
        name: "atributos.atri_int",
        type: "text",
        maxLength: 2,
      },
      {
        title: "AGI",
        name: "atributos.atri_agi",
        type: "text",
        maxLength: 2,
      },
      {
        title: "VIG",
        name: "atributos.atri_vig",
        type: "text",
        maxLength: 2,
      },
      {
        title: "CAR",
        name: "atributos.atri_car",
        type: "text",
        maxLength: 2,
      },
    ],
  };

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

  return (
    <section className={classStyled.personagem}>
      <TitleContent formData={formData}>Personagem</TitleContent>
      <div className={classStyled.sobre_personagem}>
        <div className={classStyled.informacoes_status}>
          <div className={classStyled.div_inf_stat}>
            <ContentFicha title="Informações" formData={formData}>
              <InformationCharacter
                user={user}
                formData={formData}
                handleChange={handleChange}
                textFields={textFieldsCharacter.camposInformacoes}
              />
            </ContentFicha>

            <StatusCharacter
              formData={formData}
              handleChange={handleChange}
              textFields={textFieldsCharacter.campsStatus}
            />
          </div>

          <div className={classStyled.carac_personagem}>
            <ContentFicha title="Aparência" formData={formData}>
              <Characteristic
                formData={formData}
                handleChange={handleChange}
                textFields={textFieldsCharacter.campAparencia}
              />
            </ContentFicha>

            <ContentFicha title="Personalidade" formData={formData}>
              <Characteristic
                formData={formData}
                handleChange={handleChange}
                textFields={textFieldsCharacter.campPersonalidade}
              />
            </ContentFicha>
          </div>
        </div>
        <div className={classStyled.resistencia_foto}>
          <ContentFicha title="Nome do Personagem" formData={formData}>
            <InputFicha
              type="text"
              formData={formData}
              name="informacoes.nome_personagem"
              value={formData.informacoes?.nome_personagem}
              onChange={handleChange}
            />
          </ContentFicha>

          <ContentFicha formData={formData}>
            <ImageCharacter formData={formData} setFormData={setFormData} /> 
          </ContentFicha>
        </div>
        <div className={classStyled.atri_peri}>
          <Attributes
            textFields={textFieldsCharacter.camposAtributos}
            handleChange={handleChange}
            formData={formData}
          />

          <ContentFicha title="perícias" formData={formData}>
            <Pericias
              setFormData={setFormData}
              formData={formData}
              calcularPer={calcularPer}
            />
          </ContentFicha>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className={classStyled.informacoes_perso + " box"}>
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
            </div> */
}
{
  /* <div className={classStyled.status}>
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
            </div> */
}

{
  /* <div className={classStyled.caracteristica + " box"}>
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
            </div> */
}
{
  /* <div className={classStyled.atributos}>
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
          </div> */
}

{
  /* <div className={classStyled.pericias + " box"}>

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
          </div> */
}
