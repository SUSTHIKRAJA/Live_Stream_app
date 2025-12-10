import React, { useEffect, useState } from "react";
import {
  getOverlays,
  createOverlay,
  updateOverlay,
  deleteOverlay,
} from "../api";

const defaultForm = {
  name: "",
  type: "text",
  content: "",
  positionX: 10,
  positionY: 10,
  width: 20,
  height: 10,
  color: "#ffffff",
  fontSize: 18,
  background: "rgba(0,0,0,0.4)",
};

const OverlayEditor = ({ overlays, setOverlays }) => {
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getOverlays().then((res) => setOverlays(res.data));
  }, [setOverlays]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      type: form.type,
      content: form.content,
      position: {
        x: Number(form.positionX),
        y: Number(form.positionY),
      },
      size: {
        width: Number(form.width),
        height: Number(form.height),
      },
      style: {
        color: form.color,
        fontSize: Number(form.fontSize),
        background: form.background,
      },
    };

    if (editingId) {
      const res = await updateOverlay(editingId, payload);
      setOverlays((prev) =>
        prev.map((o) => (o._id === editingId ? res.data : o))
      );
    } else {
      const res = await createOverlay(payload);
      setOverlays((prev) => [...prev, res.data]);
    }

    setForm(defaultForm);
    setEditingId(null);
  };

  const handleEdit = (overlay) => {
    setEditingId(overlay._id);
    setForm({
      name: overlay.name,
      type: overlay.type,
      content: overlay.content,
      positionX: overlay.position?.x ?? 0,
      positionY: overlay.position?.y ?? 0,
      width: overlay.size?.width ?? 10,
      height: overlay.size?.height ?? 10,
      color: overlay.style?.color ?? "#ffffff",
      fontSize: overlay.style?.fontSize ?? 18,
      background: overlay.style?.background ?? "rgba(0,0,0,0.4)",
    });
  };

  const handleDelete = async (id) => {
    await deleteOverlay(id);
    setOverlays((prev) => prev.filter((o) => o._id !== id));
  };

  return (
    <div style={{ marginTop: "2rem" , 
          marginBottom: "1.5rem",
          padding: "1rem",
          borderRadius: "0px",
          border: "1px solid #00a2f9ff",
        }}>
  
      <center>
            <h2>Overlay Settings</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div style={{ marginBottom: ".5rem", marginLeft:"0rem"}}>
          <label>
            Name:&nbsp;
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem",marginLeft:"-8rem" }}>
          <label>
            Type:&nbsp;
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="text">Text</option>
              <option value="image">Image</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem",marginLeft: "14rem" }}>
          <label>
            {form.type === "text" ? "Text" : "Image URL"}:&nbsp;
            <input
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              style={{ width: "60%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem",marginLeft:"16rem" }}>
          <label>
            Position X (%):&nbsp;
            <input
              type="number"
              name="positionX"
              value={form.positionX}
              onChange={handleChange}
            />
          </label>
          &nbsp;&nbsp;
          <label>
            Position Y (%):&nbsp;
            <input
              type="number"
              name="positionY"
              value={form.positionY}
              onChange={handleChange}
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" ,marginLeft:"16rem"}}>
          <label>
            Width (%):&nbsp;
            <input
              type="number"
              name="width"
              value={form.width}
              onChange={handleChange}
            />
          </label>
          &nbsp;&nbsp;
          <label>
            Height (%):&nbsp;
            <input
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
            />
          </label>
        </div>

        {form.type === "text" && (
          <>
            <div style={{ marginBottom: "0.5rem" ,marginLeft:"8rem"}}>
              <label>
                Text Color:&nbsp;
                <input
                  type="color"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                />
              </label>
              &nbsp;&nbsp;
              <label>
                Font Size:&nbsp;
                <input
                  type="number"
                  name="fontSize"
                  value={form.fontSize}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div style={{ marginBottom: "0.5rem" ,marginLeft:"14rem"}}>
              <label>
                Background (CSS rgba/hex):&nbsp;
                <input
                  name="background"
                  value={form.background}
                  onChange={handleChange}
                  style={{ width: "50%" }}
                />
              </label>
            </div>
          </>
        )}

        <button type="submit">
          {editingId ? "Update Overlay" : "Create Overlay"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm(defaultForm);
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            Cancel
          </button>
        )}
      </form>
      </center>



      <h3>Existing Overlays</h3>
      <ul>
        {overlays.map((o) => (
          <li key={o._id} style={{ marginBottom: "0.25rem" }}>
            <strong>{o.name}</strong> ({o.type}) – pos: {o.position.x}% ,{" "}
            {o.position.y}% | size: {o.size.width}% x {o.size.height}%&nbsp;
            <button onClick={() => handleEdit(o)}>Edit</button>
            <button
              onClick={() => handleDelete(o._id)}
              style={{ marginLeft: "0.5rem" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverlayEditor;
