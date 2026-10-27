import { useState } from "react";
import attackImage from "../images/attack.png";
import defendImage from "../images/defend.png";

function Counter() {
  const [gameState, setGameState] = useState({
    count: 0,
    gameStatus: "",
  });

  function handleIncrement() {
    const newCount = gameState.count + 1;
    const status = newCount >= 5 ? "You Won!!" : "";
    setGameState({ count: newCount, gameStatus: status });
  }

  function handleDecrement() {
    const newCount = gameState.count - 1;
    const status = newCount <= -5 ? "You Lost!!" : "";
    setGameState({ count: newCount, gameStatus: status });
  }

  function handleRandomPlay() {
    const playMode = Math.round(Math.random());
    if (playMode == 0) {
      handleIncrement();
    } else {
      handleDecrement();
    }
  }

  function handleReset() {
    setGameState({ count: 0, gameStatus: "" });
  }

  function handleLog() {
    console.log(gameState.count);
  }

  return (
    <div className="container">
      <div className="row text-white">
        <h1>Game Score : {gameState.count}</h1>
        <p>You win at +5 points and lose at -5 points.</p>
        <p>Last Play: </p>
        {gameState.gameStatus.length > 0 && (
          <h3>Game Status: {gameState.gameStatus}</h3>
        )}

        <div className="col-6 col-md-3 offset-md-3">
          <img
            src={attackImage}
            alt="Attack"
            style={{
              width: "100%",
              cursor: "pointer",
              border: "1px solid green",
            }}
            onClick={handleIncrement}
            className="p-4 rounded"
          />
        </div>
        <div className="col-6 col-md-3 offset-md-3">
          <img
            src={defendImage}
            alt="Defend"
            style={{
              width: "100%",
              cursor: "pointer",
              border: "1px solid red",
            }}
            className="p-4 rounded"
            onClick={handleDecrement}
          />
        </div>
        <div className="col-12 col-md-4 offset-md-4">
          <button
            className="btn btn-success m-2 w-100"
            onClick={handleRandomPlay}
          >
            Random Play
          </button>
          <button className="btn btn-danger m-2 w-100" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-warning m-2 w-100" onClick={handleLog}>
            Log
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
