import { Users, Settings } from "lucide-react";

export default function Header({ appName = "dera-conference-demo", roomName, onOpenSettings }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/40">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-semibold">D</div>
        <div>
          <h1 className="text-white font-semibold leading-tight">{appName}</h1>
          <p className="text-xs text-neutral-400">{roomName ? `Room: ${roomName}` : "Create or join a room"}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:flex items-center text-neutral-400 text-sm gap-1"><Users size={18} /> Group Call</span>
        <button
          onClick={onOpenSettings}
          className="inline-flex items-center gap-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-2 text-sm transition"
        >
          <Settings size={18} /> Settings
        </button>
      </div>
    </header>
  );
}
