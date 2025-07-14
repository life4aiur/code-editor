
import { useEffect, useState } from "react";
import './Console.css';
import EditorHeader from "./EditorHeader";

type ConsoleProps = {
  iframeRef: React.RefObject<HTMLIFrameElement>;
};

const Console = ({ iframeRef }: ConsoleProps) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;

    const iframeWindow = iframeRef.current.contentWindow as any;

    // Override console methods
    iframeWindow.console.log = (...args) => {
      setLogs(prev => [...prev, args.map(arg => JSON.stringify(arg)).join(' ')]);
    };
    iframeWindow.console.error = (...args) => {
      setLogs(prev => [...prev, `Error: ${args.map(arg => JSON.stringify(arg)).join(' ')}`]);
    };
  }, [iframeRef]);

  return (
    <div className="console-container">
      <EditorHeader title="Console Output" onClear={() => setLogs([])} />
      <div className="console-logs">
        {logs.map((log, i) => (
          <div key={i}>{`> ${log}`}</div>
        ))}
      </div>
    </div>
  );
};

export default Console;
