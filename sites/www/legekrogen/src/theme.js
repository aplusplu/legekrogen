import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === "light" ? "#5e35b1" : "#90caf9" },
      secondary: { main: mode === "light" ? "#00bfa5" : "#f48fb1" },
      background: {
        default: mode === "light" ? "#f7f7fb" : "#0f1115",
        paper: mode === "light" ? "#ffffff" : "#12151b",
      },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: { overflow: "hidden" },
        },
      },
      MuiContainer: {
        defaultProps: { maxWidth: "lg" },
      },
    },
  });
