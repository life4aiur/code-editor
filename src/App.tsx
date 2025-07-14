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
    <div className="app-body">
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
            <div className="live-preview-flex">
              <LivePreview
                ref={iframeRef}
                htmlCode={htmlCode}
                jsCode={jsCode}
                cssCode={cssCode}
                onUpload={e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    try {
                      const content = JSON.parse(e.target?.result as string);
                      setCssCode(content.css || "");
                      setHtmlCode(content.html || "");
                      setJsCode(content.javascript || "");
                    } catch (err) {
                      console.error("Failed to parse file:", err);
                    }
                  };
                  reader.readAsText(file);
                }}
                onSave={() => {
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
              />
            </div>
            <div className="console-section">
              <Console iframeRef={iframeRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
