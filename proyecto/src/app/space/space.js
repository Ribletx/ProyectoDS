"use client";

import { useEffect, useRef, useState } from "react";

export default function SpaceInvadersGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);

  const canvasWidth = 800;
  const canvasHeight = 600;
  const playerWidth = 50;
  const playerHeight = 20;
  const bulletWidth = 5;
  const bulletHeight = 15;
  const invaderWidth = 40;
  const invaderHeight = 30;
  
  let playerX = canvasWidth / 2 - playerWidth / 2;
  let playerY = canvasHeight - playerHeight - 10;
  let playerSpeed = 5;
  let bulletSpeed = 5;
  let invaderSpeed = 1;
  
  let bullets = [];
  let invaders = [];
  let isGameOver = false;

  // Initialize invaders (rows and columns)
  const initInvaders = () => {
    invaders = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 10; col++) {
        invaders.push({
          x: col * (invaderWidth + 10) + 50,
          y: row * (invaderHeight + 10) + 50,
          alive: true,
        });
      }
    }
  };

  // Draw the player on the canvas
  const drawPlayer = (ctx) => {
    ctx.fillStyle = "green";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
  };

  // Draw bullets on the canvas
  const drawBullets = (ctx) => {
    ctx.fillStyle = "yellow";
    bullets.forEach((bullet, index) => {
      if (bullet.y < 0) {
        bullets.splice(index, 1); // Remove bullet if off screen
      } else {
        ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
        bullet.y -= bulletSpeed;
      }
    });
  };

  // Draw invaders
  const drawInvaders = (ctx) => {
    invaders.forEach((invader) => {
      if (invader.alive) {
        ctx.fillStyle = "red";
        ctx.fillRect(invader.x, invader.y, invaderWidth, invaderHeight);
      }
    });
  };

  // Move invaders
  const moveInvaders = () => {
    let moveDown = false;
    invaders.forEach((invader) => {
      if (invader.x + invaderWidth >= canvasWidth || invader.x <= 0) {
        moveDown = true;
      }
    });

    if (moveDown) {
      invaderSpeed = -invaderSpeed;
      invaders.forEach((invader) => {
        invader.y += 10; // Move invaders down
      });
    }

    invaders.forEach((invader) => {
      invader.x += invaderSpeed; // Move invaders horizontally
    });
  };

  // Check for collisions between bullets and invaders
  const checkCollisions = () => {
    bullets.forEach((bullet, bulletIndex) => {
      invaders.forEach((invader, invaderIndex) => {
        if (
          invader.alive &&
          bullet.x < invader.x + invaderWidth &&
          bullet.x + bulletWidth > invader.x &&
          bullet.y < invader.y + invaderHeight &&
          bullet.y + bulletHeight > invader.y
        ) {
          invader.alive = false;
          setScore((prevScore) => prevScore + 100); // Increase score
          bullets.splice(bulletIndex, 1); // Remove bullet
        }
      });
    });
  };

  // Handle player movement
  const handlePlayerMove = (e) => {
    if (e.key === "ArrowLeft" && playerX > 0) {
      playerX -= playerSpeed;
    } else if (e.key === "ArrowRight" && playerX < canvasWidth - playerWidth) {
      playerX += playerSpeed;
    } else if (e.key === " " && !isGameOver) {
      bullets.push({ x: playerX + playerWidth / 2 - bulletWidth / 2, y: playerY });
    }
  };

  // Main game loop
  const gameLoop = (ctx) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawPlayer(ctx);
    drawBullets(ctx);
    drawInvaders(ctx);

    moveInvaders();
    checkCollisions();

    if (invaders.some((invader) => invader.y + invaderHeight >= playerY)) {
      isGameOver = true;
      alert("Game Over!");
    }

    if (!isGameOver) {
      requestAnimationFrame(() => gameLoop(ctx));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Initialize the game
    initInvaders();
    gameLoop(ctx);

    window.addEventListener("keydown", handlePlayerMove);

    return () => {
      window.removeEventListener("keydown", handlePlayerMove);
    };
  }, []);

  return (
    <div className="game-container">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
      <div className="score">
        <p>Score: {score}</p>
      </div>
    </div>
  );
}
