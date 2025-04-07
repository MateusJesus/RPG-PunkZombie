"use client";

import { useEffect, useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import LoadingPage from "../Loading";

export default function SpeedDialComponent({
  SpeedDialActions,
  openSpeedDial,
  setOpenSpeedDial,
  handleSpeedDialAction,
}) {
  return (
    <SpeedDial
      ariaLabel="SpeedDial controlled openSpeedDial example"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        "& .MuiFab-primary": {
          bgcolor: "secondary.main",
          color: "dark",
          "&:hover": { bgcolor: "secondary.dark" },
        },
      }}
      icon={<SpeedDialIcon />}
      onClick={() => setOpenSpeedDial((prev) => !prev)}
      open={openSpeedDial}
    >
      {SpeedDialActions.map((action) => (
        <SpeedDialAction
          key={action.name}
          name={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleSpeedDialAction(action.name)}
          sx={{
            bgcolor: "secondary.main",
            "&:hover": {
              bgcolor: "secondary.dark",
              transform: "scale(1.1)",
            },
          }}
        />
      ))}
    </SpeedDial>
  );
}
