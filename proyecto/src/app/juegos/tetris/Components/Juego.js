import Menu from "./menu";
import Tetris from "./tetris";

import { useGameOver } from "../hooks/useGameOver";

const Juego = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => resetGameOver();

  return (
    <div className="Juego">
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
};

export default Juego;
