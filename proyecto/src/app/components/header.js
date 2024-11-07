import { useLanguage } from '../context/LanguageContext'; // Importamos el hook del contexto

export default function Header() {
  const { translations, changeLanguage } = useLanguage(); // Usamos el hook para obtener las traducciones y la función de cambio de idioma

  return (
    <header className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
      <h1 className="text-white text-3xl font-extrabold tracking-widest drop-shadow-lg">
        {translations.headerTitle} {/* Usamos la traducción de headerTitle */}
      </h1>

      {/* Botones de cambio de idioma */}
      <div className="flex space-x-2">
        <button onClick={() => changeLanguage('es')} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          Español
        </button>
        <button onClick={() => changeLanguage('en')} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          English
        </button>
      </div>
    </header>
  );
}
