import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const { username, password } = await req.json();

    const filePath = path.join(process.cwd(), 'src/data/users.json');
    let users = [];

    try {
        const fileData = await fs.readFile(filePath, 'utf-8');
        users = JSON.parse(fileData);
    } catch (error) {
        console.error("Error reading users:", error);
        return new Response(JSON.stringify({ message: "Error al leer los usuarios." }), { status: 500 });
    }

    const user = users.find((u) => u.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
        return new Response(JSON.stringify({ message: "Inicio de sesión exitoso." }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Usuario o contraseña incorrectos." }), { status: 401 });
    }
}
