import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ streamUrl, overlays }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!streamUrl || !videoRef.current) return;

    // Handle HLS streams
    if (streamUrl.endsWith(".m3u8") && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);

      return () => {
        hls.destroy();
      };
    } else {
      // Fallback: mp4 or other supported formats
      videoRef.current.src = streamUrl;
    }
  }, [streamUrl]);

  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        maxWidth: "100%",
        marginBottom: "1rem",
      }}
    >
      <video
        ref={videoRef}
        controls
        style={{
          width: "100%",
          borderRadius: "12px",
          background: "#000",
        }}
      />

      {overlays.map((overlay) => {
        const { position = {}, size = {}, style = {} } = overlay;
        const baseStyle = {
          position: "absolute",
          left: `${position.x ?? 0}%`,
          top: `${position.y ?? 0}%`,
          width: `${size.width ?? 10}%`,
          height: `${size.height ?? 10}%`,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: style.color || "#ffffff",
          fontSize: style.fontSize || 16,
          background: style.background || "transparent",
          textAlign: "center",
        };

        if (overlay.type === "image") {
          return (
            <img
              key={overlay._id}
              src={overlay.content}
              alt={overlay.name}
              style={{ ...baseStyle, objectFit: "contain" }}
            />
          );
        }

        return (
          <div key={overlay._id} style={baseStyle}>
            {overlay.content}
          </div>
        );
      })}
    </div>
  );
};

export default VideoPlayer;
