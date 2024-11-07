"use client";
import SnakeGame from './snake'; // El componente del juego

const SnakePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SnakeGame /> {/* El componente de SnakeGame ahora está debajo del Header */}
    </div>
  );
};

export default SnakePage;
