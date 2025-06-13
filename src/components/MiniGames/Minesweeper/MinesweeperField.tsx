import { useState, useEffect, useRef } from "react";

import "./minesweeper.css";
import { MinesweeperCell } from "./MinesweeperCell";
import type { TGameData } from "./Minesweeper";

type TProps = {
    gameData: TGameData,
    moveHandler: (clickId: number) => void;
    flagHandler: (clickId: number) => void;
    finishGameHandler: () => void;
};

export const MinesweeperField = (props: TProps) => {
    const {fieldData, status, x, y, bombs, lastMove} = props.gameData;
    const {moveHandler, flagHandler, finishGameHandler} = props;

    const [sizeGameField, setSizeGameField] = useState({ width: 0, height: 0 });
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            setSizeGameField({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight,
            });
        }
    }, [ref, x, y]);

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (status === "win" || status === "loss") return;
        const clickId = (e.target as HTMLDivElement).dataset.id;
        if (clickId === undefined) return;
        if (fieldData[+clickId]?.isOpen) return;
        flagHandler(+clickId);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (status === "win" || status === "loss") return;
        const clickId = (event.target as HTMLDivElement).dataset.id;
        if (clickId === undefined) return;
        if (fieldData[+clickId]?.isOpen) return;
        if (fieldData[+clickId]?.hasFlag) return;
        moveHandler(+clickId);
    };

    const cells = fieldData.map((item) => (
        <MinesweeperCell
            key={item.cellId}
            cellData={item}
            bombs={bombs}
            lastMove={lastMove}
            sizeGameField={sizeGameField}
            x={x}
            y={y}
        />
    ));

    const rows = Array.from({ length: y }, (_, idx) => {
        return (
            <div className="minesweeper-row" key={idx}>
                {cells.slice(idx * x, idx * x + x)}
            </div>
        )
    })

    return (
        <div className="minesweeper-wrapper">
            <div className="minesweeper-content">
                <div className="minesweeper-nav">
                    <button className="btn btn-secondary" onClick={finishGameHandler}>Стоп</button>
                </div>
                <div className="minesweeper-gameContainer">
                    <div 
                        className="minesweeper-gameField"
                        onClick={handleClick}
                        onContextMenu={handleRightClick}
                        ref={ref}
                    >
                        {rows}
                    </div>
                </div>
            </div>        
        </div>
    )
};
