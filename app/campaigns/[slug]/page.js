"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import FichaRPG from "../../components/FichaRPG";
import { useAuth } from "../../contexts/AuthContext";
import LoadingPage from "@/app/components/Loading";
import CampaignsRPG from "@/app/components/CampaignsRPG";

export default function Campaign(props) {
  const { loadingPage } = useAuth();

  if (loadingPage) return <LoadingPage />;

  const { slug } = use(props.params);

  return (
    <section>
      <CampaignsRPG idCampaigns={slug} />
    </section>
  );
}
