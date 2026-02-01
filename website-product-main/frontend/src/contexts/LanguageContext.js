import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Lấy ngôn ngữ đã lưu từ localStorage, mặc định là 'vi'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "vi";
  });

  // Lưu vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  const changeLanguage = (lang) => {
    if (lang === "en" || lang === "vi") {
      setLanguage(lang);
    }
  };

  const value = {
    language,
    toggleLanguage,
    changeLanguage,
    isEnglish: language === "en",
    isVietnamese: language === "vi",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
