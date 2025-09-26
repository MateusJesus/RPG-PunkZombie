"use client";

import { useParams } from "next/navigation";

import FichaRPG from "@/app/components/FichaRPG";

export default function FichaPage() {
  
  const { id } = useParams();

  return (
    <section>
      <FichaRPG idFicha={id} />
    </section>
  );
}
