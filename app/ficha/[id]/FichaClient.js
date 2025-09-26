// app/ficha/[slug]/FichaClient.js
"use client";

import { useAuth } from "../../contexts/AuthContext";
import FichaRPG from "../../components/FichaRPG";
import LoadingPage from "@/app/components/Loading";

export default function FichaClient({ slug }) {
  const { user, loadingPage } = useAuth();

  if (loadingPage) return <LoadingPage />;

  return <FichaRPG idFicha={slug} />;
}
