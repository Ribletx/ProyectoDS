"use client";

import { createContext, useState, useContext, useEffect } from "react";
import en from "../idiomas/en";
import es from "../idiomas/es";

// Creación del contexto y proveedor de idioma
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Recuperar el idioma guardado en localStorage (por defecto 'en' si no existe)
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "en";
    }
    return "en"; // Valor por defecto en caso de que no haya acceso a localStorage
  });

  const translations = language === "en" ? en : es;

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang); // Guardamos la preferencia en localStorage
  };

  return (
    <LanguageContext.Provider value={{ translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook para usar el contexto
export const useLanguage = () => useContext(LanguageContext);
