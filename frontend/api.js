import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getOverlays = () => axios.get(`${API_BASE}/overlays`);

export const createOverlay = (payload) =>
  axios.post(`${API_BASE}/overlays`, payload);

export const updateOverlay = (id, payload) =>
  axios.put(`${API_BASE}/overlays/${id}`, payload);

export const deleteOverlay = (id) =>
  axios.delete(`${API_BASE}/overlays/${id}`);
