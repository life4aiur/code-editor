import { useState, useRef } from "react";
import CodeEditor from "./components/CodeEditor";
import CSSEditor from "./components/CSSEditor";
import JavaScriptEditor from "./components/JavaScriptEditor";
import LivePreview from "./components/LivePreview";
import Console from "./components/Console";

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
  const [jsCode, setJsCode] = useState("// Your JavaScript here");
  const [cssCode, setCssCode] = useState("/* Your CSS here */");

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <div className="w-1/2 flex flex-col">
          <div className="h-1/3">
            <CodeEditor code={htmlCode} onChange={setHtmlCode} />
          </div>
          <div className="h-1/3">
            <JavaScriptEditor code={jsCode} onChange={setJsCode} />
          </div>
          <div className="h-1/3">
            <CSSEditor code={cssCode} onChange={setCssCode} />
          </div>
        </div>
        <div className="w-1/2">
          <LivePreview ref={iframeRef} htmlCode={htmlCode} jsCode={jsCode} cssCode={cssCode} />
        </div>
      </div>
      <div className="h-48">
        <Console iframeRef={iframeRef} />
      </div>
    </div>
  );
}

export default App;
