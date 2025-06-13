import { useState, useEffect } from "react";
import { gameInfoPost } from "api/gamesControllers/gameInfoPost";
import { activeSessionGet } from "api/gamesControllers/activeSessionGet";
import { startGamePost } from "api/gamesControllers/startGamePost";
import { movePost } from "api/gamesControllers/bulsCows/movePost";
import { finishGamePost } from "api/gamesControllers/mimesweeper/finishGamePost";
import { BullsCowsField } from "./BullsCowsField";
import { GameStartMenu } from "../GameStartMenu";

export type TGameData = {
  turns: number;
  moves: Record<string, any>[];
  quest: string[];
  colorsCount: number;
  colors: Record<string, string>;
  status: string;
};

export const BullsCows = () => {
  const [gameInfo, setGameInfo] = useState<Record<string, any> | null>(null);
  const [activeSession, setActiveSession] = useState<TGameData | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const info = await gameInfoPost("bullsCows");
      setGameInfo(info);
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await activeSessionGet("bullsCows");
      setActiveSession(session);
    };
    if (gameInfo) fetchSession();
  }, [gameInfo]);

  const startHandler = async (complexity: string, payoutValue: number, payoutCurrency: string) => {
    const newData = await startGamePost("bullsCows", complexity, payoutValue, payoutCurrency);
    setActiveSession(newData);
  };

  const moveHandler = async (moveData: string[]) => {
    const newData = await movePost(moveData);
    setActiveSession(newData);
  };

  const finishGameHandler = async () => {
    await finishGamePost("bullsCows");
    setActiveSession(null);
  };

  const propsStart = {
    gameData: {
      gameName: gameInfo?.info.name || "Unknown Game",
      gameDiscription: gameInfo?.info.discription || "No description",
      options: gameInfo?.options?.map((item: any) => ({
        name: item.name_complexity,
        discription: item.discription_complexity,
        bonusCoefficient: item.bonus_coefficient,
      })) || [],
    },
    startHandler,
  };

  const propsField = activeSession
    ? {
        gameData: activeSession,
        moveHandler,
        finishGameHandler,
      }
    : null;

  return (
    <div className="container py-4">
      <div className="card shadow p-4">
        {!gameInfo && !activeSession && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-3">Загрузка...</p>
          </div>
        )}
        {activeSession && propsField && <BullsCowsField {...propsField} />}
        {!activeSession && gameInfo && <GameStartMenu {...propsStart} />}
      </div>
    </div>
  );
};
