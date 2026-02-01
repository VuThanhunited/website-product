import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/LanguageSelector.css";

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="language-selector">
      <button
        className={`lang-btn ${language === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")}
        title="English"
      >
        EN
      </button>
      <span className="lang-divider">|</span>
      <button
        className={`lang-btn ${language === "vi" ? "active" : ""}`}
        onClick={() => changeLanguage("vi")}
        title="Tiếng Việt"
      >
        VI
      </button>
    </div>
  );
};

export default LanguageSelector;
