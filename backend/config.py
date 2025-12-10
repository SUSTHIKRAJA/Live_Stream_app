import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/rtsp_overlay_app")
DB_NAME = os.getenv("DB_NAME", "rtsp_overlay_app")
