import { FC, useState } from "react";
import { CheckIQ } from "components/MiniGames/CheckIQ/CheckIQ";
import { BullsCows } from "components/MiniGames/BullsCows/BullsCows";
import { Minesweeper } from "components/MiniGames/Minesweeper/Minesweeper";
import { useCheckAuth } from "hooks/useCheckAuth";
import { presentation } from "assets/presentationGames";

export const games: Record<string, FC> = {
  Minesweeper: Minesweeper,
  BullsCows: BullsCows,
  CheckIQ: CheckIQ,
};

export const GamePage = () => {
  useCheckAuth();
  const [gameName, setGameName] = useState(Object.keys(games)[0]);
  const [gamePlay, setGamePlay] = useState(false);

  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (gameName !== event.target.value) setGamePlay(false);
    setGameName(event.target.value);
  };

  const handleEnteredGame = () => {
    setGamePlay(true);
  };

  const handleExit = () => {
    setGamePlay(false);
  };

  const SelectedGame = games[gameName as keyof typeof games];

  return (
    <div className="gamePage">
      {!gamePlay ? (
        <div className="card shadow-sm p-4">
          <h2 className="text-center mb-4">🎮 Mini Game</h2>
          <div className="mb-4 text-center">
            {presentation}
          </div>

          <div className="mb-3">
            <label htmlFor="gameDropdown" className="form-label">Выберите игру:</label>
            <select
              id="gameDropdown"
              className="form-select"
              value={gameName}
              onChange={handleGameChange}
            >
              {Object.keys(games).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid">
            <button
              className="btn btn-primary"
              onClick={handleEnteredGame}
            >
              Играть
            </button>
          </div>
        </div>
      ) : (
        <div className="minesweeper-container">
          <div className="mb-3">
            <button className="btn btn-secondary" onClick={handleExit}>
              ⬅ Назад
            </button>
          </div>
          <div className="minesweeper-container">
            <SelectedGame />
          </div>
        </div>
      )}
    </div>
  );
};
