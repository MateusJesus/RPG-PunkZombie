"use client";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0c0c0c",
    },
    secondary: {
      main: "#76b95f",
    },
    error: {
      main: "#989898",
    },
  },
});

export default function ThemeRegistry({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
