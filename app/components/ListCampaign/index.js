"use client";

import { useMediaQuery } from "@mui/material";
import ItemCampaign from "./ItemCampaign";

export default function ListCampaign({ datas }) {
  const isMobile = useMediaQuery("(max-width:1100px)");

  return (
    <section>
      <ul
        style={{
          marginTop: 20,
          listStyle: "none",
          minWidth: "100%",
          columnCount: !isMobile ? "2" : 1,
        }}
      >
        {datas.length > 0 ? (
          datas.map((data, index) => (
            <li
              style={{
                marginBottom: 20,
              }}
              key={data.id + index}
            >
              <ItemCampaign data={data} />
            </li>
          ))
        ) : (
          <p>Não tem campanhas criadas por aqui ainda...</p>
        )}
      </ul>
    </section>
  );
}
