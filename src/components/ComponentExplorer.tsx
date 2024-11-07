import manifest from "@symplr-ux/alloy-components/dist/collection/collection-manifest.json";
import { Search } from "lucide-react";
import { useState } from "react";

type Component = {
  name: string;
  thumbnail?: string;
};

const COMPONENTS: Component[] = Object.entries(manifest.entries)
  .map(([_, path]) => ({
    name: path.split("/").pop()?.replace(".js", "") || "",
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const ComponentExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleDragStart = (e: React.DragEvent, componentName: string) => {
    // Add symplr- prefix back for the actual component tag
    const componentTag = `<${componentName}></${componentName}>`;
    e.dataTransfer.setData("text/plain", componentTag);
  };

  const filteredComponents = COMPONENTS.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 h-full border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredComponents.map((component) => (
          <div
            key={component.name}
            draggable
            onDragStart={(e) => handleDragStart(e, component.name)}
            className="flex items-center p-3 hover:bg-gray-50 cursor-move"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              <div className="text-xs">{component.name[0].toUpperCase()}</div>
            </div>
            <span className="ml-3 text-sm text-gray-700">{component.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentExplorer;
