import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { TourProvider } from "@reactour/tour";

import { StyledEngineProvider } from "@mui/material/styles";

export const steps = [
  {
    selector: ".manipulation-btns",
    content: "Add/Delete/Transform rows & columns",
    padding: {
      mask: 0,
    },
  },
  {
    selector: ".generate-maze-btn",
    content: "Generate obstacles automatically",
  },
  {
    selector: ".algo-options",
    content: "Choose algorithm to visualize",
  },
  {
    selector: ".start-btn",
    content: "Run visualization",
  },
  {
    selector: ".upload-btn",
    content: "Upload image to process",
  },
  {
    selector: ".reset-btn",
    content: "Reset image to original color",
  },
  {
    selector: ".remove-btn",
    content: "Remove image",
  },
  {
    selector: ".grayscale-btn",
    content: "Grayscale image",
  },
  {
    selector: ".warm-btn",
    content: "Enhance image warmer",
  },
  {
    selector: ".cool-btn",
    content: "Enhance image cooler",
  },
  {
    selector: ".board",
    content: "2D array for visualization",
  },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <TourProvider steps={steps}>
        <App />
      </TourProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
