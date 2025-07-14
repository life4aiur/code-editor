
import Editor from "@monaco-editor/react";
import './CodeEditor.scss';
import { EditorHeader } from "./EditorHeader";

type CodeEditorProps = {
  code: string;
  onChange: (value: string) => void;
  expanded?: boolean;
  onExpand?: () => void;
};

const CodeEditor = ({ code, onChange, expanded, onExpand }: CodeEditorProps) => {
  return (
    <div className="editor-container">
      <EditorHeader
        title="HTML"
        onClear={() => onChange("")}
        onCollapse={onExpand}
        isCollapsed={!expanded}
      />
      {expanded && (
        <div className="editor-content">
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
              tabSize: 2,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
