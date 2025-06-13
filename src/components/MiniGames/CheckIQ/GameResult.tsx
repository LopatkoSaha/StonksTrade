import React from "react";

type TProps = {
  x: number;
  y: number;
  fieldData: Record<string, any>[];
  exercise: number;
};

export const GameResult = ({ x, y, fieldData, exercise }: TProps) => {
  const rows = Array.from({ length: y }, (_, rowIdx) => {
    const cols = Array.from({ length: x }, (_, colIdx) => {
      const idx = rowIdx * x + colIdx;
      const itemData = fieldData.find((item) => item.index === idx);
      const isExercise = itemData?.value === exercise;

      return (
        <div
          key={idx}
          data-idx={idx}
          className={`border d-flex justify-content-center align-items-center 
            ${itemData?.isOpen ? "bg-light" : "bg-secondary"} 
            ${isExercise ? "border border-3 border-warning" : ""}
          `}
          style={{
            width: "40px",
            height: "40px",
            fontWeight: "bold",
            margin: "2px",
            userSelect: "none",
            borderRadius: "4px",
          }}
        >
          {itemData?.value}
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
