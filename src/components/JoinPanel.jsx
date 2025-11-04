import { useState } from "react";
import { User, Phone } from "lucide-react";

export default function JoinPanel({ onJoin, busy }) {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onJoin(name.trim() || "Guest");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-lg">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-neutral-100">Join the call</h2>
          <p className="text-sm text-neutral-400 mt-1">
            Enter your name and click Join. You can mute/unmute and toggle camera anytime.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg bg-neutral-800 border border-neutral-700 pl-10 pr-3 h-10 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            <Phone size={16} />
            {busy ? "Joining..." : "Join call"}
          </button>
        </form>
      </div>
    </div>
  );
}
