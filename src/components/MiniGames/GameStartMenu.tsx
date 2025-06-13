import { useState } from "react";
import { useAppSelector } from "store/hooks";

type TProps = {
  gameData: {
    gameName: string;
    gameDiscription: string;
    options: {
      name: string;
      discription: string;
      bonusCoefficient: number;
    }[];
  };
  startHandler: (curr: string, bid: number, option: string) => void;
};

export const GameStartMenu = ({ gameData, startHandler }: TProps) => {
  const defaultComplexity = gameData.options?.[0]?.name ?? "easy";
  const [nameComplexity, setNameComplexity] = useState(defaultComplexity);
  const [bid, setBid] = useState("");
  const wallet = useAppSelector((state) => state.wallet);
  const coinIcons = useAppSelector((state) => state.coinIcons);
  const namesCurrencies = Object.keys(wallet).filter((item) => item !== "id" && item !== "created_at");
  const [bidCurrency, setBidCurrency] = useState(namesCurrencies[0]);
  const currentOption = gameData.options.find((opt) => opt.name === nameComplexity);

  const handleChangeComplexity = (e: React.ChangeEvent<HTMLSelectElement>) => setNameComplexity(e.target.value);
  const handleBidCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => setBidCurrency(e.target.value);
  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => setBid(e.target.value);

  const handleStartGame = () => {
    if (!+bid) return;
    startHandler(nameComplexity, +bid, bidCurrency);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-3">{gameData.gameName.toUpperCase()}</h2>
        <p className="text-center mb-4">{gameData.gameDiscription}</p>

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="difficultySelect" className="form-label">Сложность:</label>
            <select
              id="difficultySelect"
              className="form-select"
              value={nameComplexity}
              onChange={handleChangeComplexity}
            >
              {gameData.options.map((opt) => (
                <option key={opt.name} value={opt.name}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="currencySelect" className="form-label">Валюта ставки:</label>
            <select
              id="currencySelect"
              className="form-select"
              value={bidCurrency}
              onChange={handleBidCurrencyChange}
            >
              {namesCurrencies.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="bidAmount" className="form-label">Величина ставки:</label>
            <input
              type="number"
              id="bidAmount"
              className="form-control"
              value={bid}
              onChange={handleBidChange}
              placeholder="Введите сумму"
              min="1"
            />
          </div>
        </div>

        {currentOption && (
          <div className="alert alert-info mt-4">
            {currentOption.discription}<br />
            В случае победы Ваша ставка умножается на <strong>{currentOption.bonusCoefficient}</strong>.
          </div>
        )}

        <div className="text-center mt-4">
          <button
            className="btn btn-success px-5"
            onClick={handleStartGame}
            disabled={!bid || +bid <= 0}
          >
            Старт
          </button>
        </div>
      </div>
    </div>
  );
};
