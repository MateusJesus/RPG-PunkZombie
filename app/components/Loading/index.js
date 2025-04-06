"use client";
import { Alert, Backdrop, CircularProgress } from "@mui/material";

export default function LoadingPage() {
  return (
    <section>
      <Backdrop sx={{ color: "#fff", zIndex: 999 }} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
}
