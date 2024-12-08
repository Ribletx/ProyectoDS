"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const SnakeGame = () => {
  const { translations } = useLanguage();
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [appleCount, setAppleCount] = useState(0);

  // Función para enviar el puntaje al backend
  const updateHighscore = async (score) => {
    const username = localStorage.getItem("username");

    if (!username) {
      console.log("No se encontró el username");
      return;
    }

    const response = await fetch("/api/puntaje", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, score }) // Enviamos el username y el score al backend
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Highscore actualizado', data.highscore);
    } else {
      console.log('Error al actualizar el highscore:', data.error);
    }
  };

  const generateFood = (snake, canvasWidth, canvasHeight) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * canvasWidth),
        y: Math.floor(Math.random() * canvasHeight),
      };
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 1, y: 0 }; // Movimiento inicial
    const directionQueue = []; // Cola de direcciones
    const scale = 20;
    const canvasWidth = canvas.width / scale;
    const canvasHeight = canvas.height / scale;
    let food = generateFood(snake, canvasWidth, canvasHeight);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
      ctx.fillStyle = "green";
      snake.forEach((segment) => {
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
      });
    };

    const checkCollision = (head) => {
      return snake.some((segment) => segment.x === head.x && segment.y === head.y);
    };

    const update = () => {
      if (gameOver) {
        // Llamada para actualizar el highscore solo cuando el juego termine
        updateHighscore(appleCount);  // Enviamos el puntaje actual
        return;
      }

      // Procesar la cola de direcciones
      if (directionQueue.length > 0) {
        const newDirection = directionQueue.shift();
        // Evitar movimientos opuestos
        if (!(direction.x === -newDirection.x && direction.y === -newDirection.y)) {
          direction = newDirection;
        }
      }

      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };

      // Manejo de bordes
      if (newHead.x < 0) newHead.x = canvasWidth - 1;
      else if (newHead.x >= canvasWidth) newHead.x = 0;
      else if (newHead.y < 0) newHead.y = canvasHeight - 1;
      else if (newHead.y >= canvasHeight) newHead.y = 0;

      if (checkCollision(newHead)) {
        setGameOver(true);
        return;
      }

      if (newHead.x === food.x && newHead.y === food.y) {
        snake.unshift(newHead);
        setAppleCount((prevCount) => prevCount + 1);
        food = generateFood(snake, canvasWidth, canvasHeight);
      } else {
        snake.unshift(newHead);
        snake.pop();
      }

      draw();
    };

    const handleKeyDown = (event) => {
      const newDirection = (() => {
        switch (event.key) {
          case "ArrowUp":
            return direction.y === 0 ? { x: 0, y: -1 } : null;
          case "ArrowDown":
            return direction.y === 0 ? { x: 0, y: 1 } : null;
          case "ArrowLeft":
            return direction.x === 0 ? { x: -1, y: 0 } : null;
          case "ArrowRight":
            return direction.x === 0 ? { x: 1, y: 0 } : null;
          default:
            return null;
        }
      })();

      if (newDirection) {
        const lastDirection = directionQueue.length > 0 ? directionQueue[directionQueue.length - 1] : direction;
        if (!(lastDirection.x === -newDirection.x && lastDirection.y === -newDirection.y)) {
          directionQueue.push(newDirection);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const interval = setInterval(update, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);

  const restartGame = () => {
    setGameOver(false);
    setAppleCount(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white items-center justify-center">
      <h1 className="text-4xl mb-4">{translations.snakeGameTitle || "Juego de Snake"}</h1>
      <canvas ref={canvasRef} width={400} height={400} className="border border-white"></canvas>
      <div className="flex flex-col items-center mt-4">
        <h2 className="text-xl">
          {translations.appleCountLabel || "Manzanas recolectadas:"} {appleCount}
        </h2>
        {gameOver && (
          <>
            <h2 className="text-2xl text-red-500 mt-4">{translations.gameOver || "Game Over"}</h2>
            <div className="flex space-x-4 mt-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={restartGame}
              >
                {translations.restartButton || "Reiniciar"}
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={() => window.history.back()}
              >
                {translations.backButton || "Regresar"}
              </button>
            </div>
          </>
        )}
      </div>
      {!gameOver && (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={() => window.history.back()}
        >
          {translations.backButton || "Regresar"}
        </button>
      )}
    </div>
  );
};

export default SnakeGame;
