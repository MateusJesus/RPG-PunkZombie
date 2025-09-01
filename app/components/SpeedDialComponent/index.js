"use client";

import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

export default function SpeedDialComponent({
  SpeedDialActions,
  openSpeedDial,
  setOpenSpeedDial,
  saved,
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
          bgcolor: saved ? "secondary.main" : "red",
          color: "dark",
          "&:hover": {
            bgcolor: saved ? "secondary.dark" : "red",
            transform: "scale(1.1)",
            animation: saved ? "none" : "pulseHover 0.8s infinite",
          },
          ...(saved
            ? {}
            : {
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(1)",
                    boxShadow: "0 0 0 0 rgba(255,0,0,0.7)",
                  },
                  "70%": {
                    transform: "scale(1.05)",
                    boxShadow: "0 0 0 10px rgba(255,0,0,0)",
                  },
                  "100%": {
                    transform: "scale(1)",
                    boxShadow: "0 0 0 0 rgba(255,0,0,0)",
                  },
                },
                "@keyframes pulseHover": {
                  "0%": {
                    transform: "scale(1.05)",
                    boxShadow: "0 0 0 0 rgba(255,0,0,0.9)",
                  },
                  "70%": {
                    transform: "scale(1.15)",
                    boxShadow: "0 0 0 12px rgba(255,0,0,0)",
                  },
                  "100%": {
                    transform: "scale(1.05)",
                    boxShadow: "0 0 0 0 rgba(255,0,0,0)",
                  },
                },
              }),
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
            bgcolor:
              action.name === "Save"
                ? saved
                  ? "secondary.main"
                  : "red"
                : "secondary.main",
            "&:hover": {
              bgcolor:
                action.name === "Save"
                  ? saved
                    ? "secondary.main"
                    : "red"
                  : "secondary.dark",
              transform: "scale(1.1)",
              animation:
                action.name === "Save" && !saved
                  ? "pulseHover 0.8s infinite"
                  : "none",
            },
            ...(action.name === "Save" && !saved
              ? {
                  animation: "pulse 1.5s infinite",
                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(1)",
                      boxShadow: "0 0 0 0 rgba(255,0,0,0.7)",
                    },
                    "70%": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 0 10px rgba(255,0,0,0)",
                    },
                    "100%": {
                      transform: "scale(1)",
                      boxShadow: "0 0 0 0 rgba(255,0,0,0)",
                    },
                  },
                  "@keyframes pulseHover": {
                    "0%": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 0 0 rgba(255,0,0,0.9)",
                    },
                    "70%": {
                      transform: "scale(1.15)",
                      boxShadow: "0 0 0 12px rgba(255,0,0,0)",
                    },
                    "100%": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 0 0 rgba(255,0,0,0)",
                    },
                  },
                }
              : {}),
          }}
        />
      ))}
    </SpeedDial>
  );
}
