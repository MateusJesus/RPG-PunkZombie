"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import FichaRPG from "../../components/ficha";
import { useAuth } from "../../contexts/AuthContext";
import LoadingPage from "@/app/components/Loading";

export default function Ficha(props) {
  const { user, loadingPage } = useAuth();

  if (loadingPage) return <LoadingPage />;

  const { slug } = use(props.params);

  return <FichaRPG idFicha={slug} />;
}
