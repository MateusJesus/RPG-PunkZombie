"use client";
import RemoveItem from "../../Buttons/RemoveItem";
import classStyled from "./inventario.module.css";
import { FaTrash } from "react-icons/fa";

export default function Inventory({ handleChange, formData, setFormData }) {
  const changeProficiencia = (e, index) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedProficiencia = prevFormData.proficiencias.map(
        (prof, idx) => {
          if (idx === index) {
            return {
              ...prof,
              [name]: value,
            };
          }
          return prof;
        }
      );

      return { ...prevFormData, proficiencias: updatedProficiencia };
    });
  };

  const handleProfAdd = () => {
    setFormData({
      ...formData,
      proficiencias: [...formData.proficiencias, { proficiencia: "" }],
    });
  };

  const handleProfRemove = (index) => {
    setFormData({
      ...formData,
      proficiencias: formData.proficiencias.filter((_, idx) => idx !== index),
    });
  };

  const changeEquipamentos = (e, index) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedProficiencia = prevFormData.proficiencias.map(
        (prof, idx) => {
          if (idx === index) {
            return {
              ...prof,
              [name]: value,
            };
          }
          return prof;
        }
      );

      return { ...prevFormData, proficiencias: updatedProficiencia };
    });
  };

  const handleEquipAdd = () => {
    setFormData({
      ...formData,
      equipamentos: [
        ...formData.equipamentos,
        { qnt: "1", item: "", desc: "", carga: "0.5" },
      ],
    });
  };

  const handleEquipRemove = (index) => {
    setFormData({
      ...formData,
      equipamentos: formData.equipamentos.filter((_, idx) => idx !== index),
    });
  };

  return (
    <section className={classStyled.inventario}>
      <h1 className="title_content">inventário</h1>
      <div className={classStyled.TUDOinventario}>
        <div className={classStyled.carga_prof}>
          <div className={classStyled.carga + "+ box"}>
            <h2 className="title_content">carga</h2>
            <div className={classStyled.carga_content}>
              <p className={classStyled.res_carga}></p>
              <hr />
              <input
                type="text"
                name="cargaTotal"
                maxLength="4"
                placeholder="5"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={classStyled.proficiencia + " box"}>
            <h2 className="title_content">proficiência</h2>
            <div className={classStyled.proficiencia_content + " overflow"}>
              <table className="table">
                <thead>
                  <tr>
                    <th>proficiência</th>
                    <th className="thUltimo thNumber"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.proficiencias.map((prof, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          name="proficiencia"
                          maxLength="30"
                          value={prof.proficiencia}
                          onChange={(e) => changeProficiencia(e, index)}
                        />
                      </td>
                      <td>
                        <RemoveItem
                          onClick={() => handleProfRemove(index)}
                          type={"button"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                className="botaoAdicionar"
                type="button"
                onClick={handleProfAdd}
              >
                ADICIONAR proficiência
              </button>
            </div>
          </div>
        </div>

        <div className={classStyled.equi_arma}>
          <div className={classStyled.equipamento + " box"}>
            <h2 className="title_content">Equipamentos</h2>
            <div className={classStyled.equipamentos + " overflow"}>
              <table className="table">
                <thead>
                  <tr>
                    <th className="thNumber">Qnt.</th>
                    <th className="thName">Item</th>
                    <th className="thDesc">Descrição</th>
                    <th className="thNumber">Carga</th>
                    <th className="thUltimo thNumber">
                      <FaTrash />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.equipamentos.map((equipamento, index) => (
                    <tr key={index} id={`linhaEQUIP1_id${index}`}>
                      <td>
                        <input
                          onChange={(e) => qntEquip(index, e.target.value)}
                          value={equipamento.qnt}
                          name="qntEquip"
                          className="inputDesc"
                          maxLength="2"
                          type="text"
                          placeholder="1"
                        />
                      </td>
                      <td>
                        <input
                          maxLength="20"
                          onChange={(e) => itemEquip(index, e.target.value)}
                          value={equipamento.item}
                          name="itemEquip"
                          className="inputDesc"
                        />
                      </td>
                      <td>
                        <input
                          maxLength="50"
                          onChange={(e) => descEquip(index, e.target.value)}
                          value={equipamento.descricao}
                          name="descEquip"
                          className="inputDesc"
                        />
                      </td>
                      <td>
                        <input
                          maxLength="3"
                          onChange={(e) => cargaEquip(index, e.target.value)}
                          value={equipamento.carga}
                          name="cargaEquip"
                          className={classStyled.inputDesc}
                          type="text"
                          placeholder=".5"
                        />
                      </td>
                      <td>
                        <RemoveItem
                          type={"button"}
                          onClick={() => handleEquipRemove(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => handleEquipAdd()}
                className="botaoAdicionar"
                type="button"
              >
                ADICIONAR EQUIPAMENTO
              </button>
            </div>
          </div>

          <div className={classStyled.arma + " box"}>
            <h2 className="title_content">armas</h2>
            <div className={classStyled.arma_content + " overflow"}>
              <table className="table">
                <thead>
                  <tr>
                    <th>arma</th>
                    <th className="thDado">teste de dano</th>
                    <th className="thDado">crítico</th>
                    <th className="thDado">munição</th>
                    <th className="thNumber">carga</th>
                    <th className="thNumber thUltimo"></th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <button className="botaoAdicionar" type="button">
                ADICIONAR arma
              </button>
            </div>
          </div>
        </div>

        <div className={classStyled.vest_def}>
          <div className={classStyled.vestimenta + " box"}>
            <h2 className="title_content">vestimenta</h2>
            <div className={classStyled.vestimenta_content + "  overflow"}>
              <table className="table">
                <thead>
                  <tr>
                    <th className={classStyled.thNameVest}>roupa</th>
                    <th className={classStyled.thBonusVest}>bônus</th>
                    <th className="thNumber">carga</th>
                    <th className="thUltimo thNumber">
                      <FaTrash />
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <button className="botaoAdicionar" type="button">
                ADICIONAR roupa
              </button>
            </div>
          </div>

          <div className={classStyled.defesa + " box"}>
            <h2 className="title_content">defesa</h2>
            <div className={classStyled.defesa_content}>
              <table className="table">
                <thead>
                  <tr>
                    <th>proteção</th>
                    <th className="thNumber">def.</th>
                    <th className="thNumber">rd.</th>
                    <th className="thNumber">pena</th>
                    <th className="thNumber">carga</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        name="nomeprotecao1"
                        placeholder="Armadura"
                        maxLength="15"
                        className={classStyled.inputDesc}
                        type="text"
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="inputPontosDefesa1"
                        className={classStyled.inputDesc}
                        type="text"
                        maxLength="3"
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="inputRedDano1"
                        className={classStyled.inputDesc}
                        type="text"
                        maxLength="3"
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="inputPenaDefesa1"
                        className={classStyled.inputDesc}
                        type="text"
                        maxLength="3"
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="inputCargaDefesa1"
                        className={classStyled.inputDesc}
                        type="text"
                        maxLength="3"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        name="nomeprotecao2"
                        placeholder="Armadura"
                        maxLength="15"
                        className={classStyled.inputDesc}
                        type="text"
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="inputPontosDefesa2"
                        className={classStyled.inputDesc}
                        type="text"
                        maxLength="3"
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="inputRedDano2"
                        className={classStyled.inputDesc}
                        type="text"
                        maxLength="3"
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="inputPenaDefesa2"
                        className={classStyled.inputDesc}
                        type="text"
                        maxLength="3"
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="inputCargaDefesa2"
                        className={classStyled.inputDesc}
                        type="text"
                        maxLength="3"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className={classStyled.hrDef} />
              <div className={classStyled.defesa_res}>
                <p className={classStyled.textPenDef}>
                  Redução de Dano Sofrido:
                </p>
                <p>0</p>
              </div>
              <div className={classStyled.defesa_res}>
                <p className={classStyled.textPenDef}>
                  Penalidade total de Armadura:
                </p>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
