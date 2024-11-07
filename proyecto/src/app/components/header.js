import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const { translations, changeLanguage } = useLanguage();
  const [username, setUsername] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el menú de idiomas
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Idioma seleccionado

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    changeLanguage(language); // Cambia el idioma en el contexto
    setIsMenuOpen(false); // Cierra el menú después de seleccionar el idioma
  };

  return (
    <header className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-2">
        {/* Botón para cambiar idioma */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center text-white px-4 py-2 rounded"
          >
            {selectedLanguage === 'es' ? 'Español' : 'English'}
            <span className="ml-2">{isMenuOpen ? '▲' : '▼'}</span>
          </button>
          
          {/* Menú desplegable con los idiomas */}
          {isMenuOpen && (
            <div className="absolute bg-white text-black mt-2 rounded shadow-lg w-32">
              <button
                onClick={() => handleLanguageChange('es')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Español
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                English
              </button>
            </div>
          )}
        </div>
      </div>

      <h1 className="text-white text-3xl font-extrabold tracking-widest drop-shadow-lg">
        {translations.headerTitle}
      </h1>

      <div className="flex items-center space-x-2">
        {username ? (
          <>
            <span className="text-gray-300">{translations.welcomeMessage.replace('{name}', username)}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm font-semibold transition transform hover:scale-105 shadow-md"
            >
              {translations.logout}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg text-sm font-semibold transition transform hover:scale-105 shadow-md"
            >
              {translations.signIn}
            </Link>
            <Link
              href="/register"
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg text-sm font-semibold transition transform hover:scale-105 shadow-md"
            >
              {translations.register}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
