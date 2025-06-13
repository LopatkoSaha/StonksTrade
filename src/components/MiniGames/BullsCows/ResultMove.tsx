type TProps = {
  bulls?: number;
  cows?: number;
  moveData: string[];
  colors: Record<string, string>;
};

export const ResultMove = ({ bulls, cows, moveData, colors }: TProps) => {
  return (
    <div className="mb-3 p-3 border rounded bg-light">
      <div className="mb-2 fw-bold">
        Bulls: {bulls ?? 0}, Cows: {cows ?? 0}
      </div>
      <div className="d-flex gap-2 flex-wrap">
        {moveData.map((item, idx) => (
          <div
            key={idx}
            className="rounded-circle border"
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: colors[item] || "#dee2e6",
            }}
            title={item}
          ></div>
        ))}
      </div>
    </div>
  );
};
