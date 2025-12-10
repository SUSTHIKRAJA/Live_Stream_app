from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
from config import MONGO_URI, DB_NAME

app = Flask(__name__)
CORS(
    app,
    resources={r"/api/*": {"origins": ["http://localhost:5555", "http://127.0.0.1:5555", "*"]}},
)

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
overlays_col = db["overlays"]


def serialize_overlay(doc):
    doc["_id"] = str(doc["_id"])
    return doc


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/api/overlays", methods=["GET"])
def list_overlays():
    overlays = [serialize_overlay(o) for o in overlays_col.find()]
    return jsonify(overlays), 200


@app.route("/api/overlays/<overlay_id>", methods=["GET"])
def get_overlay(overlay_id):
    try:
        doc = overlays_col.find_one({"_id": ObjectId(overlay_id)})
        if not doc:
            return jsonify({"error": "Overlay not found"}), 404
        return jsonify(serialize_overlay(doc)), 200
    except Exception:
        return jsonify({"error": "Invalid ID"}), 400


@app.route("/api/overlays", methods=["POST"])
def create_overlay():
    data = request.json or {}
    required = ["name", "type", "content", "position", "size"]
    missing = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    now = datetime.utcnow().isoformat()
    doc = {
        "name": data["name"],
        "type": data["type"],  # 'text' or 'image'
        "content": data["content"],
        "position": data.get("position", {"x": 0, "y": 0}),
        "size": data.get("size", {"width": 10, "height": 10}),
        "style": data.get("style", {}),
        "createdAt": now,
        "updatedAt": now,
    }

    result = overlays_col.insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return jsonify(doc), 201


@app.route("/api/overlays/<overlay_id>", methods=["PUT"])
def update_overlay(overlay_id):
    data = request.json or {}
    allowed = ["name", "type", "content", "position", "size", "style"]
    update_fields = {k: v for k, v in data.items() if k in allowed}
    if not update_fields:
        return jsonify({"error": "No valid fields to update"}), 400

    update_fields["updatedAt"] = datetime.utcnow().isoformat()
    try:
        result = overlays_col.update_one(
            {"_id": ObjectId(overlay_id)},
            {"$set": update_fields},
        )
        if result.matched_count == 0:
            return jsonify({"error": "Overlay not found"}), 404

        updated_doc = overlays_col.find_one({"_id": ObjectId(overlay_id)})
        return jsonify(serialize_overlay(updated_doc)), 200
    except Exception:
        return jsonify({"error": "Invalid ID"}), 400


@app.route("/api/overlays/<overlay_id>", methods=["DELETE"])
def delete_overlay(overlay_id):
    try:
        result = overlays_col.delete_one({"_id": ObjectId(overlay_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Overlay not found"}), 404
        return jsonify({"message": "Deleted"}), 200
    except Exception:
        return jsonify({"error": "Invalid ID"}), 400


if __name__ == "__main__":
    app.run(debug=True)
