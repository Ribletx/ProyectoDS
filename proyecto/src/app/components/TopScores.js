"use client";

import React, { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';

const TopScores = ({ game }) => {
  const [topScores, setTopScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await fetch(`/api/puntaje?game=${game}`);
        if (!response.ok) {
          throw new Error('No se pudieron cargar los top scores');
        }
        const data = await response.json();
        setTopScores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopScores();
  }, [game]);

  if (isLoading) {
    return (
      <div className="bg-gray-900 backdrop-blur-sm rounded-xl p-4 text-white">
        <div className="flex items-center justify-center">
          <h2 className="text-xl font-bold">Cargando Highscores...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 backdrop-blur-sm rounded-xl p-4 text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-xl">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-xl flex items-center">
        <Crown className="mr-2" />
        <h2 className="text-2xl font-bold">HIGHSCORES</h2>
      </div>
      <div className="p-4">
        {topScores.length === 0 ? (
          <div className="text-white text-center">No hay highscores aún</div>
        ) : (
          <ul className="space-y-2">
            {topScores.map((score, index) => (
              <li key={index} className="flex justify-between items-center p-2 rounded-lg text-white">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">
                    {index + 1}. {score.username}
                  </span>
                </div>
                <span className="font-bold">{score[`highscore_${game}`]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopScores;
