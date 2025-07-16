import { createRoot } from "react-dom/client";
import App from "./App";

// Expose a global constructor for embedding
(window as any).CodeEditor = function (selector: string, options?: any) {
  const el =
    typeof selector === "string"
      ? document.querySelector(selector)
      : selector;
  if (!el) throw new Error("Container element not found");
  createRoot(el).render(<App {...options} />);
};
