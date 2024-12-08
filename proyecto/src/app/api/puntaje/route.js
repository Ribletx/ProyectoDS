// src/app/api/puntaje/updateHighscore/route.js
import connectDB from '../../../config/db'; // Importar la conexión a la base de datos
import User from '../../../models/User'; // Importamos el modelo User

export async function POST(req) {
  try {
    const data = await req.json(); // Parse JSON body
    const { username, score } = data;

    // Rest of your existing logic remains the same
    if (!username || !score) {
      return new Response(JSON.stringify({ error: 'Faltan parámetros: username o score' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await connectDB();

    const user = await User.findOne({ username });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (score > user.highscore_snake) {
      user.highscore_snake = score;
      await user.save();
    }

    return new Response(JSON.stringify({ 
      message: 'Highscore actualizado', 
      highscore: user.highscore_snake 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar el highscore' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}