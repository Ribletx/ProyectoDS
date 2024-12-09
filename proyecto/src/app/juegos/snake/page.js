"use client";
import SnakeGame from './snake';
import TopScores from './TopScores'; // Nuevo componente que creamos

const SnakePage = () => {
  const gameName = "snake"; // Aquí definimos el nombre del juego

  return (
    <div 
      className="min-h-screen flex flex-col bg-gray-800 overflow-hidden bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center p-4 space-y-4 lg:space-y-0 lg:space-x-8">
        {/* Contenedor flexible para pantallas grandes */}
        <div className="w-full max-w-xl">
          <SnakeGame />
        </div>
        
        {/* Bloque de Top Scores */}
        <div className="w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl p-0">
          <TopScores game={gameName} /> {/* Pasamos el game como prop */}
        </div>
      </div>
    </div>
  );
};

export default SnakePage;
