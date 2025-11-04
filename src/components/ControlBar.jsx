import { Mic, MicOff, Video, VideoOff, Phone } from "lucide-react";

export default function ControlBar({ joined, onJoin, onLeave, micOn, camOn, setMicOn, setCamOn, roomName, setRoomName }) {
  return (
    <div className="w-full border-t border-neutral-800 bg-neutral-950/60 px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 w-full max-w-sm">
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="# room-name"
          className="flex-1 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        {!joined ? (
          <button
            onClick={onJoin}
            className="rounded-md bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 text-sm"
          >
            Join
          </button>
        ) : (
          <button
            onClick={onLeave}
            className="inline-flex items-center gap-2 rounded-md bg-rose-600 hover:bg-rose-500 text-white px-3 py-2 text-sm"
          >
            <Phone size={18} /> Leave
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setMicOn((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm border border-neutral-800 ${
            micOn ? "bg-neutral-900 text-neutral-200 hover:bg-neutral-800" : "bg-amber-600/20 text-amber-300 hover:bg-amber-600/30"
          }`}
        >
          {micOn ? <Mic size={18} /> : <MicOff size={18} />}
          <span className="hidden sm:inline">{micOn ? "Mic on" : "Mic off"}</span>
        </button>
        <button
          onClick={() => setCamOn((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm border border-neutral-800 ${
            camOn ? "bg-neutral-900 text-neutral-200 hover:bg-neutral-800" : "bg-amber-600/20 text-amber-300 hover:bg-amber-600/30"
          }`}
        >
          {camOn ? <Video size={18} /> : <VideoOff size={18} />}
          <span className="hidden sm:inline">{camOn ? "Camera on" : "Camera off"}</span>
        </button>
      </div>
    </div>
  );
}
