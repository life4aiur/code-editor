import { useRef, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import Console from "./components/Console";
import CSSEditor from "./components/CSSEditor";
import JavaScriptEditor from "./components/JavaScriptEditor";
import LivePreview from "./components/LivePreview";
import "./splitter.css";

function App() {
  // Multi-expand accordion: each editor can be expanded/collapsed independently
  const [expanded, setExpanded] = useState({ html: true, js: true, css: true });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello, world!</h1>");
  const [jsCode, setJsCode] = useState("// Your JavaScript here");
  const [cssCode, setCssCode] = useState("/* Your CSS here */");
  // Splitter state
  const [editorColWidth, setEditorColWidth] = useState(50); // percent
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ...existing code...

  // Splitter drag logic: attach listeners only while dragging
  const onMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const minPx = 300;
    const minEditorPercent = (minPx / rect.width) * 100;
    const maxEditorPercent = 100 - minEditorPercent;
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    percent = Math.max(minEditorPercent, Math.min(maxEditorPercent, percent));
    setEditorColWidth(percent);
  };
  const onMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    document.body.style.cursor = '';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  const onSplitterMouseDown = () => {
    isDraggingRef.current = true;
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

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
            {(() => {
              const expandedCount = [expanded.html, expanded.js, expanded.css].filter(Boolean).length;
              // Each expanded editor gets an equal share of the space
              const flexBasis = expandedCount > 0 ? `${100 / expandedCount}%` : '0%';
              return (
                <>
                  <div
                    className="editor-section"
                    style={expanded.html
                      ? { flex: `1 1 ${flexBasis}`, minHeight: 0, overflow: 'hidden' }
                      : { flex: '0 0 auto', minHeight: 0, maxHeight: 40, overflow: 'hidden' }}
                  >
                    <CodeEditor
                      code={htmlCode}
                      onChange={setHtmlCode}
                      expanded={expanded.html}
                      onExpand={() => setExpanded(e => ({ ...e, html: !e.html }))}
                    />
                  </div>
                  <div
                    className="editor-section"
                    style={expanded.js
                      ? { flex: `1 1 ${flexBasis}`, minHeight: 0, overflow: 'hidden' }
                      : { flex: '0 0 auto', minHeight: 0, maxHeight: 40, overflow: 'hidden' }}
                  >
                    <JavaScriptEditor
                      code={jsCode}
                      onChange={setJsCode}
                      expanded={expanded.js}
                      onExpand={() => setExpanded(e => ({ ...e, js: !e.js }))}
                    />
                  </div>
                  <div
                    className="editor-section"
                    style={expanded.css
                      ? { flex: `1 1 ${flexBasis}`, minHeight: 0, overflow: 'hidden' }
                      : { flex: '0 0 auto', minHeight: 0, maxHeight: 40, overflow: 'hidden' }}
                  >
                    <CSSEditor
                      code={cssCode}
                      onChange={setCssCode}
                      expanded={expanded.css}
                      onExpand={() => setExpanded(e => ({ ...e, css: !e.css }))}
                    />
                  </div>
                </>
              );
            })()}
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
