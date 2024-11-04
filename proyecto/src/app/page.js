"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from './components/header';
import Footer from './components/footer';
import translations from './locales/translations';

export default function Home() {
  const [language, setLanguage] = useState('es'); // idioma por defecto
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Obtiene el nombre de usuario desde localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null); // Actualizar el estado para que la interfaz muestre el mensaje de login
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8">
        <div className="bg-gray-700 bg-opacity-60 p-8 rounded-lg shadow-xl text-center w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{translations[language].mainTitle}</h1>
          
          {username ? (
            <>
              <p className="text-gray-300 text-lg mb-6">
                Bienvenido, {username}!
              </p>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-300 text-lg mb-6">
                {translations[language].welcomeMessage.replace("{name}", "Usuario")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-semibold text-center transition transform hover:scale-105 shadow-md">
                  {translations[language].signIn}
                </Link>
                <Link href="/register" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-lg font-semibold text-center transition transform hover:scale-105 shadow-md">
                  {translations[language].register}
                </Link>
              </div>
            </>
          )}
          
          <div className="mt-6">
            <Link href="/snake">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-md">
                {translations[language].playSnake}
              </button>
            </Link>
          </div>
        </div>
        
        <div className="mt-4">
          <button onClick={() => changeLanguage('es')} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Español
          </button>
          <button onClick={() => changeLanguage('en')} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded ml-2">
            English
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

