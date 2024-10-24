// src/context/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Cargar el token y usuario del localStorage al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función de registro
  const register = async (username, password) => {
    // Obtener los usuarios almacenados
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el usuario ya existe
    const userExists = storedUsers.find((u) => u.username === username);
    if (userExists) {
      alert("El usuario ya existe");
      return;
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = { username, password: hashedPassword };

    // Guardar el nuevo usuario en el localStorage
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Iniciar sesión automáticamente después de registrar
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    // Redirigir al dashboard
    router.push("/dashboard");
  };

  // Función de inicio de sesión
  const login = async (username, password) => {
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find((u) => u.username === username);

    if (foundUser) {
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        router.push("/dashboard");
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Usuario no encontrado");
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}