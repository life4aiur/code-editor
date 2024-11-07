import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  code: string;
  onChange: (value: string) => void;
};

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      value={code}
      onChange={(value) => onChange(value || "")}
      theme="vs-light"
      options={{
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
