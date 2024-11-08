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
    <div className="bg-gray-900 text-white h-full font-mono flex flex-col">
      <div className="flex justify-between items-center py-2 px-4 border-b border-gray-700 bg-gray-800">
        <div className="text-gray-400">Console Output</div>
        <button 
          onClick={() => setLogs([])}
          className="px-2 py-0.5 text-sm bg-gray-700 hover:bg-gray-600 rounded"
        >
          Clear
        </button>
      </div>
      <div className="p-4 overflow-auto flex-1">
        {logs.map((log, i) => (
          <div key={i}>{`> ${log}`}</div>
        ))}
      </div>
    </div>
  );
};

export default Console;
