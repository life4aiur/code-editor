import { SymplIcon } from "@symplr-ux/alloy-components/dist/react-bindings";
import './EditorHeader.scss';
interface EditorHeaderProps {
  title: string;
  onClear: () => void;
  onCollapse?: () => void; // Optional collapse handler
  isCollapsed?: boolean;   // Optional collapsed state
}

export function EditorHeader({ title, onClear, onCollapse, isCollapsed }: EditorHeaderProps) {
  return (
    <div className="editor-header">
      <span>{title}</span>
      <div className="editor-header-actions">
        {onCollapse && (
          <button
            onClick={onCollapse}
            className="editor-header-btn"
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
            type="button"
          >
            <SymplIcon name={isCollapsed ? 'si-chevron-down' : 'si-chevron-up'} color="light" />
          </button>
        )}
        <button
          onClick={onClear}
          className="editor-header-btn"
          aria-label="Clear"
          type="button"
        >
          <SymplIcon name="si-trash" color="light" />
        </button>
      </div>
    </div>
  );
}

export default EditorHeader;
