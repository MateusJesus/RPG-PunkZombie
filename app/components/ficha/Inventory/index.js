"use client";

export default function Inventory({ handleChange , handleProfAdd, formData}) {

  return (
    <section id="inventario" className="section inventario">
      <h1 className="title_content">Inventário</h1>
      <div className="TUDOinventario">
        <div className="carga_prof">
          <div className="carga box">
            <h2 className="title_content">Carga</h2>
            <div className="carga_content">
              <p className="res_carga" id="res_carga"></p>
              <hr />
              <input
                type="text"
                name="cargaTotal"
                id="carga_total"
                value={formData.cargaTotal}
                onChange={handleChange}
                maxLength="4"
                placeholder="5"
              />
            </div>
          </div>
          <div className="proficiencia box">
            <h2 className="title_content">Proficiência</h2>
            <div
              id="proficienciaScroll"
              className="proficiencia_content overflow"
            >
              <table className="table">
                <thead>
                  <tr>
                    <th>Proficiência</th>
                    <th className="thUltimo thNumber"></th>
                  </tr>
                </thead>
                <tbody id="tbodyProf">
                  {formData.proficiencia.map((prof, index) => (
                    <tr key={index}>
                      <td>{prof}</td>
                      <td>
                        <div className="menos">
                          <i className="fa fa-minus"></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a className="botaoAdicionar" onClick={handleProfAdd}>
                ADICIONAR PROFICIÊNCIA
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
