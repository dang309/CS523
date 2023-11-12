import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { TourProvider } from "@reactour/tour";

import { StyledEngineProvider } from "@mui/material/styles";
import { steps } from "./utils/common.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <TourProvider steps={steps}>
        <App />
      </TourProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
