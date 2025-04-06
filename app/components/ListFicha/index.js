"use client";

import ItemFicha from "./ItemFicha";

export default function ListFicha({ datas, lastRef }) {
  return (
    <section>
      <ul
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "20px",
          listStyle: "none",
        }}
      >
        {datas.length > 0 ? (
          datas.map((data, index) => {
            const isLast = index === datas.length - 1;
            return (
              <li key={data.id} ref={isLast ? lastRef : null}>
                <ItemFicha data={data} />
              </li>
            );
          })
        ) : (
          <p>Não tem fichas ainda, vamos criar uma?</p>
        )}
      </ul>
    </section>
  );
}
