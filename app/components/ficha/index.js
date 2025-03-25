"use client";

import { useState } from "react";
import Character from "./Character";
import Inventory from "./Inventory";

export default function FichaRPG() {
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
    proficiencia: [],
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

  const handleProfAdd = () => {
    setFormData({
      ...formData,
      proficiencia: [...formData.proficiencia, ""],
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    console.log(formData);
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
        <Inventory
          handleChange={handleChange}
          handleProfAdd={handleProfAdd}
          formData={formData}
        />
      </form>
    </div>
  );
}
