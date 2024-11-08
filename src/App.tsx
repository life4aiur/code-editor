import { SymplIcon } from "@symplr-ux/alloy-components/dist/react-bindings";
import { useRef, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import ComponentExplorer from "./components/ComponentExplorer";
import Console from "./components/Console";
import CSSEditor from "./components/CSSEditor";
import JavaScriptEditor from "./components/JavaScriptEditor";
import LivePreview from "./components/LivePreview";

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello, world!</h1>");
  const [jsCode, setJsCode] = useState("// Your JavaScript here");
  const [cssCode, setCssCode] = useState("/* Your CSS here */");
  const [showExplorer, setShowExplorer] = useState(true);

  const onUpdateJavaScript = (newCode: string) => {
    setJsCode((prevCode) => {
      // If there's existing code, add newline before appending
      return prevCode ? `${prevCode}\n\n${newCode}` : newCode;
    });
  };

  return (
    <>
      <div
        id="headerguy"
        className="h-12 fixed top-0 w-full flex items-center px-4 py-2 justify-between bg-gray-800 text-white"
      >
        <h1 className="text-white flex items-center gap-2 text-xl">
          <SymplIcon name="si-symplr" color="light" /> Alloy Sandbox
        </h1>
        <div className="flex gap-4">
          <label
            id="toggle-explorer-button"
            className="inline-flex items-center cursor-pointer"
          >
            <span className="mr-2 text-sm">Explorer mode</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showExplorer}
                onChange={() => setShowExplorer((prev) => !prev)}
              />
              <div
                className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600
                peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px]
                after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5
                after:transition-all"
              ></div>
            </div>
          </label>
          <input
            type="file"
            id="load-file"
            className="hidden"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onload = (e) => {
                try {
                  const content = JSON.parse(e.target?.result as string);
                  setHtmlCode(content.html);
                  setJsCode(content.javascript);
                  setCssCode(content.css);
                } catch (err) {
                  console.error("Failed to parse file:", err);
                }
              };
              reader.readAsText(file);
            }}
          />
          <button
            onClick={() => document.getElementById("load-file")?.click()}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white flex items-center"
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
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white flex items-center"
          >
            <SymplIcon name="si-save" color="light" />
          </button>
        </div>
      </div>
      <div
        id="bodyguy"
        className="flex h-[calc(100vh-3rem)] mt-12 border-2 border-gray-500"
      >
        {showExplorer && (
          <div className="border-r-4 border-gray-500">
            <ComponentExplorer />
          </div>
        )}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-1">
            <div className="w-1/2 flex flex-col">
              <div className="h-1/3 border-b-2 border-gray-500">
                <CodeEditor
                  code={htmlCode}
                  onChange={setHtmlCode}
                  onUpdateJavaScript={onUpdateJavaScript}
                />
              </div>
              <div className="h-1/3 border-b-2 border-gray-500">
                <JavaScriptEditor code={jsCode} onChange={setJsCode} />
              </div>
              <div className="h-1/3">
                <CSSEditor code={cssCode} onChange={setCssCode} />
              </div>
            </div>
            <div className="w-1/2 border-l-2 border-gray-500">
              <LivePreview
                ref={iframeRef}
                htmlCode={htmlCode}
                jsCode={jsCode}
                cssCode={cssCode}
              />
            </div>
          </div>
          <div className="h-48 border-t-2 border-gray-500">
            <Console iframeRef={iframeRef} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
