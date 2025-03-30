"use client";

import { useEffect, useState, useCallback } from "react";
import Character from "./Character";
import { redirect } from "next/navigation";

const BASE_URL = "http://localhost/RPG_punkzombie";

const initialState = () => ({
  usuario: "",
  data_hora: "",
  carga: "",
  imagem: null,
  informacoes: {
    nome_jogador: "",
    nome_personagem: "",
    variante: "",
    origem: "",
    classe: "",
    resistencia: "",
  },
  status: {
    status_niv: "",
    status_sta: "",
    status_statot: "",
    status_pdi: "",
    status_pditot: "",
    status_pdv: "",
    status_pdvtot: "",
  },
  caracteristicas: {
    aparencia: "",
    personalidade: "",
  },
  atributos: {
    atri_for: "",
    atri_int: "",
    atri_agi: "",
    atri_vig: "",
    atri_car: "",
  },
  pericias: [],
  equipamentos: [],
  vestimentas: [],
  armas: [],
  proficiencia: [],
  defesa: {
    defesatot: 10,
  },
  camp1_camp2: {
    titleCamp1: "",
    textCamp1: "",
    titleCamp2: "",
    textCamp2: "",
  },
  camp3: [],
  camp4: [],
});

export default function FichaRPG({ idFicha }) {
  const [formData, setFormData] = useState(() => initialState(idFicha));
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const keys = name.split(".");
      let updatedData = { ...prevData };

      let temp = updatedData;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]] = { ...temp[keys[i]] };
      }
      temp[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        imagem: imageURL,
      }));

      // Revoga a URL quando não for mais necessária
      return () => URL.revokeObjectURL(imageURL);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    //setLoading(true);
    let id_ficha_criada;
    console.log(formData);
    
    // fetch(`${BASE_URL}/${idFicha ? "editFicha.php" : "postFicha.php"}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     id_ficha: idFicha,
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => {
    //     if (!response.ok) throw new Error("Falha ao enviar a ficha");
    //     return response.json();
    //   })
    //   .then((result) => {
    //     console.log(result.status);
    //     id_ficha_criada = result.id_ficha;
    //   })
    //   .catch((error) => {
    //     console.error("Erro ao enviar a ficha:", error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //     if (!idFicha && id_ficha_criada) {
    //       redirect("/ficha/" + id_ficha_criada);
    //     }
    //   });
  };

  useEffect(() => {
    if (!idFicha) return;

    fetch(`${BASE_URL}/getInfo.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        id_ficha: idFicha,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Falha ao obter os dados");
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.warn(data.error);
        } else {
          setFormData(data);
        }
      })
      .catch((error) => console.error("Erro:", error))
      .finally(() => setLoading(false));
  }, [idFicha]);

  return (
    <div>
      <form onSubmit={submitForm}>
        <button type="submit" className="botaoAdicionar">
          {idFicha
            ? loading
              ? "Editando..."
              : "Editar"
            : loading
            ? "Enviando..."
            : "Enviar"}
        </button>
        {!loading && (
          <Character
            handleImageChange={handleImageChange}
            handleChange={handleChange}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {/* <Inventory
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        /> */}
      </form>
    </div>
  );
}
