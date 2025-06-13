import { useState, useEffect } from "react";

import { gameInfoPost } from "api/gamesControllers/gameInfoPost";
import { activeSessionGet } from "api/gamesControllers/activeSessionGet";
import { startGamePost } from "api/gamesControllers/startGamePost";
import { initPost } from "api/gamesControllers/checkIQ/initPost";
import { movePost } from "api/gamesControllers/checkIQ/movePost";
import { finishGamePost } from "api/gamesControllers/mimesweeper/finishGamePost";

import { CheckIQField } from "./CheckIQField";
import { GameStartMenu } from "../GameStartMenu";

export type TGameData = {
  status: "win" | "loss" | "active";
  x: number;
  y: number;
  turns: number;
  field: Record<string, any>[];
  moves: number[];
  endOfGame: number;
  exercise: number | null;
  timeShowField: number | null;
};

export const CheckIQ = () => {
  const [gameInfo, setGameInfo] = useState<Record<string, any> | null>(null);
  const [activeSession, setActiveSession] = useState<TGameData | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const info = await gameInfoPost("checkIQ");
      setGameInfo(info);
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await activeSessionGet("checkIQ");
      setActiveSession(session);
    };

    if (gameInfo) fetchSession();
  }, [gameInfo]);

  const startHandler = async (complexity: string, payoutValue: number, payoutCurrency: string) => {
    const newData = await startGamePost("checkIQ", complexity, payoutValue, payoutCurrency);
    setActiveSession(newData);
  };

  const initHandler = async () => {
    const newData = await initPost();
    setActiveSession(newData);
  };

  const moveHandler = async (moveData: number) => {
    const newData = await movePost(moveData);
    setActiveSession(newData);
  };

  const finishGameHandler = async () => {
    await finishGamePost("checkIQ");
    setActiveSession(null);
  };

  const propsStart = {
    gameData: {
      gameName: gameInfo?.info.name || "Unknown Game",
      gameDiscription: gameInfo?.info.discription || "No description",
      options: gameInfo?.options
        ? gameInfo.options.map((item: {
            name_complexity: string;
            discription_complexity: string;
            bonus_coefficient: number;
          }) => ({
            name: item.name_complexity,
            discription: item.discription_complexity,
            bonusCoefficient: item.bonus_coefficient,
          }))
        : [],
    },
    startHandler,
  };

  const propsField = activeSession
    ? {
        gameData: activeSession,
        initHandler,
        moveHandler,
        finishGameHandler,
        fetchSession: async () => {
          const session = await activeSessionGet("checkIQ");
          setActiveSession(session);
        },
      }
    : null;

  return (
    <div className="container my-4">
      <div className="p-4 border rounded bg-light">
        {!gameInfo && !activeSession && <div>Загрузка...</div>}
        {activeSession && propsField && <CheckIQField {...propsField} />}
        {!activeSession && gameInfo && <GameStartMenu {...propsStart} />}
      </div>
    </div>
  );
};
