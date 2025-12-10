# User Documentation – RTSP Livestream Overlay App

## Step 1: Create RTSP Stream
Use:
- https://rtsp.me
- https://rtsp.stream

Get an RTSP URL:
```
rtsp://rtsp.me/your-key
```

---

## Step 2: Convert RTSP to HLS
Browsers cannot play RTSP directly.

Example using FFmpeg:
```bash
ffmpeg -i rtsp://rtsp.me/your-key -f hls stream.m3u8
```

Host the file and get:
```
https://example.com/stream.m3u8
```

---

## Step 3: Load Stream
1. Open the app
2. Paste HLS/MP4 URL
3. Click **Load Stream**
4. Use play / pause / volume controls

---

## Step 4: Manage Overlays
- Add text or image overlays
- Set position and size
- Edit or delete overlays anytime

All overlays are saved automatically.
