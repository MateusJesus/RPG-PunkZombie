"use client";

import { useState } from "react";
import Character from "./Character";
import Inventory from "./Inventory";

export default function FichaRPG() {
  const Raul = {
    nomeJogador: "Mates",
    nomePersonagem: "Raul Rodrigues dos Santos",
    variante: "Mutante",
    origem: "uma ai",
    classe: "Mercenario",
    niv: "8",
    pdv: "12",
    pdvTotal: "31",
    sta: "13",
    staTotal: "41",
    pdi: "6",
    pdiTotal: 20,
    defesa: 10,
    aparencia: "bonitão\ndsad\ndsa\ndas\ndas\nd",
    personalidade:
      "\nsa\nda muito bonito ao ponto de pegar dtodas as gairnhah\nsd\nasd\nasd\nasdgalâ /n dsajdlka/ndsad",
    resistPer: "Fúngico vermelho",
    imagem: "blob:http://localhost:3000/1deea86f-9713-4971-962d-7020575563a1",
    forca: "2",
    inteligencia: "1",
    agilidade: "4",
    vigor: "1",
    carisma: "2",
    pericias: [
      {
        soma: 12,
        nomePericia: "6",
        atributoPer: "AGI",
        outros: "2",
      },
      {
        soma: 10,
        nomePericia: "3",
        atributoPer: "AGI",
        outros: 0,
      },
      {
        soma: 10,
        nomePericia: "4",
        atributoPer: "AGI",
        outros: 0,
      },
      {
        soma: 7,
        nomePericia: "10",
        atributoPer: "INT",
        outros: 0,
      },
      {
        soma: 8,
        nomePericia: "8",
        atributoPer: "CAR",
        outros: 0,
      },
    ],
    cargaTotal: "",
    proficiencia: [],
  };

  const [formData, setFormData] = useState({
    nomeJogador: "",
    nomePersonagem: "",
    variante: "",
    origem: "",
    classe: "",
    niv: "",
    pdv: "",
    pdvTotal: "",
    sta: "",
    staTotal: "",
    pdi: "",
    pdiTotal: 20,
    defesa: 10,
    aparencia: "",
    personalidade: "",
    resistPer: "",
    imagem: "",
    forca: 0,
    inteligencia: 0,
    agilidade: 0,
    vigor: 0,
    carisma: 0,
    pericias: [],
    cargaTotal: "",
    proficiencias: [],
    equipamentos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imagem: URL.createObjectURL(file),
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar a ficha");
      }
      const data = await response.json();
      setFichas((prevFichas) => [...prevFichas, data]);
      console.log("Ficha enviada com sucesso!");
    } catch (error) {
      console.log("Erro ao enviar a ficha: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => submitForm(e)}>
        <button type="submit">enviar</button>
        <Character
          handleImageChange={handleImageChange}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
        {/* <Inventory
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        /> */}
      </form>
    </div>
  );
}
