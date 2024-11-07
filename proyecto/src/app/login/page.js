"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Nueva importación

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter(); // Instancia de useRouter

    const handleLogin = async (e) => {
        e.preventDefault();
        setUsernameError(false);
        setPasswordError(false);
        setErrorMessage("");

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            // Guardamos el nombre de usuario en el localStorage
            localStorage.setItem("username", username);
            router.push("/"); // Redirige a la página principal
        } else {
            const data = await res.json();
            setErrorMessage(data.message || 'Credenciales incorrectas.');
            if (data.message.includes("usuario")) {
                setUsernameError(true);
            }
            if (data.message.includes("contraseña")) {
                setPasswordError(true);
            }
        }
    };

    return (
        <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-6">Iniciar Sesión</h1>
            <div className="text-xl w-full max-w-xs">
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${usernameError ? 'border-red-500' : ''}`}
                            id="username"
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''}`}
                            id="password"
                            type="password"
                            placeholder="******************"
                            //value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
            <Link href="/" className="text-blue-600 hover:text-blue-800">Volver al inicio</Link>
        </div>
    );
}
