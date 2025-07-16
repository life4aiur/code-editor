import { useState } from "react";
import './App.scss';
import EditorsColumn from "./components/EditorsColumn";
import PreviewSection from "./components/PreviewSection";
import { CodeEditorStoreProvider } from "./context/CodeStoreContext";
import { useSplitter } from "./hooks/useSplitter";
import "./splitter.scss";

// Accept iframeScripts and iframeStyles as props for embedding
interface AppProps {
  iframeScripts?: string[];
  iframeStyles?: string[];
}

function AppInner({ iframeScripts = [], iframeStyles = [] }: AppProps) {
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
            width: '100%',
            height: '100%',
            zIndex: 9999,
            cursor: 'col-resize',
            background: 'transparent',
          }}
        />
      )}
      <div className="app-main" style={{ height: '100%', minHeight: 0 }}>
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
            <PreviewSection iframeScripts={iframeScripts} iframeStyles={iframeStyles} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App(props: AppProps) {
  return (
    <CodeEditorStoreProvider>
      <AppInner {...props} />
    </CodeEditorStoreProvider>
  );
}

export default App;
