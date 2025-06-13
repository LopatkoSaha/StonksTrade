import { useEffect } from "react";

import type { TGameData } from "./CheckIQ";
import { GameField } from "./GameField";
import { GameTimer } from "./GameTimer";
import { GameResult } from "./GameResult";

type TProps = {
  gameData: TGameData;
  initHandler: () => void;
  moveHandler: (moveData: number) => void;
  finishGameHandler: () => void;
  fetchSession: () => void;
};

export const CheckIQField = ({
  gameData,
  initHandler,
  moveHandler,
  finishGameHandler,
  fetchSession,
}: TProps) => {
  const {
    status,
    x,
    y,
    turns,
    field,
    moves,
    endOfGame,
    exercise,
    timeShowField,
  } = gameData;

  useEffect(() => {
    if (timeShowField) {
      setTimeout(() => {
        initHandler();
      }, timeShowField * 1000);
    }
  }, []);

  const handleClickCell = (e: React.MouseEvent<HTMLElement>) => {
    if (status === "win" || status === "loss") return;
    const clickIdx = (e.target as HTMLDivElement).dataset.idx;
    if (field[+clickIdx!]?.isOpen) return;
    moveHandler(+clickIdx!);
  };

  const stopTimer = status !== "active";

  return (
    <div className="mt-4">
      <h3 className="text-center mb-4">🧠 Check IQ</h3>

      <div className="row justify-content-center mb-3">
        <div className="col-auto">
          {status === "active" ? (
            <GameField x={x} y={y} fieldData={field} handleClick={handleClickCell} />
          ) : (
            <GameResult x={x} y={y} fieldData={field} exercise={exercise!} />
          )}
        </div>
      </div>

      <div className="text-center mb-3">
        <div className="mb-2 fw-semibold">
          {status === "active" && "Игра продолжается"}
          {status === "win" && "🎉 Победа!"}
          {status === "loss" && "💥 Проигрыш"}
        </div>

        <div className="mb-2">
          Осталось ходов: <strong>{turns}</strong>
        </div>

        <GameTimer endOfGame={endOfGame} stopInterval={stopTimer} handleFinish={fetchSession} />

        {status === "active" && exercise !== null && (
          <div className="mt-2 text-muted">Текущее задание: {exercise}</div>
        )}

        <div className="mt-3">
          <button className="btn btn-outline-danger" onClick={finishGameHandler}>
            🔄 Рестарт
          </button>
        </div>
      </div>
    </div>
  );
};
