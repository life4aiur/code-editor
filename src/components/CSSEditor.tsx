import Editor from "@monaco-editor/react";

type CSSEditorProps = {
  code: string;
  onChange: (value: string) => void;
};

const CSSEditor = ({ code, onChange }: CSSEditorProps) => {
  return (
    <Editor
      height="100%"
      defaultLanguage="css"
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

export default CSSEditor;
