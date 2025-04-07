"use client";

import { useRouter } from "next/navigation";
import FichaRPG from "../components/FichaRPG";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import LoadingPage from "../components/Loading";

export default function Ficha() {
  const { user, loadingPage } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loadingPage) {
      router.push("/");
    }
  }, [user, loadingPage, router]);

  if (loadingPage) return <LoadingPage />;

  if (!user) return null;
  return <FichaRPG />;
}
