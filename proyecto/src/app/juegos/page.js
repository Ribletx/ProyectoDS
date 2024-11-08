"use client";

import { useLanguage } from '../context/LanguageContext';
import Header from '../components/header';
import Footer from '../components/footer';
import Link from "next/link";

export default function Home() {
  const { translations } = useLanguage(); // Obtener las traducciones del contexto

  return (
    <div 
      className="min-h-screen flex flex-col text-white bg-cover bg-center" 
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8">
        <div className="bg-gray-700 bg-opacity-60 p-8 rounded-lg shadow-xl text-center w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {translations.mainGameTitle} {/* Título traducido */}
          </h1>

          {/* Contenedor de los botones de los juegos */}
          <div className="mt-6 flex space-x-4 flex-col"> 
            {/* Botón para ir a la sección de Snake */}
            <Link href="/juegos/snake">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md">
                {translations.playSnake}
              </button>
            </Link>

            {/* Botón para ir a la sección de Space */}
            <Link href="/juegos/space">
              <button className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md">
                {translations.playSpace}
              </button>
            </Link>

             {/* Botón para ir a la sección de flapyBird */}
             <Link href="/juegos/flapyBird">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md">
                {translations.playFlapy}
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
