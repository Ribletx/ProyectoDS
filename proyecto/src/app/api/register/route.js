import {promises as fs} from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

export async function POST(req) {
    const {username, password} = await req.json();

    const filePath = path.join(process.cwd(), 'src/data/users.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(fileData);

    const exsistinguser = users.find((u) => u.username == username);

    if(exsistinguser) {
        return new Response(JSON.stringify({message: "El usuario Existe"}), {
            status: 400
        });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = {
        username,
        password: hashPass
    };

    users.push(newUser);

    await fs.writeFile(filePath, JSON.stringify(users));

    return new Response(JSON.stringify({message:"Usuario Creado"}), {
        status: 200
    });

    
}