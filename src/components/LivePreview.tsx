import { forwardRef, useEffect } from "react";

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

        try {
          // Remove old script if exists
          const oldScript = document.getElementById("live-preview-script");
          if (oldScript) {
            oldScript.remove();
          }

          // Create new script with IIFE
          const script = document.createElement("script");
          script.id = "live-preview-script";
          script.textContent = `
            (function() {
              try {
                ${jsCode}
              } catch (e) {
                //console.error('Error executing preview code:', e);
              }
            })();
          `;

          document.body.appendChild(script);
        } catch (error) {
          console.error("Error in live preview:", error);
        }

        const iframeDoc = iframeRef.current.contentDocument;
        if (!iframeDoc) return;

        iframeDoc.open();
        iframeDoc.write(/*html*/ `
        <!DOCTYPE html>
        <html>
            <head>
                <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                <!-- Components for modern browsers -->
                <script type="module" src="/node_modules/@symplr-ux/alloy-components/dist/symplr-stencil-components/symplr-stencil-components.esm.js"></script>
                <!-- Iconography -->
                <link rel="stylesheet" type="text/css" href="/node_modules/@symplr-ux//alloy-icons/dist/icons.min.css">
                <!-- Font -->
                <link rel="stylesheet" type="text/css" href="/node_modules/@symplr-ux/alloy-theme/dist/fonts/lato.min.css">
                <!-- Theme -->
                <link rel="stylesheet" type="text/css" href="/node_modules/@symplr-ux/alloy-theme/dist/css/sympl-theme.min.css">
                <style>
                ${cssCode}
                </style>
            </head>
            <body>
                ${htmlCode}
            <script>
              setTimeout(() => {
                ${jsCode}
              }, 1000);
            </script>
            </body>
        </html>
      `);
        iframeDoc.close();
      };

      init();
    }, [htmlCode, jsCode, cssCode]);

    return (
      <iframe
        ref={ref}
        title="Live Preview"
        style={{ width: "100%", height: "100%", border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
      />
    );
  }
);

export default LivePreview;
