
import Editor from "@monaco-editor/react";
import { EditorHeader } from "./EditorHeader";
import './JavaScriptEditor.css';

type JavaScriptEditorProps = {
  code: string;
  onChange: (value: string) => void;
  expanded?: boolean;
  onExpand?: () => void;
};

const JavaScriptEditor = ({ code, onChange, expanded, onExpand }: JavaScriptEditorProps) => {
  return (
    <div className="editor-container">
      <EditorHeader
        title="JavaScript"
        onClear={() => onChange("")}
        onCollapse={onExpand}
        isCollapsed={!expanded}
      />
      {expanded && (
        <div className="editor-content">
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
              tabSize: 2,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default JavaScriptEditor;
