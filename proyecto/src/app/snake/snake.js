"use client"; // Añade esta línea para marcar el archivo como cliente

import React, { useEffect, useRef, useState } from 'react';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false); // Estado para manejar el juego terminado

  const generateFood = (snake, canvasWidth, canvasHeight) => {
    let newFood;
    // Genera comida en una posición no ocupada por la serpiente
    do {
      newFood = {
        x: Math.floor(Math.random() * (canvasWidth)),
        y: Math.floor(Math.random() * (canvasHeight)),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Lógica básica del juego de Snake
    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 1, y: 0 }; // Movimiento inicial a la derecha
    const scale = 20; // Tamaño de la cuadrícula
    const canvasWidth = canvas.width / scale; // Ancho del canvas en unidades de escala
    const canvasHeight = canvas.height / scale; // Alto del canvas en unidades de escala
    let food = generateFood(snake, canvasWidth, canvasHeight); // Genera comida en una posición válida

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el lienzo

      // Dibuja la comida
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x * scale, food.y * scale, scale, scale);

      // Dibuja la serpiente
      ctx.fillStyle = 'green';
      snake.forEach((segment) => {
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
      });
    };

    const checkCollision = (head) => {
      // Verifica si la cabeza choca con el cuerpo
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return true;
      }
      return false;
    };

    const update = () => {
      if (gameOver) return; // Detiene el juego si ya terminó

      // Actualiza la posición de la serpiente
      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };

      // Verifica colisiones con el borde y ajusta la posición si es necesario
      if (newHead.x < 0) newHead.x = canvasWidth - 1; // Aparece por la derecha
      else if (newHead.x >= canvasWidth) newHead.x = 0; // Aparece por la izquierda
      else if (newHead.y < 0) newHead.y = canvasHeight - 1; // Aparece por abajo
      else if (newHead.y >= canvasHeight) newHead.y = 0; // Aparece por arriba

      // Verifica colisiones con el cuerpo
      if (checkCollision(newHead)) {
        setGameOver(true); // Si hay colisión, termina el juego
        return;
      }

      // Verifica si la serpiente ha comido la comida
      if (newHead.x === food.x && newHead.y === food.y) {
        snake.unshift(newHead); // Agrega la nueva cabeza
        food = generateFood(snake, canvasWidth, canvasHeight); // Genera nueva comida en una posición válida
      } else {
        snake.unshift(newHead); // Agrega la nueva cabeza
        snake.pop(); // Elimina la cola
      }

      // Dibuja la serpiente y la comida
      draw();
    };

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction.y === 0) direction = { x: 0, y: -1 }; // Cambia dirección hacia arriba si no va hacia abajo
          break;
        case 'ArrowDown':
          if (direction.y === 0) direction = { x: 0, y: 1 }; // Cambia dirección hacia abajo si no va hacia arriba
          break;
        case 'ArrowLeft':
          if (direction.x === 0) direction = { x: -1, y: 0 }; // Cambia dirección hacia la izquierda si no va hacia la derecha
          break;
        case 'ArrowRight':
          if (direction.x === 0) direction = { x: 1, y: 0 }; // Cambia dirección hacia la derecha si no va hacia la izquierda
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(update, 100); // Actualiza el juego cada 100 ms

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver]); // Añadir gameOver como dependencia

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white items-center justify-center">
      <h1 className="text-4xl mb-4">Juego de Snake</h1>
      <canvas ref={canvasRef} width={400} height={400} className="border border-white"></canvas>
      {/* Contenedor para Game Over y botones, alineados bajo el canvas */}
      <div className="flex flex-col items-center mt-4">
        {gameOver && (
          <>
            <h2 className="text-2xl text-red-500 mt-4">Game Over</h2>
            <div className="flex space-x-4 mt-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => window.location.reload()}>
                Reiniciar
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => window.history.back()}>
                Regresar
              </button>
            </div>
          </>
        )}
      </div>
      {/* Botón de regresar visible solo cuando no hay Game Over */}
      {!gameOver && (
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => window.history.back()}>
          Regresar
        </button>
      )}
    </div>
  );
};

export default SnakeGame;
