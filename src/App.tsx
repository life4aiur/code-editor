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
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
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
        <div className="flex gap-2">
          <button
            onClick={() => setShowExplorer((prev) => !prev)}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white"
          >
            {showExplorer ? "Hide" : "Show"} Explorer
          </button>
          <button
            id="save-button"
            onClick={() => {/* TODO */}}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white"
          >
            Save
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
