import { createRoot } from "react-dom/client";
import App from "./App";
import './App.scss'; // Ensure global styles are included

(window as any).CodeEditor = function (
  selector: string,
  options: {
    scripts?: string[];
    styles?: string[];
    [key: string]: any;
  } = {}
) {
  const el =
    typeof selector === "string"
      ? document.querySelector(selector)
      : selector;
  if (!el) throw new Error("Container element not found");
  createRoot(el).render(
    <App
      {...options}
      iframeScripts={options.scripts || []}
      iframeStyles={options.styles || []}
    />
  );
};
