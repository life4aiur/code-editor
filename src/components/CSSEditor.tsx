
import Editor from "@monaco-editor/react";
import './CSSEditor.css';
import { EditorHeader } from "./EditorHeader";

type CSSEditorProps = {
  code: string;
  onChange: (value: string) => void;
};

const CSSEditor = ({ code, onChange }: CSSEditorProps) => {
  return (
    <div className="editor-container">
      <EditorHeader
        title="CSS"
        onClear={() => onChange("")}
      />
      <div className="editor-content">
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
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

export default CSSEditor;
