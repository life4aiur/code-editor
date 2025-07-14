import { SymplIcon } from "@symplr-ux/alloy-components/dist/react-bindings";
import { useRef, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import Console from "./components/Console";
import CSSEditor from "./components/CSSEditor";
import JavaScriptEditor from "./components/JavaScriptEditor";
import LivePreview from "./components/LivePreview";

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello, world!</h1>");
  const [jsCode, setJsCode] = useState("// Your JavaScript here");
  const [cssCode, setCssCode] = useState("/* Your CSS here */");

  return (
    <>
      <div
        className="app-header"
      >
        <h1 className="app-title">
          <SymplIcon name="si-symplr" color="light" /> Alloy Sandbox
        </h1>
        <div className="app-header-actions">
          <input
            type="file"
            id="load-file"
            className="file-input-hidden"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onload = (e) => {
                try {
                  const content = JSON.parse(e.target?.result as string);

                  // Set CSS code for both modes
                  setCssCode(content.css || "");

                  // HTML mode: set HTML and JS code
                  setHtmlCode(content.html || "");
                  setJsCode(content.javascript || "");

                } catch (err) {
                  console.error("Failed to parse file:", err);
                }
              };
              reader.readAsText(file);
            }}
          />
          <button
            onClick={() => document.getElementById("load-file")?.click()}
            className="app-header-btn"
            aria-label="Load file"
          >
            <SymplIcon name="si-upload" color="light" />
          </button>
          <button
            id="save-button"
            onClick={() => {
              const content = {
                html: htmlCode,
                javascript: jsCode,
                css: cssCode,
              };

              const blob = new Blob([JSON.stringify(content, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "sandbox-state.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="app-header-btn"
          >
            <SymplIcon name="si-save" color="light" />
          </button>
        </div>
      </div>
      <div
        className="app-body"
      >
        <div className="app-main">
          <div className="app-editors-row">
            <div className="app-editors-col">
              <>
                <div className="editor-section">
                  <CodeEditor
                    code={htmlCode}
                    onChange={setHtmlCode}
                  />
                </div>
                <div className="editor-section">
                  <JavaScriptEditor code={jsCode} onChange={setJsCode} />
                </div>
                <div className="editor-section">
                  <CSSEditor code={cssCode} onChange={setCssCode} />
                </div>
              </>
            </div>
            <div className="preview-section">
              <LivePreview
                ref={iframeRef}
                htmlCode={htmlCode}
                jsCode={jsCode}
                cssCode={cssCode}
              />
            </div>
          </div>
          <div className="console-section">
            <Console iframeRef={iframeRef} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
