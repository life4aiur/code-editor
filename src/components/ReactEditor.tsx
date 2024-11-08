import Editor from "@monaco-editor/react";
import { EditorHeader } from "./EditorHeader";

type ReactEditorProps = {
  code: string;
  onChange: (value: string) => void;
};

const ReactEditor = ({ code, onChange }: ReactEditorProps) => {
  return (
    <div className="h-full flex flex-col">
      <EditorHeader
        title="React"
        onClear={() => onChange(`function App() {
          return <div>Hello React</div>;
        }`)}
      />
      <div className="flex-1">
        <Editor
          height="100%"
          width="100%"
          defaultLanguage="javascript"
          defaultValue={code}
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
          beforeMount={(monaco) => {
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
              jsx: monaco.languages.typescript.JsxEmit.React,
              jsxFactory: "React.createElement",
              reactNamespace: "React",
              allowNonTsExtensions: true,
              target: monaco.languages.typescript.ScriptTarget.Latest,
              allowJs: true,
              typeRoots: ["node_modules/@types"],
            });
          }}
        />
      </div>
    </div>
  );
};

export default ReactEditor;
