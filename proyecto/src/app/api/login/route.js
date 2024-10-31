import {promises as fs} from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

export async function POST(req) {
    const {username, password} = await req.json();

    const filePath = path.join(process.cwd(), 'src/data/users.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(fileData);

    const user = users.find((u) => u.username == username);

    if(user && (await bcrypt.compare(password, user.password))) {
        return new Response(JSON.stringify({username,password}), {
            status: 200
        });
    } else {
        return new Response(JSON.stringify({user}), {
            status: 401
        }) ;
    }

    
}