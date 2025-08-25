import React, { useState, useEffect } from "react";
import { getSuppliers, addPart } from "../api";
import translations from "../i18n";

function LieferantenForm({ lang, refresh }) {
  const t = translations[lang];
  const [supplierId, setSupplierId] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [part, setPart] = useState("");
  const [packaging, setPackaging] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getSuppliers().then(setSuppliers);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!supplierId || !part || !packaging) return setMsg(t.error + ": Alle Felder ausfüllen.");
    await addPart({ supplier_id: supplierId, name: part, packaging });
    setMsg(t.success);
    setPart("");
    setPackaging("");
    refresh();
  };

  return (
    <div style={{ margin: "20px 0", padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{t.supplierView}</h2>
      <form onSubmit={submit}>
        <label>
          {t.supplier}:{" "}
          <select value={supplierId} onChange={e => setSupplierId(e.target.value)}>
            <option value="">--</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          {t.part}:{" "}
          <input value={part} onChange={e => setPart(e.target.value)} />
        </label>
        <br />
        <label>
          {t.packaging}:{" "}
          <input value={packaging} onChange={e => setPackaging(e.target.value)} />
        </label>
        <br />
        <button type="submit">{t.submit}</button>
      </form>
      <div style={{ color: msg === t.success ? "green" : "red", marginTop: "10px" }}>{msg}</div>
    </div>
  );
}

export default LieferantenForm;