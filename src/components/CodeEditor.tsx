import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  code: string;
  onChange: (value: string) => void;
};

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  return (
    <Editor
      height="100%"
      defaultLanguage="html"
      value={code}
      onChange={(value) => onChange(value || "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        automaticLayout: true,
        fontSize: 16,
        wordWrap: "on",
        lineNumbers: "on",
      }}
    />
  );
};

export default CodeEditor;
