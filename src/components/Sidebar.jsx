import { Home, Hash, Plus } from "lucide-react";

export default function Sidebar({ onCreateRoom, rooms = [], onSelectRoom }) {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-neutral-800 bg-neutral-950/60">
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-neutral-300">
          <Home size={18} />
          <span className="text-sm">Servers</span>
        </div>
      </div>
      <div className="p-3 flex-1 overflow-auto space-y-1">
        {rooms.length === 0 && (
          <div className="text-sm text-neutral-500 px-2">No rooms yet</div>
        )}
        {rooms.map((r) => (
          <button
            key={r}
            onClick={() => onSelectRoom(r)}
            className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-md hover:bg-neutral-800 text-neutral-200"
          >
            <Hash size={16} className="text-neutral-400" />
            <span className="truncate">{r}</span>
          </button>
        ))}
      </div>
      <div className="p-3 border-t border-neutral-800">
        <button
          onClick={onCreateRoom}
          className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 text-sm transition"
        >
          <Plus size={16} /> New room
        </button>
      </div>
    </aside>
  );
}
