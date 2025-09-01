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
  handleBlur,
  formData,
  setFormData,
  setSaved,
}) {
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
                setFormData={setFormData}
                formData={formData}
                handleBlur={handleBlur}
                textFields={textFieldsCharacter.camposInformacoes}
              />
            </ContentFicha>

            <StatusCharacter
              formData={formData}
              handleBlur={handleBlur}
              textFields={textFieldsCharacter.campsStatus}
            />
          </div>

          <div className={classStyled.carac_personagem}>
            <ContentFicha title="Aparência" formData={formData}>
              <Characteristic
                formData={formData}
                handleBlur={handleBlur}
                textFields={textFieldsCharacter.campAparencia}
              />
            </ContentFicha>

            <ContentFicha title="Personalidade" formData={formData}>
              <Characteristic
                formData={formData}
                handleBlur={handleBlur}
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
              onBlur={handleBlur}
            />
          </ContentFicha>

          <ContentFicha formData={formData}>
            <ImageCharacter formData={formData} setFormData={setFormData} />
          </ContentFicha>
        </div>
        <div className={classStyled.atri_peri}>
          <Attributes
            textFields={textFieldsCharacter.camposAtributos}
            handleBlur={handleBlur}
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
