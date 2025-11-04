import { useEffect, useRef } from "react";

function initialsFromName(name) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "G";
  const second = parts[1]?.[0] || "";
  return (first + second).toUpperCase();
}

export default function VideoStage({ stream, cameraOn, displayName }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (stream && cameraOn) {
      videoEl.srcObject = stream;
      videoEl.play().catch(() => {});
    } else {
      videoEl.srcObject = null;
    }
  }, [stream, cameraOn]);

  return (
    <div className="w-full mx-auto max-w-5xl">
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 relative">
        {stream && cameraOn ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white grid place-items-center text-3xl font-semibold shadow-lg">
                {initialsFromName(displayName || "Guest")}
              </div>
              <div className="text-sm text-neutral-400">Camera is off</div>
            </div>
          </div>
        )}
        <div className="absolute left-3 bottom-3 rounded-md bg-neutral-900/70 px-2 py-1 text-xs text-neutral-200 border border-neutral-800">
          {displayName || "You"}
        </div>
      </div>
    </div>
  );
}
