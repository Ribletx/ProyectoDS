"use client";

import { useLanguage } from '../context/LanguageContext'; // Ajusta la ruta para importar el contexto de idioma
import Header from '../components/header';
import Footer from '../components/footer';
import Link from 'next/link'; // Importa el componente Link para la navegación

export default function Textos() {
  const { translations } = useLanguage(); // Obtener las traducciones del contexto

  return (
    <div className="min-h-screen flex flex-col text-white bg-cover bg-center" style={{ backgroundImage: "url('/fondo.png')" }}>
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8">
        <div className="bg-gray-700 bg-opacity-60 p-8 rounded-lg shadow-xl text-center w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {translations.mainTextTitle} {/* Título traducido */}
          </h1>

          {/* Botones para acceder a los diferentes textos */}
          <div className="mt-6 space-y-4">
            <p className="text-lg mb-4">{translations.texts}</p> {/* Breve introducción o descripción */}

            {/* Lista de botones que dirigen a diferentes cuentos */}
            <Link href="/arc/app/textos/cuento1">
              <button className="w-full bg-blue-600 py-2 px-4 rounded hover:bg-blue-500">
                {translations.story1Title} {/* Traducción del título del cuento 1 */}
              </button>
            </Link>

            <Link href="/arc/app/textos/cuento2">
              <button className="w-full bg-blue-600 py-2 px-4 rounded hover:bg-blue-500">
                {translations.story2Title} {/* Traducción del título del cuento 2 */}
              </button>
            </Link>

            {/* Agrega más botones para cada cuento o documento */}
            <Link href="/arc/app/textos/documento">
              <button className="w-full bg-blue-600 py-2 px-4 rounded hover:bg-blue-500">
                {translations.documentTitle} {/* Traducción del título del documento */}
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
