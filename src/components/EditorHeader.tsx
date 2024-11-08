interface EditorHeaderProps {
  title: string;
  onClear: () => void;
}

export function EditorHeader({ title, onClear }: EditorHeaderProps) {
  return (
    <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <span>{title}</span>
      <button
        onClick={onClear}
        className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white flex items-center"
      >
        Clear
      </button>
    </div>
  );
}

export default EditorHeader;
