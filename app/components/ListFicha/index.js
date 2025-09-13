"use client";

import ItemFicha from "./ItemFicha";

export default function ListFicha({ datas }) {
  return (
    <section>
      <ul
        style={{
          marginTop: 20,
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {datas.length > 0 ? (
          datas.map((data, index) => {
            return (
              <li
                style={{
                  margin: "0 0 20px  0",
                }}
                key={data.id + index}
              >
                <ItemFicha data={data} />
              </li>
            );
          })
        ) : (
          <p>Não tem fichas aqui ainda...</p>
        )}
      </ul>
    </section>
  );
}
