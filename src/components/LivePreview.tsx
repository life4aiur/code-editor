
import { forwardRef, useEffect } from "react";
import './LivePreview.css';

type LivePreviewProps = {
  htmlCode: string;
  jsCode: string;
  cssCode: string;
};

const LivePreview = forwardRef<HTMLIFrameElement, LivePreviewProps>(
  ({ htmlCode, jsCode, cssCode }, ref) => {
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
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            borderBottom: "1px solid #000",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500 }}>Live Preview</span>
        </div>
        <iframe
          ref={ref}
          title="Live Preview"
          style={{
            backgroundColor: "var(--alloy-alias-color-background-default)",
            width: "100%",
            height: "calc(100% - 45px)",
            border: "none",
            padding: "8px",
          }}
          sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups"
        />
      </div>
    );
  }
);

export default LivePreview;
