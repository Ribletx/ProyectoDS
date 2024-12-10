"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SpaceInvadersGame from "./space";

export default function SpacePage() {
  const router = useRouter();

  // Estados para manejar el idioma y las traducciones
  const [language, setLanguage] = useState("es");

  const translations = {
    es: {
      spaceInvadersTitle: "Space Invaders",
      back: "Volver",
      storyTitle: "La Historia del juego:",
      storyText: `
      Space Invaders es un videojuego arcade creado por Tomohiro Nishikado, lanzado en 1978. 
      Fue desarrollado por Taito en Japón y distribuido por Midway en otros países. 
      Este juego marcó un antes y un después en la industria de los videojuegos, siendo uno de los primeros grandes éxitos comerciales. 
      Ambientado en una invasión alienígena, el jugador controla una nave que debe defender la Tierra de las hordas extraterrestres. 
      Su diseño minimalista y su creciente dificultad cautivaron a millones, sentando las bases de los juegos de disparos modernos.
      `,
    },
    en: {
      spaceInvadersTitle: "Space Invaders",
      back: "Back",
      storyTitle: "The Story of the Game:",
      storyText: `
      Space Invaders is an arcade video game created by Tomohiro Nishikado, released in 1978. 
      It was developed by Taito in Japan and distributed by Midway in other countries. 
      This game marked a before and after in the video game industry, being one of the first great commercial successes. 
      Set during an alien invasion, the player controls a ship that must defend Earth from alien hordes. 
      Its minimalist design and increasing difficulty captivated millions, laying the foundation for modern shooters.
      `,
    },
  };

  // Guardar el idioma seleccionado en localStorage para persistencia
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-black text-white"
      style={{ backgroundImage: "url('/spaceinv.jpg')", backgroundSize: "cover" }}
    >
      <div className="flex flex-col items-start mr-8 max-w-md w-full p-4">
        {/* Contenedor para el título, botón y cuento */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center sm:text-left">
          {translations[language].spaceInvadersTitle}
        </h1>
        <button
          onClick={handleBack}
          className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4 self-center sm:self-start"
        >
          {translations[language].back}
        </button>

        {/* Cuento */}
        <div className="bg-gray-800 p-4 rounded-lg mt-4 max-h-[250px] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">{translations[language].storyTitle}</h2>
          <p className="text-sm leading-relaxed">{translations[language].storyText}</p>
        </div>
      </div>

      {/* Componente del juego alineado a la derecha */}
      <div className="flex justify-center w-full sm:w-auto mt-4 sm:mt-0">
        <SpaceInvadersGame />
      </div>
    </div>
  );
}
