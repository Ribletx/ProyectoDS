// /src/app/context/LanguageContext.js
"use client"; // Indica que este archivo debe ser tratado como cliente

import { createContext, useState, useContext } from "react";
import en from "../idiomas/en";
import es from "../idiomas/es";

// Creación del contexto y proveedor de idioma
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en"); // Estado del idioma

  const translations = language === "en" ? en : es; // Traducción en función del idioma

  const changeLanguage = (lang) => setLanguage(lang); // Función para cambiar el idioma

  return (
    <LanguageContext.Provider value={{ translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook para usar el contexto
export const useLanguage = () => useContext(LanguageContext);
