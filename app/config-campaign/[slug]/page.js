"use client";

import { use } from "react";
import LoadingPage from "@/app/components/Loading";
import { useAuth } from "@/app/contexts/AuthContext";
import ConfigCampaignComponent from "@/app/components/CampaignsRPG/ConfigCampaignComponent";

export default function ConfigCampaign(props) {
  const { loadingPage } = useAuth();

  if (loadingPage) return <LoadingPage />;

  const { slug } = use(props.params);

  return (
    <section>
      <ConfigCampaignComponent idCampanha={slug} />;
    </section>
  );
}
