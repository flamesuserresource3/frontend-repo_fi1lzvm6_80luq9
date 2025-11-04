import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import JoinPanel from "./components/JoinPanel.jsx";
import VideoStage from "./components/VideoStage.jsx";
import Controls from "./components/Controls.jsx";

export default function App() {
  const [joined, setJoined] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [stream, setStream] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  const join = async (name) => {
    setBusy(true);
    setError("");
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setStream(media);
      setDisplayName(name);
      setJoined(true);
      setMicOn(true);
      setCameraOn(true);
    } catch (e) {
      console.error(e);
      setError("Could not access camera/microphone. Please check permissions.");
    } finally {
      setBusy(false);
    }
  };

  const leave = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setJoined(false);
  };

  const toggleMic = () => {
    const next = !micOn;
    setMicOn(next);
    stream?.getAudioTracks().forEach((t) => (t.enabled = next));
  };

  const toggleCamera = () => {
    const next = !cameraOn;
    setCameraOn(next);
    stream?.getVideoTracks().forEach((t) => (t.enabled = next));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        {!joined ? (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Start a simple call</h1>
              <p className="text-neutral-400 text-sm mt-2">No channels or servers — just join and share your screen with others.</p>
            </div>
            <JoinPanel onJoin={join} busy={busy} />
            {error && (
              <div className="max-w-md mx-auto rounded-lg border border-rose-900 bg-rose-950/40 p-3 text-rose-300 text-sm">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <VideoStage stream={stream} cameraOn={cameraOn} displayName={displayName} />
            <p className="text-center text-neutral-400 text-sm">You're in the call. Share the page link with a friend to join once we add real-time signaling.</p>
          </div>
        )}
      </main>
      <Controls
        joined={joined}
        micOn={micOn}
        cameraOn={cameraOn}
        onToggleMic={toggleMic}
        onToggleCamera={toggleCamera}
        onLeave={leave}
      />
    </div>
  );
}
