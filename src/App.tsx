import { useState } from "react";
import EditorsColumn from "./components/EditorsColumn";
import PreviewSection from "./components/PreviewSection";
import { CodeEditorStoreProvider } from "./context/CodeStoreContext";
import { useSplitter } from "./hooks/useSplitter";
import "./splitter.scss";

function AppInner() {
  const [expanded, setExpanded] = useState({ html: true, js: true, css: true });
  const {
    editorColWidth,
    isDragging,
    containerRef,
    onSplitterMouseDown,
  } = useSplitter(50);

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
            <PreviewSection />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <CodeEditorStoreProvider>
      <AppInner />
    </CodeEditorStoreProvider>
  );
}

export default App;
