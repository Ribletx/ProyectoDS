"use client";
import FlappyBirdGame from './flapyBird';
import TopScores from '../../components/TopScores'; // Correcta referencia relativa
import { useRouter } from 'next/navigation'; // Para manejar la navegación
import { useLanguage } from '../../context/LanguageContext';

const FlappyBirdPage = () => {
  const { translations } = useLanguage();
  const gameName = "flappybird"; // Definimos el nombre del juego
  const router = useRouter(); // Hook para navegación

  return (
    <div 
      className="min-h-screen flex flex-col bg-gray-800 overflow-hidden bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/Flappy_fondo.png')" }}
    >
      {/* Botón para regresar a la página anterior */}
      <div className="p-4">
        <button 
          onClick={() => router.back()} 
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {translations.backButton}
        </button>
      </div>

      {/* Contenedor principal */}
      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center p-4 space-y-4 lg:space-y-0 lg:space-x-8">
        {/* Contenedor flexible para pantallas grandes */}
        <div className="w-full max-w-xl">
          <FlappyBirdGame />
        </div>
        
        {/* Bloque de Top Scores */}
        <div className="w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl p-0">
          <TopScores game={gameName} /> {/* Pasamos el nombre del juego */}
        </div>
      </div>
    </div>
  );
};

export default FlappyBirdPage;
