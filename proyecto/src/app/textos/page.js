"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/header";
import Footer from "../components/footer";
import librosData from "../../data/libros.json";

export default function Textos() {
  const { translations } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(librosData.libros);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const filtered = librosData.libros.filter(
        (libro) =>
          libro.nombre.toLowerCase().includes(term) ||
          libro.author.toLowerCase().includes(term)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(librosData.libros);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('/libr4.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Header />

      <main className="flex-grow flex flex-col items-center px-4 md:px-8">
        <div className="w-full max-w-3xl mt-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={translations.searchPlaceholder}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8"
          style={{
            padding: "0 10px",
            boxSizing: "border-box",
          }}
        >
          {filteredBooks.map((libro, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-95 p-4 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 transform hover:bg-gray-700 hover:scale-105 hover:shadow-xl"
            >
              <a
                href={libro.pdf ? `/pdf/${libro.pdf}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={libro.foto}
                  alt={libro.nombre}
                  className="w-32 h-42 object-cover my-4 rounded transition-all duration-300"
                />
              </a>
              <h2 className="text-xl font-semibold text-gray-300 transition-all duration-300 hover:text-white">
                {libro.nombre}
              </h2>
              <p className="text-sm text-gray-300 transition-all duration-300 hover:text-white">
                {libro.author}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
