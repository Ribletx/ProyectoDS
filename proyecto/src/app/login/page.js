"use client";
import Link from "next/link";
import { useState } from "react";
import bcrypt from 'bcryptjs';
// import promises from "fs";
// import promises as fs from "fs/promises";



export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const filePath = path.join(process.cwd(), "src/data/users.json");
    // const fileData = promises.readFile(filePath, "utf-8");
    // const users = JSON.parse(fileData);
    // alert(users);

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(res);
        if(res.ok) {
            alert('Entranste')
        } else {
            alert('No entraste')
        }
    }
    return(
        <div className="bg-green-100 text-4xl flex flex-col gap-2 align-center justify-center h-screen items-center">
            Sign In
            <div className="text-xl w-full max-w-xs">
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                    </div>
                </form>
            </div>     
            <Link href="/">
                Inicio
            </Link>
        </div>
    );
}