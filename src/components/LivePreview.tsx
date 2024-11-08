import { forwardRef, useEffect } from "react";

type LivePreviewProps = {
  htmlCode: string;
  jsCode: string;
  cssCode: string;
  language: string;
};

const LivePreview = forwardRef<HTMLIFrameElement, LivePreviewProps>(
  ({ htmlCode, jsCode, cssCode, language }, ref) => {
    const iframeRef = ref as React.RefObject<HTMLIFrameElement>;

    useEffect(() => {
      const init = async () => {
        if (!iframeRef.current) return;

        await new Promise((resolve) => setTimeout(resolve, 100));

        const iframeDoc = iframeRef.current.contentDocument;
        if (!iframeDoc) return;

        // Clear any existing scripts in the iframe
        const existingScripts = iframeDoc.getElementsByTagName("script");
        Array.from(existingScripts).forEach((script) => script.remove());

        if (language === "react") {
          // Wrap user's React code with proper React 18 initialization
          const wrappedCode = `
            ${jsCode}

            // Initialize React 18
            const root = ReactDOM.createRoot(document.getElementById("root-sandbox"));
            root.render(<App />);
          `;

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
                <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
              </head>
              <body>
                <div id="root-sandbox"></div>
                <script type="text/babel" data-type="module">
                  ${wrappedCode}
                </script>
              </body>
            </html>
          `);
          iframeDoc.close();
          return;
        }

        // Regular HTML mode
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
              <script>
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
              </script>
            </body>
          </html>
        `);

        iframeDoc.close();
      };

      init();

      // Cleanup function
      return () => {
        if (iframeRef.current?.contentDocument) {
          const scripts =
            // eslint-disable-next-line react-hooks/exhaustive-deps
            iframeRef.current.contentDocument.getElementsByTagName("script");
          Array.from(scripts).forEach((script) => script.remove());
        }
      };
    }, [htmlCode, jsCode, cssCode, iframeRef, language]);

    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            borderBottom: "1px solid #333",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500 }}>Live Preview</span>
          <span style={{ fontSize: 14, color: "#888" }}>• {language}</span>
        </div>
        <iframe
          ref={ref}
          title="Live Preview"
          style={{
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
