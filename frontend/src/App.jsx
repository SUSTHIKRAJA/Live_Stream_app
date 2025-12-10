import React, { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import OverlayEditor from "../components/OverlayEditor";

const App = () => {
  const [streamUrl, setStreamUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [overlays, setOverlays] = useState([]);

  const handleSetStream = () => {
    setStreamUrl(inputUrl.trim());
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <header style={{ marginBottom: "2rem" }}>
        <center><h1>RTSP Livestream App</h1>
        <p style={{ maxWidth: "700px" }}>
Sample video link "https://susthik.selfmade.one/video/sample_mpeg4.mp4"
        </p></center>
      </header>
<center>
      <section
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          borderRadius: "0px",
          border: "1px solid #00a2f9ff",
        }}
      >
        <label>
          Stream URL:&nbsp;
          <input
            style={{ width: "60%", marginRight: "0.5rem " }}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://example.com/live.m3u8 or https://example.com/video.mp4"
          />
        </label>
        <button onClick={handleSetStream} >Load Stream</button>

        <p style={{ color:"red",fontSize: "0.85rem", marginTop: "0.5rem" }}>
          Note: Browsers cannot play RTSP directly. Use a service like rtsp.me
          or a media server/FFmpeg to convert RTSP → HLS/MP4, and paste that
          URL here.
        </p>
      </section>
</center>
      {streamUrl ? (
        <VideoPlayer streamUrl={streamUrl} overlays={overlays} />
      ) : (
        <p style={{ marginBottom: "4rem" }}>
          No stream loaded yet. Paste a valid stream URL and click{" "}
          <strong>Load Stream</strong>.
        </p>
      )}

      <OverlayEditor overlays={overlays} setOverlays={setOverlays} />
    </div>
  );
};

export default App;
