"use client";

import classStyled from "./removeItem.module.css";
import { VscDash } from "react-icons/vsc";

export default function RemoveItem({ formData, type, onClick }) {
  const fungo = formData?.customize?.fungo;
  const tema = formData?.customize?.tema;
  const color = formData?.customize?.color;

  return (
    <button
      style={{
        backgroundColor:
          tema === "fungo"
            ? `hsla(${fungo}deg 100%, 50%, 0.3)`
            : color.color_box_title,
        fontFamily: tema === "fungo" ? "abibas" : "",
      }}
      onClick={onClick}
      type={type}
      className={classStyled.remove_item}
    >
      <VscDash />
    </button>
  );
}
