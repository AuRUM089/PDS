import React from "react";
import translations from "../i18n";

function LanguageSwitcher({ lang, setLang }) {
  return (
    <div style={{ margin: "10px 0" }}>
      {translations[lang].language}:&nbsp;
      <button disabled={lang === "de"} onClick={() => setLang("de")}>
        Deutsch
      </button>
      <button disabled={lang === "en"} onClick={() => setLang("en")}>
        English
      </button>
    </div>
  );
}

export default LanguageSwitcher;