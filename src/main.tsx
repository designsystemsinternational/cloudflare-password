import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./styles/fonts.css";
import "./styles/reset.css";
import "./styles/breakpoints.css";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/textStyles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
