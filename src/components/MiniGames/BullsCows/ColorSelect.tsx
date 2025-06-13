import { useState } from "react";

type TProps = {
  color: string;
  index: number;
  colorOptions: string[];
  selectHandler: (index: number, color: string) => void;
};

export const ColorSelect = ({ color, index, colorOptions, selectHandler }: TProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

  const selectColorHandler = (e: React.MouseEvent<HTMLElement>) => {
    setShowDropdown(false);
    setMenuPosition(null);

    const selectedColor = (e.target as HTMLElement).dataset.color;
    if (!selectedColor) return;

    selectHandler(index, selectedColor);
  };

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    setShowDropdown(true);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        className="rounded-circle border border-dark"
        onClick={clickHandler}
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: color || "#f8f9fa",
          cursor: "pointer",
        }}
      ></div>

      {showDropdown && menuPosition && (
        <div
          className="position-absolute bg-white border rounded shadow"
          style={{
            left: menuPosition.x,
            top: menuPosition.y,
            zIndex: 1000,
            padding: "0.5rem",
          }}
          onClick={selectColorHandler}
        >
          <ul className="list-unstyled mb-0 d-flex flex-wrap gap-2">
            {colorOptions.map((item, idx) => (
              <li
                key={idx}
                data-color={item}
                title={item}
                className="rounded-circle border"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: item,
                  cursor: "pointer",
                }}
              ></li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
