import { useRef, useState } from "react";
import EditorsColumn from "./components/EditorsColumn";
import PreviewSection from "./components/PreviewSection";
import { useSplitter } from "./hooks/useSplitter";
import "./splitter.scss";

function App() {
  // Multi-expand accordion: each editor can be expanded/collapsed independently
  const [expanded, setExpanded] = useState({ html: true, js: true, css: true });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello, world!</h1>");
  const [jsCode, setJsCode] = useState("// Your JavaScript here");
  const [cssCode, setCssCode] = useState("/* Your CSS here */");
  // Splitter state via custom hook
  const {
    editorColWidth,
    isDragging,
    containerRef,
    onSplitterMouseDown,
  } = useSplitter(50);

  // ...existing code...

  // Splitter drag logic is now handled by useSplitter

  // ...existing code...

  return (
    <div className="app-body">
      {isDragging && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            cursor: 'col-resize',
            background: 'transparent',
          }}
        />
      )}
      <div className="app-main" style={{ height: '100vh', minHeight: 0 }}>
        <div className="app-editors-row" ref={containerRef} style={{ height: '100%', minHeight: 0 }}>
          <div
            className="app-editors-col"
            style={{
              width: `${editorColWidth}%`,
              height: '100%',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <EditorsColumn
              htmlCode={htmlCode}
              setHtmlCode={setHtmlCode}
              jsCode={jsCode}
              setJsCode={setJsCode}
              cssCode={cssCode}
              setCssCode={setCssCode}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          </div>
          <div
            className="splitter"
            onMouseDown={onSplitterMouseDown}
            style={{ cursor: 'col-resize', width: 6, background: '#444c5e', zIndex: 2 }}
          />
          <div
            className="preview-section"
            style={{ width: `${100 - editorColWidth}%` }}
          >
            <PreviewSection
              iframeRef={iframeRef}
              htmlCode={htmlCode}
              jsCode={jsCode}
              cssCode={cssCode}
              setHtmlCode={setHtmlCode}
              setJsCode={setJsCode}
              setCssCode={setCssCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
