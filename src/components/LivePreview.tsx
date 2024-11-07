import { useEffect, useRef } from "react";

const LivePreview = ({ code }: { code: string }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!iframeRef.current) return;

      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log(iframeRef.current.contentDocument);
      const iframeDoc = iframeRef.current.contentDocument;
      if (!iframeDoc) return;

      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          </head>
          <body>
            <div id="root">
              ${code}
            </div>
            <script>
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(React.createElement(App));
            </script>
          </body>
        </html>
      `);
      iframeDoc.close();
    };

    init();
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      title="Live Preview"
      style={{ width: "100%", height: "100%", border: "none" }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default LivePreview;
