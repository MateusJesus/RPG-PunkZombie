"use client";

import ItemFicha from "./ItemFicha";

export default function ListFicha({ datas }) {
  return (
    <section>
      <ul
        style={{
          marginTop: 20,
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap", 
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {datas.length > 0 ? (
          datas.map((data, index) => (
            <li key={data.id + index}>
              <ItemFicha data={data} />
            </li>
          ))
        ) : (
          <p>Não tem fichas aqui ainda...</p>
        )}
      </ul>
    </section>
  );
}
