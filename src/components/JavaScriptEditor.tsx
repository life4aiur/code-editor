import Editor from "@monaco-editor/react";

type JavaScriptEditorProps = {
  code: string;
  onChange: (value: string) => void;
};

const JavaScriptEditor = ({ code, onChange }: JavaScriptEditorProps) => {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
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

export default JavaScriptEditor;
