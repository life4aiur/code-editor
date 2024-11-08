import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useRef } from "react";
import { generateMockData } from "../utils/componentMockData";
import { EditorHeader } from "./EditorHeader";

type CodeEditorProps = {
  code: string;
  onChange: (value: string) => void;
  onUpdateJavaScript: (value: string) => void;
};

let componentCounter = 0;

const CodeEditor = ({
  code,
  onChange,
  onUpdateJavaScript,
}: CodeEditorProps) => {
  const editorRef = useRef<any>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");

    const match = data.match(/<([^>/]+)/);
    const componentName = match ? match[1] : "";

    const uniqueId = componentCounter++;

    if (editorRef.current) {
      const position = editorRef.current.getPosition();

      // Add id attribute to component
      const componentTag = `<${componentName} id="${componentName}_${uniqueId}"></${componentName}>`;

      const range = new monaco.Range(
        position.lineNumber,
        position.column,
        position.lineNumber,
        position.column
      );

      editorRef.current.executeEdits("", [
        {
          range: range,
          text: componentTag,
        },
      ]);

      // Update JS editor with mock data
      const mockData = generateMockData(componentName, uniqueId);
      if (mockData && onUpdateJavaScript) {
        onUpdateJavaScript(mockData);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-full flex flex-col">
      <EditorHeader
        title="HTML"
        onClear={() => onChange("")}
      />
      <div className="flex-1">
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
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
