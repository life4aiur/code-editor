import { useEffect, useState } from "react";

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
    <div className="bg-gray-900 text-white p-4 h-full font-mono overflow-auto">
      {logs.map((log, i) => (
        <div key={i}>{`> ${log}`}</div>
      ))}
    </div>
  );
};

export default Console;
