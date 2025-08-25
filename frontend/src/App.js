import React, { useState } from "react";
import LieferantenForm from "./components/LieferantenForm";
import KundenView from "./components/KundenView";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { initDB } from "./api";
import translations from "./i18n";

function App() {
  const [lang, setLang] = useState("de");
  const t = translations[lang];
  const [refreshCount, setRefreshCount] = useState(0);

  const refresh = () => setRefreshCount(c => c + 1);
  const [initMsg, setInitMsg] = useState("");

  const doInit = async () => {
    const res = await initDB();
    setInitMsg(res.success ? t.success : t.error);
    refresh();
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>Lieferanten & Verpackung</h1>
      <LanguageSwitcher lang={lang} setLang={setLang} />
      <button onClick={doInit}>Init (DB & Beispieldaten)</button>
      <div style={{ color: initMsg === t.success ? "green" : "red", margin: "10px 0" }}>{initMsg}</div>
      <LieferantenForm lang={lang} refresh={refresh} />
      <KundenView lang={lang} refresh={refreshCount} />
      <footer style={{ marginTop: 40, color: "#888" }}>Minimalistische MVP Demo</footer>
    </div>
  );
}

export default App;