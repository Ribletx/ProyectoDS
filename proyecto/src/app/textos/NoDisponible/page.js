"use client";

import { useState, useEffect } from "react";

export default function NoDisponible() {
  // Estado para manejar el idioma
  const [language, setLanguage] = useState("es");

  const translations = {
    es: {
      title: "El libro no se encuentra disponible",
      message: "Lamentamos la inconveniencia, pero el PDF del libro no está disponible en este momento.",
      back: "Volver Atrás",
    },
    en: {
      title: "The book is not available",
      message: "We apologize for the inconvenience, but the book's PDF is not available at this time.",
      back: "Go Back",
    },
  };

  // Persistencia del idioma seleccionado
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('/libr4.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8">
        <div className="bg-white bg-opacity-80 rounded-lg p-6 text-center shadow-lg">
          <h1 className="text-4xl font-semibold text-gray-800 my-4">
            {translations[language].title}
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            {translations[language].message}
          </p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {translations[language].back}
        </button>
      </main>
    </div>
  );
}
