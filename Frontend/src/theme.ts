import type { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#2dd4bf" : "#0f172a", // Teal for dark, Deep Slate for light
        dark: mode === "dark" ? "#14b8a6" : "#020617",
        light: mode === "dark" ? "#5eead4" : "#1e293b",
      },
      secondary: {
        main: mode === "dark" ? "#3b82f6" : "#2563eb", // Vibrant blue for dark, Pro blue for light
        dark: mode === "dark" ? "#2563eb" : "#1d4ed8",
        light: mode === "dark" ? "#60a5fa" : "#3b82f6",
      },
      background: {
        default: mode === "dark" ? "#020617" : "#f1f5f9", // Slate-950 : Slate-100
        paper: mode === "dark" ? "#0f172a" : "#ffffff", // Slate-900 : White
      },
      text: {
        primary: mode === "dark" ? "#f8fafc" : "#0f172a", // Slate-50 : Slate-900
        secondary: mode === "dark" ? "#94a3b8" : "#475569", // Slate-400 : Slate-600
      },
      divider:
        mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.08)",
    },
    typography: {
      fontFamily:
        '"Inter", "system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "dark"
                ? "rgba(15, 23, 42, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            boxShadow: "none",
            borderBottom:
              mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.05)"
                : "1px solid rgba(0, 0, 0, 0.05)",
          },
        },
      },
    },
  });
