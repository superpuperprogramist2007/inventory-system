import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { InventoryProvider } from "./store/InventoryContext.jsx"; // ← цього рядка не вистачає

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InventoryProvider>
      <App />
    </InventoryProvider>
  </StrictMode>,
);
