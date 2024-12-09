// src/app/api/topscore/route.js
import User from '../../../models/User';
import connectDB from '../../../config/db';

export async function GET() {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Buscar los top 5 usuarios ordenados por highscore de snake de mayor a menor
    const topScores = await User.find({ highscore_snake: { $gt: 0 } })
      .sort({ highscore_snake: -1 })
      .limit(5)
      .select('username highscore_snake');

    // Devolver los resultados
    return new Response(JSON.stringify(topScores), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error al obtener top scores:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener top scores' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}