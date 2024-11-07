import { useEffect, useRef } from "react";

type LivePreviewProps = {
  htmlCode: string;
  jsCode: string;
  cssCode: string;
};

const LivePreview = ({ htmlCode, jsCode, cssCode }: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!iframeRef.current) return;

      await new Promise((resolve) => setTimeout(resolve, 100));

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
            ${jsCode}
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
      ref={iframeRef}
      title="Live Preview"
      style={{ width: "100%", height: "100%", border: "none" }}
      sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
    />
  );
};

export default LivePreview;
