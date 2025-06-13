import React from "react";

type Tprops = {
  x: number;
  y: number;
  fieldData: Record<string, any>[];
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const GameField = ({ x, y, fieldData, handleClick }: Tprops) => {
  const rows = Array.from({ length: y }, (_, rowIdx) => {
    const cols = Array.from({ length: x }, (_, colIdx) => {
      const idx = rowIdx * x + colIdx;
      const itemData = fieldData.find((item) => item.index === idx);

      return (
        <div
          key={idx}
          data-idx={idx}
          onClick={handleClick}
          className={`border d-flex justify-content-center align-items-center bg-${
            itemData?.isOpen ? "light" : "secondary"
          } text-dark`}
          style={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
            userSelect: "none",
            fontWeight: "bold",
            borderRadius: "4px",
            margin: "2px",
          }}
        >
          {itemData?.isOpen ? itemData.value : ""}
        </div>
      );
    });

    return (
      <div key={rowIdx} className="d-flex justify-content-center mb-1">
        {cols}
      </div>
    );
  });

  return <div>{rows}</div>;
};
