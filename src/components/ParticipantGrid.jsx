import { useEffect, useRef } from "react";

function AvatarTile({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center overflow-hidden">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-semibold">
        {initials}
      </div>
      <div className="absolute bottom-2 left-2 text-xs text-neutral-300 bg-neutral-900/70 px-2 py-1 rounded">
        {name}
      </div>
    </div>
  );
}

function LocalVideoTile({ stream, name, camOn }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el && stream && camOn) {
      el.srcObject = stream;
      el.play().catch(() => {});
    }
  }, [stream, camOn]);

  return (
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
      {camOn ? (
        <video ref={ref} muted playsInline className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-full min-h-[200px]">
          <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 text-2xl font-semibold">
            {name[0].toUpperCase()}
          </div>
        </div>
      )}
      <div className="absolute bottom-2 left-2 text-xs text-neutral-300 bg-neutral-900/70 px-2 py-1 rounded">
        {name} (You)
      </div>
    </div>
  );
}

export default function ParticipantGrid({ localStream, camOn }) {
  const simulated = ["Alex Morgan", "Jordan Lee", "Sam Kim"];
  const cols = simulated.length + 1 > 2 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 ${cols} gap-4 p-4`}> 
      <LocalVideoTile stream={localStream} camOn={camOn} name="You" />
      {simulated.map((name) => (
        <AvatarTile key={name} name={name} />
      ))}
    </div>
  );
}
