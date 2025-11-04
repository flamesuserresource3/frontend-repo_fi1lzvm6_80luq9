import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

export default function Controls({ joined, micOn, cameraOn, onToggleMic, onToggleCamera, onLeave }) {
  if (!joined) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20">
      <div className="mx-auto max-w-5xl px-4 pb-6">
        <div className="mx-auto w-full md:w-max rounded-2xl border border-neutral-800 bg-neutral-900/70 backdrop-blur shadow-lg p-2 flex items-center justify-center gap-2">
          <button
            onClick={onToggleMic}
            className={`h-10 w-10 grid place-items-center rounded-full border transition ${
              micOn
                ? "bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700"
                : "bg-rose-950/40 border-rose-900 text-rose-300 hover:bg-rose-900/60"
            }`}
            aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
          >
            {micOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>
          <button
            onClick={onToggleCamera}
            className={`h-10 w-10 grid place-items-center rounded-full border transition ${
              cameraOn
                ? "bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700"
                : "bg-rose-950/40 border-rose-900 text-rose-300 hover:bg-rose-900/60"
            }`}
            aria-label={cameraOn ? "Turn camera off" : "Turn camera on"}
          >
            {cameraOn ? <Video size={18} /> : <VideoOff size={18} />}
          </button>
          <button
            onClick={onLeave}
            className="h-10 px-3 grid place-items-center rounded-full border border-rose-900 bg-rose-600/80 text-white hover:bg-rose-500"
            aria-label="Leave call"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <PhoneOff size={16} /> Leave
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
