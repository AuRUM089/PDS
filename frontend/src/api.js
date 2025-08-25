const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

export async function getSuppliers() {
  const res = await fetch(`${API_BASE}/suppliers`);
  return res.json();
}
export async function getParts() {
  const res = await fetch(`${API_BASE}/parts`);
  return res.json();
}
export async function addPart(data) {
  const res = await fetch(`${API_BASE}/parts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
export async function updatePartStatus(id, status, customer_note = "") {
  const res = await fetch(`${API_BASE}/parts/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, customer_note })
  });
  return res.json();
}
export async function initDB() {
  const res = await fetch(`${API_BASE}/init`, { method: "POST" });
  return res.json();
}