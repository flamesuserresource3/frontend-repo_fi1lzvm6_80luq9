import { Video } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/40">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-2">
        <div className="flex items-center gap-2 text-neutral-200">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400">
            <Video size={18} />
          </div>
          <span className="font-semibold tracking-tight">dera-conference-demo</span>
        </div>
        <div className="ml-auto text-xs text-neutral-400">
          Simple, friendly group calling demo
        </div>
      </div>
    </header>
  );
}
