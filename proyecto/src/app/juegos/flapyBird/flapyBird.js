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

  const generatePipe = () => {
    const gap = 80;
    const pipeWidth = 40;
    const pipeHeight = Math.floor(Math.random() * (canvasRef.current.height - gap));

    return {
      x: canvasRef.current.width,
      y: pipeHeight,
      gap: gap,
      width: pipeWidth,
    };
  };

  const gameLoop = () => {
    if (gameOver) return;

    setVelocity((prevVelocity) => prevVelocity + gravity);
    setBirdY((prevBirdY) => prevBirdY + velocity);

    setPipes((prevPipes) => {
      const updatedPipes = prevPipes.map((pipe) => ({
        ...pipe,
        x: pipe.x - 2,
      }));

      if (updatedPipes[0].x < -updatedPipes[0].width) {
        updatedPipes.shift();
        updatedPipes.push(generatePipe());
        setScore((prevScore) => prevScore + 1);
      }

      return updatedPipes;
    });

    pipes.forEach((pipe) => {
      if (
        (birdY < pipe.y || birdY > pipe.y + pipe.gap) &&
        pipe.x < 50 &&
        pipe.x + pipe.width > 0
      ) {
        setGameOver(true);
      }
    });

    if (birdY > canvasRef.current.height || birdY < 0) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "yellow";
      ctx.fillRect(50, birdY, 20, 20);

      pipes.forEach((pipe) => {
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipe.gap, pipe.width, canvas.height - pipe.y - pipe.gap);
      });
    };

    draw();
  }, [birdY, pipes]);

  useEffect(() => {
    const gameInterval = setInterval(gameLoop, 20);

    if (pipes.length === 0) {
      setPipes([generatePipe()]);
    }

    return () => clearInterval(gameInterval);
  }, [birdY, gameOver, pipes]);

  const handleJump = () => {
    if (!gameOver) {
      setVelocity(-6);
    }
  };

  // Detectar la tecla de espacio para saltar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  const restartGame = () => {
    setBirdY(200);
    setVelocity(0);
    setPipes([generatePipe()]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-2">{translations.flappyBirdTitle || "Flappy Bird"}</h1>
      <canvas ref={canvasRef} width={250} height={400} className="border border-white mb-4"></canvas>
      <div className="text-center">
        <h2 className="text-lg">{translations.scoreLabel || "Puntuación:"} {score}</h2>
        {gameOver && (
          <>
            <h2 className="text-lg text-red-500 mt-2">{translations.gameOver || "Game Over"}</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg mt-2" onClick={restartGame}>
              {translations.restartButton || "Reiniciar"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FlappyBirdGame;
