import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const { username, password } = await req.json();
    
    const filePath = path.join(process.cwd(), 'src/data/users.json');
    let users = [];
//
    // Leer el archivo JSON y manejar errores
    try {
        const fileData = await fs.readFile(filePath, 'utf-8');
        users = JSON.parse(fileData);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error al leer los usuarios." }), {
            status: 500,
        });
    }

    // Verificar si el usuario ya existe
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
        return new Response(JSON.stringify({ message: "El usuario ya existe." }), {
            status: 400,
        });
    }

    // Hash de la contraseña
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = {
        username,
        password: hashPass,
    };

    users.push(newUser); // Agregar nuevo usuario al array

    // Guardar los usuarios en el archivo JSON y manejar errores
    try {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2)); // Agrega una mejor legibilidad
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error al guardar el usuario." }), {
            status: 500,
        });
    }

    return new Response(JSON.stringify({ message: "Usuario creado con éxito." }), {
        status: 200,
    });
}
