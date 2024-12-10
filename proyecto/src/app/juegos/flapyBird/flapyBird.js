"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FlappyBirdGame = () => {
  const { translations } = useLanguage();
  const canvasRef = useRef(null);
  const [birdY, setBirdY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [gravity, setGravity] = useState(0.5);
  const [pipes, setPipes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Función para enviar el puntaje al backend
  const updateHighscore = async (score) => {
    const username = localStorage.getItem("username");

    if (!username) {
      console.log("No se encontró el username");
      return;
    }

    try {
      const response = await fetch("/api/puntaje", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, score, game: "flappybird" }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Highscore actualizado', data.highscore);
      } else {
        console.log('Error al actualizar el highscore:', data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const generatePipe = (canvasWidth, canvasHeight) => {
    const gap = 100; // Espacio entre las tuberías
    const pipeWidth = 60;
    const minPipeHeight = 50;
    const maxPipeHeight = canvasHeight - gap - minPipeHeight;
    const pipeHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight);

    return {
      x: canvasWidth,
      topPipeHeight: pipeHeight,
      bottomPipeHeight: canvasHeight - pipeHeight - gap,
      width: pipeWidth,
      gap: gap,
      scored: false // Nuevo estado para controlar si ya se contabilizó el punto
    };
  };

  const gameLoop = () => {
    if (gameOver || !gameStarted) return;

    const canvas = canvasRef.current;

    setVelocity((prevVelocity) => prevVelocity + gravity);
    setBirdY((prevBirdY) => prevBirdY + velocity);

    setPipes((prevPipes) => {
      const updatedPipes = prevPipes.map((pipe) => ({
        ...pipe,
        x: pipe.x - 3, // Movimiento de las tuberías
      })).filter(pipe => pipe.x > -pipe.width); // Eliminar tuberías fuera de la pantalla

      // Lógica de puntuación mejorada
      const birdLeft = 50;
      const birdRight = birdLeft + 20;

      updatedPipes.forEach((pipe) => {
        // Verificar si el pájaro pasó la tubería sin haber sido puntuado
        if (!pipe.scored && birdRight > pipe.x + pipe.width) {
          setScore((prevScore) => prevScore + 0.5);
          pipe.scored = true; // Marcar como puntuada
        }
      });

      return updatedPipes;
    });

    const birdLeft = 50;
    const birdRight = birdLeft + 20;
    const birdTop = birdY;
    const birdBottom = birdY + 20;

    pipes.forEach((pipe) => {
      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + pipe.width;

      // Verificar colisión con la parte superior de la tubería
      if (
        birdRight > pipeLeft &&
        birdLeft < pipeRight &&
        birdTop < pipe.topPipeHeight
      ) {
        setGameOver(true);
        updateHighscore(score);
      }

      // Verificar colisión con la parte inferior de la tubería
      if (
        birdRight > pipeLeft &&
        birdLeft < pipeRight &&
        birdBottom > canvas.height - pipe.bottomPipeHeight
      ) {
        setGameOver(true);
        updateHighscore(score);
      }
    });

    // Verificar si el pájaro toca el suelo o se va fuera de la pantalla
    if (birdY > canvas.height || birdY < 0) {
      setGameOver(true);
      updateHighscore(score);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      // Fondo color cielo
      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dibujo del pájaro
      ctx.fillStyle = "yellow";
      ctx.fillRect(50, birdY, 20, 20);

      // Dibujo de las tuberías
      pipes.forEach((pipe) => {
        ctx.fillStyle = "green";
        
        // Tubería superior
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.topPipeHeight);
        
        // Tubería inferior
        ctx.fillRect(pipe.x, canvas.height - pipe.bottomPipeHeight, pipe.width, pipe.bottomPipeHeight);
      });
    };

    draw();
  }, [birdY, pipes]);

  useEffect(() => {
    const gameInterval = setInterval(gameLoop, 20);
    return () => {
      clearInterval(gameInterval);
    };
  }, [gameOver, gameStarted, velocity, birdY, pipes]);

  useEffect(() => {
    const pipeGenerationInterval = setInterval(() => {
      if (gameStarted && !gameOver) {
        setPipes((prevPipes) => [
          ...prevPipes,
          generatePipe(canvasRef.current.width, canvasRef.current.height),
        ]);
      }
    }, 2000); // Genera una tubería cada 3 segundos

    return () => {
      clearInterval(pipeGenerationInterval);
    };
  }, [gameStarted, gameOver]);

  const startGame = () => {
    const canvas = canvasRef.current;
    setGameStarted(true);
    setGameOver(false);
    setBirdY(canvas.height / 2);
    setVelocity(0);
    setPipes([generatePipe(canvas.width, canvas.height)]);
    setScore(0);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
  };

  const handleKeyDown = (event) => {
    // Prevenir el desplazamiento por defecto
    if (event.key === " " || event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }

    if ((event.key === " " || event.key === "ArrowUp") && !gameOver) {
      if (!gameStarted) {
        startGame();
      }
      setVelocity(-6); // Velocidad de salto más suave
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStarted, gameOver]);

  return (
    <div className="min-h-screen flex flex-col bg-sky-500 text-white items-center justify-center">
      <h1 className="text-4xl mb-4 bg-gray-800 rounded-xl p-3 bg-opacity-30">{translations.flappyBirdGameTitle || "Juego de Flappy Bird"}</h1>
      <canvas ref={canvasRef} width={400} height={600} className="border border-white"></canvas>
      <div className="flex flex-col items-center mt-4">
        <h2 className="text-xl bg-blue-800 bg-opacity-90 rounded-xl p-2 ">{translations.scoreLabel || "Puntaje:"} {score}</h2>
        {gameOver && (
          <>
            <h2 className="text-2xl text-red-500 mt-4 bg-gray-800 rounded-xl p-3 bg-opacity-30">{translations.gameOver || "Game Over"}</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg mt-2" onClick={restartGame}>
              {translations.restartButton || "Reiniciar"}
            </button>
          </>
        )}
        {!gameStarted && !gameOver && (
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg mt-2" onClick={startGame}>
            {translations.startButton || "Comenzar Juego"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FlappyBirdGame;
