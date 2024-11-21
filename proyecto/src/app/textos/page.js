"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext"; // Ajusta la ruta para importar el contexto de idioma
import Header from "../components/header";
import Footer from "../components/footer";
import librosData from "../../data/libros.json"; // Importa los datos del JSON

export default function Textos() {
  const { translations } = useLanguage(); // Obtener las traducciones del contexto
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(librosData.libros); // Estado para almacenar libros filtrados

  // Función para manejar la entrada en la barra de búsqueda
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filtrar los libros según el término de búsqueda
    if (term) {
      const filtered = librosData.libros.filter(
        (libro) =>
          libro.nombre.toLowerCase().includes(term) ||
          libro.author.toLowerCase().includes(term)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(librosData.libros); // Mostrar todos los libros si no hay término de búsqueda
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <Header />

      <main className="flex-grow flex flex-col items-center px-4 md:px-8">
        {/* Contenedor para el buscador */}
        <div className="w-full max-w-3xl mt-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Busca por título o autor..."
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Contenedor para los libros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {filteredBooks.map((libro, index) => (
            <div
              key={index}
              className="bg-gray-700 bg-opacity-80 p-4 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <img
                src={libro.foto}
                alt={libro.nombre}
                className="w-32 h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{libro.nombre}</h2>
              <p className="text-sm text-gray-300">{libro.author}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
