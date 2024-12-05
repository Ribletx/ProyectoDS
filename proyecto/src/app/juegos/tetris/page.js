"use client";

import { useRouter } from "next/navigation";
import "../tetris/styles.css"; // Importa los estilos directamente
import "./components/Game"// Asegúrate de que esta ruta sea correcta

export default function TetrisPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      {/* Contenedor principal */}
      <div className="flex flex-col items-start mr-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Tetris</h1>
        <button
          onClick={handleBack}
          className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
        >
          Volver
        </button>

        {/* Cuadro de la historia */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">La historia de Tetris</h2>
          <p className="text-sm leading-relaxed">
            Tetris, uno de los videojuegos más icónicos de la historia, fue
            creado en 1984 por Alexey Pajitnov en la Unión Soviética. Su
            popularidad trascendió fronteras, convirtiéndose en un fenómeno
            cultural. Con reglas simples pero una profundidad estratégica
            infinita, Tetris desafía tanto a la mente como a los reflejos.
            <br /><br />
            Hoy, el juego sigue siendo un símbolo de la evolución de los
            videojuegos, uniendo generaciones con su inconfundible mecánica de
            apilar bloques.
          </p>
        </div>
      </div>

      {/* Contenedor del juego */}
      <div className="flex justify-center items-center bg-gray-800 p-6 rounded-lg shadow-md">
        <Game rows={20} columns={10} /> {/* Juego de Tetris */}
      </div>
    </div>
  );
}
