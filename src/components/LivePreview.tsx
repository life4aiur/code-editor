
import { SymplIcon } from "@symplr-ux/alloy-components/dist/react-bindings";
import { forwardRef, useEffect } from "react";
import './LivePreview.css';

type LivePreviewProps = {
  htmlCode: string;
  jsCode: string;
  cssCode: string;
  onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave?: () => void;
};

const LivePreview = forwardRef<HTMLIFrameElement, LivePreviewProps>(
  ({ htmlCode, jsCode, cssCode, onUpload, onSave }, ref) => {
    const iframeRef = ref as React.RefObject<HTMLIFrameElement>;

    useEffect(() => {
      const init = async () => {
        if (!iframeRef.current) return;

        await new Promise((resolve) => setTimeout(resolve, 100));

        const iframeDoc = iframeRef.current.contentDocument;
        if (!iframeDoc) return;

        // Write the HTML and CSS, but not the JS
        iframeDoc.open();
        iframeDoc.write(/*html*/ `
      <!DOCTYPE html>
      <html>
        <head>
          <!-- Components for modern browsers -->
          <script type="module" src="/node_modules/@symplr-ux/alloy-components/dist/symplr-stencil-components/symplr-stencil-components.esm.js"></script>
          <!-- Iconography -->
          <link rel="stylesheet" type="text/css" href="/node_modules/@symplr-ux//alloy-icons/dist/icons.min.css">
          <!-- Font -->
          <link rel="stylesheet" type="text/css" href="/node_modules/@symplr-ux/alloy-theme/dist/fonts/lato.min.css">
          <!-- Theme -->
          <link rel="stylesheet" type="text/css" href="/node_modules/@symplr-ux/alloy-theme/dist/css/sympl-theme.min.css">
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
        </body>
      </html>
    `);
        iframeDoc.close();

        // Now inject the JS code as a script element
        const script = iframeDoc.createElement("script");
        script.type = "text/javascript";
        // Correct regex: no double backslashes
        script.text = `
      (function() {
        // Store initial window keys before adding any new ones
        const initialKeys = Object.keys(window);

        // Function to clean up only newly added properties
        const cleanup = () => {
          Object.keys(window).forEach(key => {
            if (!initialKeys.includes(key)) {
              delete window[key];
            }
          });
        };

        // Clean up previous runs
        cleanup();

        ${jsCode.replace(/function\s+(\w+)/g, "window.$1 = function")}
      })();
    `;
        iframeDoc.body.appendChild(script);
      };

      init();

      // Cleanup function
      return () => {
        if (iframeRef.current?.contentDocument) {
          const scripts =
            iframeRef.current.contentDocument.getElementsByTagName("script");
          Array.from(scripts).forEach((script) => script.remove());
        }
      };
    }, [htmlCode, jsCode, cssCode, iframeRef]);

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
              className="app-header-btn"
              aria-label="Load file"
            >
              <SymplIcon name="si-upload" color="light" />
            </button>
            <button
              id="live-save-button"
              onClick={onSave}
              className="app-header-btn"
              aria-label="Save file"
            >
              <SymplIcon name="si-save" color="light" />
            </button>
          </div>
        </div>
        <iframe
          ref={ref}
          title="Live Preview"
          className="live-preview-iframe"
          sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups"
        />
      </div>
    );
  }
);

export default LivePreview;
