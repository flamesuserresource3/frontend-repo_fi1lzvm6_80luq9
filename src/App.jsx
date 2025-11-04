import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ParticipantGrid from "./components/ParticipantGrid";
import ControlBar from "./components/ControlBar";

export default function App() {
  const [joined, setJoined] = useState(false);
  const [roomName, setRoomName] = useState("general");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const mediaTracks = useRef({ audio: null, video: null });

  useEffect(() => {
    // Toggle tracks when mic/cam switch while joined
    if (!joined) return;
    const { audio, video } = mediaTracks.current;
    if (audio) audio.enabled = micOn;
    if (video) video.enabled = camOn;
  }, [micOn, camOn, joined]);

  const startLocalMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    const audio = stream.getAudioTracks()[0] || null;
    const video = stream.getVideoTracks()[0] || null;
    if (audio) audio.enabled = micOn;
    if (video) video.enabled = camOn;
    mediaTracks.current = { audio, video };
    setLocalStream(stream);
  };

  const stopLocalMedia = () => {
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
      setLocalStream(null);
    }
    mediaTracks.current = { audio: null, video: null };
  };

  const handleJoin = async () => {
    try {
      await startLocalMedia();
      setJoined(true);
    } catch (err) {
      console.error(err);
      alert("Could not access your camera/microphone. Please check permissions.");
    }
  };

  const handleLeave = () => {
    stopLocalMedia();
    setJoined(false);
  };

  const [rooms, setRooms] = useState(["general", "standup", "music"]);
  const handleCreateRoom = () => {
    const base = "room-" + Math.random().toString(36).slice(2, 6);
    setRooms((r) => [base, ...r]);
    setRoomName(base);
  };

  const handleSelectRoom = (r) => {
    setRoomName(r);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <Header appName="dera-conference-demo" roomName={roomName} onOpenSettings={() => alert("Device settings coming soon")} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar onCreateRoom={handleCreateRoom} rooms={rooms} onSelectRoom={handleSelectRoom} />

        <main className="flex-1 flex flex-col">
          {!joined ? (
            <section className="flex-1 grid place-items-center p-6">
              <div className="max-w-xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
                <h2 className="text-xl font-semibold">Start a group call</h2>
                <p className="text-neutral-400 mt-1">Join the room to preview your camera and microphone. This demo simulates other participants to showcase the layout.</p>
                <div className="mt-4 flex items-center gap-2">
                  <input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="# room-name"
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <button onClick={handleJoin} className="rounded-md bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-sm">Join room</button>
                </div>
                <p className="text-xs text-neutral-500 mt-3">Note: Real-time group calling needs a signaling server. This demo focuses on the interface and local media preview.</p>
              </div>
            </section>
          ) : (
            <section className="flex-1 flex flex-col">
              <ParticipantGrid localStream={localStream} camOn={camOn} />
            </section>
          )}

          <ControlBar
            joined={joined}
            onJoin={handleJoin}
            onLeave={handleLeave}
            micOn={micOn}
            camOn={camOn}
            setMicOn={setMicOn}
            setCamOn={setCamOn}
            roomName={roomName}
            setRoomName={setRoomName}
          />
        </main>
      </div>
    </div>
  );
}
