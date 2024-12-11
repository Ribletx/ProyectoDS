"use client";
import React, { useRef, useEffect, useState } from "react";
import { useLanguage } from '../../context/LanguageContext';

const PingPongGame = ({ gameMode }) => {
  const { translations } = useLanguage();
  const canvasRef = useRef(null);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Constantes del juego
    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballRadius = 10;
    const maxBallSpeed = 8; // Velocidad máxima de la pelota
    const paddleSpeed = 8;
    const initialBallSpeed = 3;

    let leftPaddleY = (canvas.height - paddleHeight) / 2;
    let rightPaddleY = (canvas.height - paddleHeight) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballDX = initialBallSpeed * (Math.random() > 0.5 ? 1 : -1);
    let ballDY = initialBallSpeed * (Math.random() > 0.5 ? 1 : -1);

    let leftPaddleDirection = 0;
    let rightPaddleDirection = 0;

    const draw = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
      ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      ctx.font = "30px Arial";
      ctx.fillText(leftScore, canvas.width / 4, 30);
      ctx.fillText(rightScore, (3 * canvas.width) / 4, 30);
    };

    const update = () => {
      ballX += ballDX;
      ballY += ballDY;

      // Rebote en las paredes superior e inferior
      if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballDY *= -1;
      }

      // Rebote en las palas
      if (
        ballX - ballRadius <= paddleWidth &&
        ballY > leftPaddleY &&
        ballY < leftPaddleY + paddleHeight
      ) {
        ballDX = Math.min(maxBallSpeed, -ballDX * 1.1);
        ballDY *= 1.1;
      } else if (
        ballX + ballRadius >= canvas.width - paddleWidth &&
        ballY > rightPaddleY &&
        ballY < rightPaddleY + paddleHeight
      ) {
        ballDX = Math.max(-maxBallSpeed, -ballDX * 1.1);
        ballDY *= 1.1;
      }

      // Comprobar si alguien anotó
      if (ballX - ballRadius < 0) {
        setRightScore((prev) => prev + 1);
        resetBall();
      } else if (ballX + ballRadius > canvas.width) {
        setLeftScore((prev) => prev + 1);
        resetBall();
      }

      // IA para un jugador
      if (gameMode === "1-player") {
        const targetY = ballY - paddleHeight / 2;
        rightPaddleY += targetY > rightPaddleY ? paddleSpeed : -paddleSpeed;
        rightPaddleY = Math.max(0, Math.min(rightPaddleY, canvas.height - paddleHeight));
      }

      // Movimiento de las palas
      leftPaddleY += leftPaddleDirection * paddleSpeed;
      leftPaddleY = Math.max(0, Math.min(leftPaddleY, canvas.height - paddleHeight));

      rightPaddleY += rightPaddleDirection * paddleSpeed;
      rightPaddleY = Math.max(0, Math.min(rightPaddleY, canvas.height - paddleHeight));

      draw();
      requestAnimationFrame(update);
    };

    const resetBall = () => {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballDX = initialBallSpeed * (Math.random() > 0.5 ? 1 : -1);
      ballDY = initialBallSpeed * (Math.random() > 0.5 ? 1 : -1);
    };

    const handleKeyDown = (e) => {
      if (e.key === "w") leftPaddleDirection = -1;
      if (e.key === "s") leftPaddleDirection = 1;
      if (e.key === "ArrowUp") rightPaddleDirection = -1;
      if (e.key === "ArrowDown") rightPaddleDirection = 1;
    };

    const handleKeyUp = (e) => {
      if (["w", "s"].includes(e.key)) leftPaddleDirection = 0;
      if (["ArrowUp", "ArrowDown"].includes(e.key)) rightPaddleDirection = 0;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameMode]);

  return (
    <div className="flex flex-col items-center aspect-auto">
      <h1 className="text-2xl mb-4 text-white">{translations.GamePingPong}</h1>
      <canvas ref={canvasRef} width={600} height={400} className="border border-blue-600"></canvas>
    </div>
  );
};

export default PingPongGame;
