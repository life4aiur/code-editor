import React from "react";
import CodeEditor from "./CodeEditor";
import CSSEditor from "./CSSEditor";
import JavaScriptEditor from "./JavaScriptEditor";

interface EditorsColumnProps {
    htmlCode: string;
    setHtmlCode: (v: string) => void;
    jsCode: string;
    setJsCode: (v: string) => void;
    cssCode: string;
    setCssCode: (v: string) => void;
    expanded: { html: boolean; js: boolean; css: boolean };
    setExpanded: React.Dispatch<React.SetStateAction<{ html: boolean; js: boolean; css: boolean }>>;
}

const EditorsColumn: React.FC<EditorsColumnProps> = ({
    htmlCode,
    setHtmlCode,
    jsCode,
    setJsCode,
    cssCode,
    setCssCode,
    expanded,
    setExpanded,
}) => {
    const editors = [
        {
            key: 'html',
            component: CodeEditor,
            code: htmlCode,
            setCode: setHtmlCode,
            expanded: expanded.html,
            onExpand: () => setExpanded(e => ({ ...e, html: !e.html })),
        },
        {
            key: 'js',
            component: JavaScriptEditor,
            code: jsCode,
            setCode: setJsCode,
            expanded: expanded.js,
            onExpand: () => setExpanded(e => ({ ...e, js: !e.js })),
        },
        {
            key: 'css',
            component: CSSEditor,
            code: cssCode,
            setCode: setCssCode,
            expanded: expanded.css,
            onExpand: () => setExpanded(e => ({ ...e, css: !e.css })),
        },
    ];
    const expandedCount = editors.filter(e => e.expanded).length;
    const flexBasis = expandedCount > 0 ? `${100 / expandedCount}%` : '0%';
    return (
        <>
            {editors.map(({ key, component: EditorComponent, code, setCode, expanded, onExpand }) => (
                <div
                    key={key}
                    className="editor-section"
                    style={expanded
                        ? { flex: `1 1 ${flexBasis}`, minHeight: 0, overflow: 'hidden' }
                        : { flex: '0 0 auto', minHeight: 0, maxHeight: 40, overflow: 'hidden' }}
                >
                    <EditorComponent
                        code={code}
                        onChange={setCode}
                        expanded={expanded}
                        onExpand={onExpand}
                    />
                </div>
            ))}
        </>
    );
};

export default EditorsColumn;
