"use client";

import ItemCampaign from "./ItemCampaign";

export default function ListCampaign({ datas }) {
  return (
    <section>
      <ul
        style={{
          marginTop: 20,
          width: "100%",
          gap: "20px",
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {datas.length > 0 ? (
          datas.map((data, index) => {
            return (
              <li key={data.id + index}>
                <ItemCampaign data={data} />
              </li>
            );
          })
        ) : (
          <p>Não tem campanhas criadas por aqui ainda...</p>
        )}
      </ul>
    </section>
  );
}
