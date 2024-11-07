import { useLanguage } from '../context/LanguageContext'; // Importamos el hook para acceder al contexto de idioma

export default function Header() {
  const { translations } = useLanguage(); // Usamos el hook para obtener las traducciones basadas en el idioma seleccionado

  return (
    <header className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 flex items-center justify-center shadow-lg">
      <h1 className="text-white text-3xl font-extrabold tracking-widest drop-shadow-lg">
        {translations.headerTitle} {/* Usamos la traducción de headerTitle */}
      </h1>
    </header>
  );
}
