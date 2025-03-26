"use client";

import classStyled from "./removeItem.module.css";
import { VscDash } from "react-icons/vsc";

export default function RemoveItem({ type, onClick }) {
  return (
    <button onClick={onClick} type={type} className={classStyled.remove_item}>
      <VscDash />
    </button>
  );
}
