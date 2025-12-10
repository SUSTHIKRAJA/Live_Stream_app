# RTSP Livestream Overlay App

A full-stack web application that allows users to view a livestream video
(converted from an RTSP source) and add customizable overlays (text or logos)
on top of the video. Overlay settings are persisted using a backend REST API.

---

## 🔧 Tech Stack

### Frontend
- React
- Axios
- HLS.js (for `.m3u8` playback)
- HTML5 Video Player

### Backend
- Python
- Flask
- Flask-CORS
- MongoDB (via PyMongo)

### Video Streaming
- RTSP source (via rtsp.me / rtsp.stream)
- Converted to HLS (`.m3u8`) or MP4 for browser playback

---

## ⚠️ Important Note About RTSP

Modern browsers **do not support RTSP directly**.

To use this app:
1. Create an RTSP stream using services like:
   - https://rtsp.me
   - https://rtsp.stream
2. Convert RTSP → HLS (`.m3u8`) or MP4 using:
   - FFmpeg
   - Media server (e.g., Nginx RTMP, VLC, OBS)
3. Use the generated **HLS/MP4 HTTP URL** in the app.

---

## ▶️ Running the Application

### Backend

```bash
cd backend
python -m venv venv
pip install -r requirements.txt
python app.py
```

Backend runs at:
```
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## ✅ Features

- Livestream playback
- Play / Pause / Volume controls
- Text & Image overlays
- Overlay CRUD operations
- MongoDB persistence
