// src/app/dashboard.js
"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth(); // Obtenemos el usuario y la función logout del contexto
  const router = useRouter();
  const [welcomeMessage, setWelcomeMessage] = useState(""); // Estado para el mensaje de bienvenida

  // Redirigir al login si no hay usuario autenticado
  useEffect(() => {
    if (!user) {
      router.push("/login"); // Si no hay usuario, redirige al login
    } else {
      setWelcomeMessage(`¡Registro exitoso, ${user.username}!`); // Si el usuario está logueado, mostrar el mensaje de éxito
    }
  }, [user, router]);

  if (!user) return null; // No mostrar nada si no hay usuario (para evitar parpadeos)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">{welcomeMessage}</h1> {/* Mensaje de bienvenida con el nombre del usuario */}
      <p className="text-lg mb-8">Has sido registrado con éxito.</p> {/* Confirmación de registro exitoso */}
      
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar sesión
      </button> {/* Botón para cerrar sesión */}
    </div>
  );
}