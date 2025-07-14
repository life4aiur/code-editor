import React from "react";
import Console from "./Console";
import LivePreview from "./LivePreview";

interface PreviewSectionProps {
    iframeRef: React.RefObject<HTMLIFrameElement>;
    htmlCode: string;
    jsCode: string;
    cssCode: string;
    setHtmlCode: (v: string) => void;
    setJsCode: (v: string) => void;
    setCssCode: (v: string) => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
    iframeRef,
    htmlCode,
    jsCode,
    cssCode,
    setHtmlCode,
    setJsCode,
    setCssCode,
}) => (
    <>
        <div className="live-preview-flex">
            <LivePreview
                ref={iframeRef}
                htmlCode={htmlCode}
                jsCode={jsCode}
                cssCode={cssCode}
                onUpload={e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            const content = JSON.parse(e.target?.result as string);
                            setCssCode(content.css || "");
                            setHtmlCode(content.html || "");
                            setJsCode(content.javascript || "");
                        } catch (err) {
                            console.error("Failed to parse file:", err);
                        }
                    };
                    reader.readAsText(file);
                }}
                onSave={() => {
                    const content = {
                        html: htmlCode,
                        javascript: jsCode,
                        css: cssCode,
                    };
                    const blob = new Blob([JSON.stringify(content, null, 2)], {
                        type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "sandbox-state.json";
                    a.click();
                    URL.revokeObjectURL(url);
                }}
            />
        </div>
        <div className="console-section">
            <Console iframeRef={iframeRef} />
        </div>
    </>
);

export default PreviewSection;
