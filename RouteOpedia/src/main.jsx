import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SampleDemo from "./components/hooks/SampleDemo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SampleDemo />
  </StrictMode>,
);
