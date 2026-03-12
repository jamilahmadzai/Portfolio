import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { ColorModeProvider } from "./context/ThemeContext";
import "./i18n/config";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
      <CssBaseline />
      <App />
    </ColorModeProvider>
  </StrictMode>,
);
