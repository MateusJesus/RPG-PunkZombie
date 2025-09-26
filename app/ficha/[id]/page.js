// app/ficha/[slug]/page.js
import { use } from "react";
import FichaClient from "./FichaClient";

export default function FichaPage({ params }) {
  const { slug } = use(params); // resolve a Promise no server
  return <FichaClient slug={slug} />;
}
