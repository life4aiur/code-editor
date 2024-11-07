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

  const onUpdateJavaScript = (newCode: string) => {
    setJsCode((prevCode) => {
      // If there's existing code, add newline before appending
      return prevCode ? `${prevCode}\n\n${newCode}` : newCode;
    });
  };

  return (
    <div className="flex h-screen">
      <ComponentExplorer />
      <div className="flex-1 flex flex-col">
        <div className="flex flex-1">
          <div className="w-1/2 flex flex-col">
            <div className="h-1/3">
              <CodeEditor
                code={htmlCode}
                onChange={setHtmlCode}
                onUpdateJavaScript={onUpdateJavaScript}
              />
            </div>
            <div className="h-1/3">
              <JavaScriptEditor code={jsCode} onChange={setJsCode} />
            </div>
            <div className="h-1/3">
              <CSSEditor code={cssCode} onChange={setCssCode} />
            </div>
          </div>
          <div className="w-1/2">
            <LivePreview
              ref={iframeRef}
              htmlCode={htmlCode}
              jsCode={jsCode}
              cssCode={cssCode}
            />
          </div>
        </div>
        <div className="h-48">
          <Console iframeRef={iframeRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
