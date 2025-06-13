import { useState, useEffect } from "react";

import "./minesweeper.css";
import { gameInfoPost } from "api/gamesControllers/gameInfoPost";
import { activeSessionGet } from "api/gamesControllers/activeSessionGet";
import { startGamePost } from "api/gamesControllers/startGamePost";
import { movePost } from "api/gamesControllers/mimesweeper/movePost";
import { flagPost } from "api/gamesControllers/mimesweeper/flagPost";
import { finishGamePost } from "api/gamesControllers/mimesweeper/finishGamePost";
import { MinesweeperField } from "./MinesweeperField";
import { GameStartMenu } from "../GameStartMenu";

export type TGameData = {
    x: number;
    y: number;
    status: string;
    fieldData: any[];
    bombs: number[];
    lastMove: number | null;
}

export const Minesweeper = () => {
    const [gameInfo, setGameInfo] = useState<Record<string, any> | null>(null);
    const [activeSession, setActiveSession] = useState<TGameData | null>(null);

    const fetchInfo = async () => {
        const info = await gameInfoPost("minesweeper");
        setGameInfo(info);
    };

    const fetchSession = async () => {
        const session = await activeSessionGet("minesweeper");
        setActiveSession(session);
    };

    useEffect(() => {
        fetchInfo();
    },[]);

    useEffect(() => {
        if(gameInfo) {
            fetchSession();
        }
    }, [gameInfo]);

    const startHandler = async (complexity: string, payoutValue: number, payoutCurrency: string) => {
        const newData = await startGamePost("minesweeper", complexity, payoutValue, payoutCurrency);
        setActiveSession(newData);
    };

    const moveHandler = async (clickId: number) => {
        const newData = await movePost(clickId);
        setActiveSession(newData);
    };

    const flagHandler = async (clickId: number) => {
        const newData = await flagPost(clickId);
        setActiveSession(newData);
    };

    const finishGameHandler = async () => {
        await finishGamePost("minesweeper");
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
          moveHandler,
          flagHandler,
          finishGameHandler,
      }
    : null;

    return (
        <div className="minesweeper-wrapper">
            <div className="minesweeper-gameContainer">
                {!gameInfo && !activeSession ? <div>Loading...</div> : null}
                {activeSession && propsField && <MinesweeperField {...propsField} />}
                {!activeSession && gameInfo && <GameStartMenu {...propsStart} />}
            </div>
        </div>
    );
}
