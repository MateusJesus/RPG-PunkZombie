"use client";

import ItemCampaign from "./ItemCampaign";

export default function ListCampaign({ datas }) {
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
