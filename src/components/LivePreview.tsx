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

        const iframeDoc = iframeRef.current.contentDocument;
        if (!iframeDoc) return;

        // Clear any existing scripts in the iframe
        const existingScripts = iframeDoc.getElementsByTagName("script");
        Array.from(existingScripts).forEach((script) => script.remove());

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
                (function() {
                    ${jsCode}
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
            iframeRef.current.contentDocument.getElementsByTagName("script");
          Array.from(scripts).forEach((script) => script.remove());
        }
      };
    }, [htmlCode, jsCode, cssCode, iframeRef]);

    return (
      <iframe
        ref={ref}
        title="Live Preview"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          padding: "8px",
        }}
        sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
      />
    );
  }
);

export default LivePreview;
