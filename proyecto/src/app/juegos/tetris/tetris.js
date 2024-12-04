import "../tetris/styles.css";

import Game from "../tetris/Components/Game";

export default function App() {
  return (
    <div className="App">
      <Game rows={20} columns={10} />
    </div>
  );
}
