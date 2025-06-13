import { useState, useEffect } from "react";

type TProps = {
  endOfGame: number;
  stopInterval: boolean;
  handleFinish: () => void;
};

export const GameTimer = ({ endOfGame, stopInterval, handleFinish }: TProps) => {
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    if (stopInterval) {
      setTimer(null);
      return;
    }

    const intervalId = setInterval(() => {
      const timeLeft = Math.floor((endOfGame - Date.now()) / 1000);
      if (timeLeft <= 0) {
        setTimer(0);
        handleFinish();
        clearInterval(intervalId);
      } else {
        setTimer(timeLeft);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [endOfGame, stopInterval, handleFinish]);

  return (
    <div className="alert alert-info text-center" role="alert" style={{ fontWeight: "bold" }}>
      Осталось: {timer !== null ? timer : "--"} сек
    </div>
  );
};
