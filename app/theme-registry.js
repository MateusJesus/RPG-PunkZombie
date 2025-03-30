"use client";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0c0c0c",
    },
    secondary: {
      main: "#76b95f",
    },
    error: {
      main: "#cd2e2e",
    },
  },
});

export default function ThemeRegistry({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
