import FichaRPG from "../../components/ficha";

export default async function Ficha({ params }) {
  const { slug } = params;
  return <FichaRPG idFicha={slug} />;
}
