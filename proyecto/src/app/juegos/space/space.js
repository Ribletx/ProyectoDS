import { useEffect, useRef, useState } from "react"; 
import { useLanguage } from "../../context/LanguageContext";

export default function SpaceInvadersGame() {
  const { translations } = useLanguage();
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false); 
  const [message, setMessage] = useState(""); 
  const timeLeftRef = useRef(10);  // UseRef para el tiempo restante
  const [timeLeft, setTimeLeft] = useState(timeLeftRef.current); // Estado para mostrar el tiempo restante

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
        invader.y += 25;
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

  const checkGameOver = () => {
    if (invaders.every((invader) => !invader.alive)) {
      setMessage("¡Ganaste!");
      setGameOver(true);
      setTimeout(() => window.location.reload(), 3000); // Refrescar página tras ganar
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
    checkGameOver();

    if (!gameOver) {
      requestAnimationFrame(() => gameLoop(ctx));
    }
  };

  const startGame = () => {
    setGameOver(false);
    setMessage("");
    timeLeftRef.current = 30;
    setTimeLeft(timeLeftRef.current);
    initInvaders();
    setScore(0);

    if (startGame.timer) {
      clearInterval(startGame.timer);
    }

    startGame.timer = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current === 0) {
        clearInterval(startGame.timer);
        setMessage("Perdiste por tiempo");
        setGameOver(true);
        setTimeout(() => window.location.reload(), 3000); // Refrescar página tras perder
      }
    }, 1000);

    gameLoop(canvasRef.current.getContext("2d"));
  };

  useEffect(() => {
    startGame();
  }, []);

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
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ display: "block" }}
      ></canvas>
      <div className="score">
        <p>{translations.score} {score}</p>
        <p>{translations.timeLeft} {timeLeft} {translations.seconds}</p>
        {gameOver && <p>{message}</p>}
      </div>
      <style jsx>{`
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
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
