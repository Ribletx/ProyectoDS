"use client";
import { useEffect, useRef, useState } from "react";

export default function SpaceInvadersGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1); // Nivel actual del juego
  const [showLevelScreen, setShowLevelScreen] = useState(false); // Mostrar la pantalla de nivel
  const [timePassed, setTimePassed] = useState(0); // Control del tiempo
  const [gameOver, setGameOver] = useState(false); // Verificar si el juego terminó por tiempo

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
  let bulletDelay = 300;
  let lastShotTime = 0;

  let bullets = [];
  let invaders = [];
  let moveLeft = false;
  let moveRight = false;
  let shoot = false;

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

  const drawPlayer = (ctx) => {
    ctx.fillStyle = "green";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
  };

  const drawBullets = (ctx) => {
    ctx.fillStyle = "yellow";
    bullets.forEach((bullet, index) => {
      if (bullet.y < 0) {
        bullets.splice(index, 1);
      } else {
        ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
        bullet.y -= bulletSpeed;
      }
    });
  };

  const drawInvaders = (ctx) => {
    invaders.forEach((invader) => {
      if (invader.alive) {
        ctx.fillStyle = "red";
        ctx.fillRect(invader.x, invader.y, invaderWidth, invaderHeight);
      }
    });
  };

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
        invader.y += 10;
      });
    }

    invaders.forEach((invader) => {
      invader.x += invaderSpeed;
    });
  };

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
          setScore((prevScore) => prevScore + 100);
          bullets.splice(bulletIndex, 1);
        }
      });
    });
  };

  const handlePlayerMove = () => {
    if (moveLeft && playerX > 0) {
      playerX -= playerSpeed;
    } else if (moveRight && playerX < canvasWidth - playerWidth) {
      playerX += playerSpeed;
    }
  };

  const handleShoot = () => {
    const now = Date.now();
    if (now - lastShotTime >= bulletDelay && shoot) {
      bullets.push({ x: playerX + playerWidth / 2 - bulletWidth / 2, y: playerY });
      lastShotTime = now;
    }
  };

  const gameLoop = (ctx) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawPlayer(ctx);
    drawBullets(ctx);
    drawInvaders(ctx);

    moveInvaders();
    checkCollisions();
    handlePlayerMove();
    handleShoot();

    // Si todos los enemigos son eliminados, mostrar la pantalla del siguiente nivel
    if (invaders.every((invader) => !invader.alive)) {
      setShowLevelScreen(true); // Mostrar la pantalla del nivel
      setGameStarted(false); // Pausar el juego
      return;
    }

    if (!gameOver) {
      requestAnimationFrame(() => gameLoop(ctx));
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setShowLevelScreen(false);
    setGameOver(false);
    setTimePassed(0); // Reiniciar el tiempo
    initInvaders(); // Inicializar enemigos
    setScore(0); // Reiniciar el puntaje
    gameLoop(canvasRef.current.getContext("2d"));
  };

  const checkGameOver = () => {
    if (timePassed >= 30) {
      setGameOver(true);
      setGameStarted(false);
    }
  };

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimePassed((prevTime) => prevTime + 1);
        checkGameOver();
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, timePassed]);

  // Manejo de eventos de teclado para mover el jugador
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        moveLeft = true;
      } else if (event.key === "ArrowRight") {
        moveRight = true;
      } else if (event.key === " ") {
        shoot = true;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowLeft") {
        moveLeft = false;
      } else if (event.key === "ArrowRight") {
        moveRight = false;
      } else if (event.key === " ") {
        shoot = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="game-container">
      {!gameStarted && !gameOver && showLevelScreen && (
        <div className="start-screen">
          <h1>Nivel {level}</h1>
          <button onClick={startGame}>Comenzar</button>
        </div>
      )}
      {!gameStarted && !showLevelScreen && (
        <div className="start-screen">
          <h1>Nivel {level}</h1>
          <button onClick={startGame}>Comenzar</button>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ display: gameStarted ? "block" : "none" }}
      ></canvas>
      <div className="score">
        <p>Score: {score}</p>
        {gameOver && <p>Game Over!</p>}
      </div>
      <style jsx>{`
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .start-screen {
          width: 400px;
          height: 300px;
          text-align: center;
          background: black;
          color: white;
          padding-top: 40px;
          position: relative;
        }

        .start-screen h1 {
          font-size: 2.5rem;
          margin-top: 20px;
        }

        .start-screen button {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px 40px;
          background-color: blue;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .start-screen button:hover {
          background-color: darkblue;
        }

        canvas {
          border: 2px solid black;
          max-width: 100%;
          height: auto;
          background: black;
        }

        .score {
          margin-top: 10px;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }
      `}</style>
    </div>
  );
}
