import { useState } from "react";
import "./App.css";
import CodeEditor from "./components/CodeEditor";
import LivePreview from "./components/LivePreview";

function App() {
  const [code, setCode] = useState("<p>Hello</p>");

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-1">
          <CodeEditor
            code={code}
            onChange={(newCode) => {
              setCode(newCode);
            }}
          />
        </div>
        <div className="flex-1">
          <LivePreview code={code} />
        </div>
      </div>
    </>
  );
}

export default App;
