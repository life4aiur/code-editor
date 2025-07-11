interface EditorHeaderProps {
  title: string;
  onClear: () => void;
  onCollapse?: () => void; // Optional collapse handler
  isCollapsed?: boolean;   // Optional collapsed state
}

export function EditorHeader({ title, onClear, onCollapse, isCollapsed }: EditorHeaderProps) {
  return (
    <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <span>{title}</span>
      <div className="flex items-center gap-2">
        {onCollapse && (
          <button
            onClick={onCollapse}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white flex items-center"
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </button>
        )}
        <button
          onClick={onClear}
          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white flex items-center"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default EditorHeader;
