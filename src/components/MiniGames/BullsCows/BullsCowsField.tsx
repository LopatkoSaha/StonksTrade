import { useState, useMemo } from "react";
import type { TGameData } from "./BullsCows";
import { ColorSelect } from "./ColorSelect";
import { ResultMove } from "./ResultMove";

type TProps = {
  gameData: TGameData;
  moveHandler: (moveData: string[]) => void;
  finishGameHandler: () => void;
};

export const BullsCowsField = ({ gameData, moveHandler, finishGameHandler }: TProps) => {
  const { status, turns, moves, quest, colorsCount, colors } = gameData;

  const defaultField = Array.from({ length: colorsCount }, () => "");
  const [field, setField] = useState<string[]>(defaultField);

  const othersColors = useMemo(
    () => Object.values(colors).filter((color) => !field.includes(color)),
    [colors, field]
  );

  const handlerColorEntered = (idx: number, color: string) => {
    const updated = [...field];
    updated[idx] = color;
    setField(updated);
  };

  const isValidMove = field.includes("");

  const resultMove = field.map((item) => {
      const entry = Object.entries(colors).find(([, val]) => val === item);
      if (!entry) return "";
      const [key] = entry;
      return key;
    });

  const clickMoveHandler = () => {
    moveHandler(resultMove);
    setField(defaultField);
  };

  return (
    <div className="container text-center">
      <h2 className="mb-4">Bulls & Cows</h2>

      {status === "active" && (
        <div>
          <p className="mb-3">Осталось ходов: {turns}</p>

          <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
            {field.map((color, idx) => (
              <ColorSelect
                key={idx}
                color={color}
                index={idx}
                colorOptions={othersColors}
                selectHandler={handlerColorEntered}
              />
            ))}
          </div>

          <div className="d-flex justify-content-center gap-3 mb-4">
            <button
              className="btn btn-primary"
              onClick={clickMoveHandler}
              disabled={isValidMove}
            >
              Отправить
            </button>
            <button className="btn btn-secondary" onClick={finishGameHandler}>
              Стоп
            </button>
          </div>
        </div>
      )}

      {status === "win" && <div className="alert alert-success">Ты выиграл!</div>}

      {status === "loss" && (
        <div className="alert alert-danger">
          <div className="mb-2">Ты проиграл, попробуй еще раз</div>
          <div className="d-flex justify-content-center gap-2">
            {quest.map((item, idx) => (
              <div
                key={idx}
                className="rounded-circle border"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: colors[item] || "#dee2e6",
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {moves.length !== 0 && (
        <div className="mt-4">
          <h5 className="mb-3">Результаты ходов</h5>
          {moves.map((item, idx) => (
            <ResultMove
              key={idx}
              bulls={item.bulls}
              cows={item.cows}
              moveData={item.moveData}
              colors={colors}
            />
          ))}
        </div>
      )}
    </div>
  );
};
