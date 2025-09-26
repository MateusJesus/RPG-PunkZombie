import { use } from "react";
import FichaRPG from "../../components/FichaRPG";

export default function Ficha({ params }) {
  const { slug } = use(params); // ✅ resolve a Promise
  return <FichaRPG idFicha={slug} />;
}
