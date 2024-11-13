import React, { useState, useEffect } from 'react';

const TetrisGame = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentPiece, setCurrentPiece] = useState({
    x: 5,
    y: 0,
    blocks: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  });
  const [grid, setGrid] = useState(
    Array(20)
      .fill(null)
      .map(() => Array(10).fill(null))
  );

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        movePiece(-1, 0);
      } else if (e.key === 'ArrowRight') {
        movePiece(1, 0);
      } else if (e.key === 'ArrowDown') {
        movePiece(0, 1);
      } else if (e.key === 'ArrowUp') {
        rotatePiece();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentPiece, grid]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      movePiece(0, 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentPiece, grid]);

  const movePiece = (dx, dy) => {
    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;

    if (newX < 0 || newX + 3 > 9 || newY + 1 > 19) {
      setGameOver(true);
      return;
    }

    const newPiece = { ...currentPiece, x: newX, y: newY };

    if (checkCollision(newPiece)) {
      if (dy === 1) {
        placePiece();
      }
      return;
    }

    setCurrentPiece(newPiece);
  };

  const rotatePiece = () => {
    const newBlocks = currentPiece.blocks.map(([x, y]) => [y, -x]);
    const newPiece = { ...currentPiece, blocks: newBlocks };

    if (checkCollision(newPiece)) {
      return;
    }

    setCurrentPiece(newPiece);
  };

  const checkCollision = (piece) => {
    for (const [x, y] of piece.blocks) {
      if (piece.y + y >= 20 || piece.x + x < 0 || piece.x + x >= 10 || grid[piece.y + y][piece.x + x] !== null) {
        return true;
      }
    }
    return false;
  };

  const placePiece = () => {
    const newGrid = [...grid];

    for (const [x, y] of currentPiece.blocks) {
      newGrid[currentPiece.y + y][currentPiece.x + x] = 'block';
    }

    setGrid(newGrid);
    setCurrentPiece({
      x: 5,
      y: 0,
      blocks: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
    });
    setScore((prevScore) => prevScore + 1);
  };

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    setCurrentPiece({
      x: 5,
      y: 0,
      blocks: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
    });
    setGrid(
      Array(20)
        .fill(null)
        .map(() => Array(10).fill(null))
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Tetris Game</h1>
      <div className="flex justify-between mb-4">
        <p className="text-lg font-bold">Score: {score}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
      <div className="grid grid-cols-10 gap-1 w-64 h-96 border border-gray-500 relative">
        {grid.map((row, y) => (
          <React.Fragment key={y}>
            {row.map((cell, x) => (
              <div
                key={x}
                className={`w-6 h-6 ${
                  cell === 'block' ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </React.Fragment>
        ))}
        {currentPiece.blocks.map(([x, y], i) => (
          <div
            key={i}
            className="w-6 h-6 bg-red-500 absolute"
            style={{
              left: `${(currentPiece.x + x) * 24}px`,
              top: `${(currentPiece.y + y) * 24}px`,
            }}
          />
        ))}
      </div>
      {gameOver && (
        <p className="text-lg font-bold mt-4">Game Over!</p>
      )}
    </div>
  );
};

export default TetrisGame;
