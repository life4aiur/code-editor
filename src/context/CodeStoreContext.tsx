import { ReactNode, useState } from 'react';
import { CodeEditorStoreContext } from './CodeEditorStore';

export const CodeEditorStoreProvider = ({ children }: { children: ReactNode }) => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [logs, setLogs] = useState<Array<{ level: string; message: string }>>([]);

  const addLog = (level: string, message: string) => {
    setLogs((prev) => [...prev, { level, message }]);
  };

  const clearLogs = () => setLogs([]);

  return (
    <CodeEditorStoreContext.Provider value={{ htmlCode, cssCode, jsCode, setHtmlCode, setCssCode, setJsCode, logs, addLog, clearLogs }}>
      {children}
    </CodeEditorStoreContext.Provider>
  );
};
