

import { forwardRef, useEffect } from "react";
import Save from '../assets/save.svg';
import Upload from '../assets/upload.svg';
import { useCodeEditorStore } from "../context/CodeEditorStore";
import './LivePreview.scss';

type LivePreviewProps = {
  htmlCode: string;
  jsCode: string;
  cssCode: string;
  onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave?: () => void;
};

const LivePreview = forwardRef<HTMLIFrameElement, LivePreviewProps>(
  ({ htmlCode, jsCode, cssCode, onUpload, onSave }, ref) => {
    const { addLog } = useCodeEditorStore();
    useEffect(() => {
      // Listen for console messages from iframe
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'console') {
          addLog(event.data.level, event.data.message);
        }
      };
      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }, [addLog]);

    // Prepare srcdoc for iframe
    const srcdoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/node_modules/@symplr-ux/alloy-components/dist/symplr-stencil-components/symplr-stencil-components.esm.js"></script>
          <link rel="stylesheet" type="text/css" href="/node_modules/@symplr-ux/alloy-icons/dist/icons.min.css">
          <link rel="stylesheet" type="text/css" href="/node_modules/@symplr-ux/alloy-theme/dist/fonts/lato.min.css">
          <link rel="stylesheet" type="text/css" href="/node_modules/@symplr-ux/alloy-theme/dist/css/sympl-theme.min.css">
          <style>
            body { padding: 0.5rem; }
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script type="text/javascript">
            (function() {
              const sendToParent = (level, ...args) => {
                window.parent.postMessage({ type: 'console', level, message: args.map(a => {
                  try { return typeof a === 'string' ? a : JSON.stringify(a); } catch { return String(a); }
                }).join(' ') }, '*');
              };
              console.log = (...args) => sendToParent('log', ...args);
              console.error = (...args) => sendToParent('error', ...args);
              ${jsCode.replace(/function\s+(\w+)/g, "window.$1 = function")}
            })();
          </script>
        </body>
      </html>
    `;

    return (
      <div className="live-preview-outer">
        <div className="live-preview-header">
          <span className="live-preview-title">Live Preview</span>
          <div className="live-preview-header-actions">
            <input
              type="file"
              id="live-load-file"
              className="file-input-hidden"
              accept=".json"
              onChange={onUpload}
            />
            <button
              onClick={() => document.getElementById("live-load-file")?.click()}
              className="app-btn"
              aria-label="Load file"
            >
              <img src={Upload} alt="Upload" />
            </button>
            <button
              id="live-save-button"
              onClick={onSave}
              className="app-btn"
              aria-label="Save file"
            >
              <img src={Save} alt="Save" />
            </button>
          </div>
        </div>
        <iframe
          ref={ref}
          title="Live Preview"
          className="live-preview-iframe"
          sandbox="allow-scripts"
          srcDoc={srcdoc}
        />
      </div>
    );
  }
);

export default LivePreview;
