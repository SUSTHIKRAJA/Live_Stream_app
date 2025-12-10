# API Documentation – Overlay Management

Base URL:
```
http://localhost:5000/api
```

---

## Overlay Object Schema

```json
{
  "_id": "string",
  "name": "string",
  "type": "text | image",
  "content": "string",
  "position": { "x": 10, "y": 80 },
  "size": { "width": 20, "height": 10 },
  "style": {
    "color": "#ffffff",
    "fontSize": 18,
    "background": "rgba(0,0,0,0.4)"
  }
}
```

---

## Endpoints

### GET /overlays
Returns all overlays.

### POST /overlays
Creates a new overlay.

### GET /overlays/{id}
Returns a single overlay.

### PUT /overlays/{id}
Updates an overlay.

### DELETE /overlays/{id}
Deletes an overlay.
