import React, { useEffect, useState } from "react";
import { getParts, updatePartStatus } from "../api";
import translations from "../i18n";

function KundenView({ lang, refresh }) {
  const t = translations[lang];
  const [parts, setParts] = useState([]);
  const [note, setNote] = useState({});

  useEffect(() => {
    getParts().then(setParts);
  }, [refresh]);

  const handleStatus = async (id, status) => {
    let customer_note = status === "fehlerhaft" ? note[id] || "" : "";
    await updatePartStatus(id, status, customer_note);
    setNote({ ...note, [id]: "" });
    refresh();
  };

  return (
    <div style={{ margin: "20px 0", padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{t.customerView}</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>{t.supplier}</th>
            <th>{t.part}</th>
            <th>{t.packaging}</th>
            <th>{t.status}</th>
            <th>{t.note}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {parts.map(p => (
            <tr key={p.id} style={{ background: p.status === "fehlerhaft" ? "#ffe5e5" : p.status === "freigegeben" ? "#e5ffe5" : "#fff" }}>
              <td>{p.supplier_name}</td>
              <td>{p.name}</td>
              <td>{p.packaging}</td>
              <td>
                {p.status === "offen" ? t.open : p.status === "freigegeben" ? t.approved : t.incorrect}
              </td>
              <td>
                {p.customer_note}
                {p.status === "offen" && (
                  <input
                    placeholder={t.note}
                    value={note[p.id] || ""}
                    style={{ width: "80px" }}
                    onChange={e => setNote({ ...note, [p.id]: e.target.value })}
                  />
                )}
              </td>
              <td>
                {p.status === "offen" && (
                  <>
                    <button onClick={() => handleStatus(p.id, "freigegeben")}>{t.approve}</button>
                    <button onClick={() => handleStatus(p.id, "fehlerhaft")}>{t.reject}</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KundenView;