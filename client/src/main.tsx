import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import ErrorFallback from "./components/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      onReset={() => {
        window.location.reload();
      }}
      fallbackRender={ErrorFallback}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
