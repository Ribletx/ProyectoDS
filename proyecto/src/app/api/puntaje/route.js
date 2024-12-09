import connectDB from '../../../config/db';
import User from '../../../models/User';

export async function GET(req) {
  const urlParams = new URL(req.url).searchParams;
  const game = urlParams.get('game') || 'snake'; // Por defecto, juego Snake

  try {
    await connectDB();
    const scoreField = `highscore_${game}`;

    const topScores = await User.find({ [scoreField]: { $gt: 0 } })
      .sort({ [scoreField]: -1 })
      .limit(5)
      .select(`username ${scoreField}`);

    return new Response(JSON.stringify(topScores), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener top scores:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener top scores' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    const { username, score, game } = await req.json();

    if (!username || !score || !game) {
      return new Response(JSON.stringify({ error: 'Faltan parámetros: username, score o game' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();
    const scoreField = `highscore_${game}`;
    const user = await User.findOne({ username });

    if (user) {
      if (score > (user[scoreField] || 0)) {
        user[scoreField] = score;
        await user.save();
      }
    } else {
      const newUser = new User({ username, [scoreField]: score });
      await newUser.save();
    }

    return new Response(JSON.stringify({ message: 'Highscore actualizado' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar el highscore' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
