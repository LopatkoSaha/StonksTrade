import { useState, useEffect } from "react";
import { useAppSelector } from "store/hooks";
import { forecastPost } from "api/forecastPost";
import { ForecastToken } from "api/forecastToken";

interface WalletState {
  [key: string]: number;
}
const intervalNames = ["7", "30", "183", "365"];

export const Forecast = () => {
  const wallet: WalletState = useAppSelector((state) => state.wallet);
  const [forecastName, setForecastName] = useState("usd");
  const [forecastInterval, setForecastInterval] = useState("7");
  const [slowdowner, setSlowdowner] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [valueTokens, setValueTokens] = useState("");
  const [valueBuyTokens, setValueBuyTokens] = useState("1");

  const fetchDataTokens = async () => {
    const value = await ForecastToken.get();
    setValueTokens(value);
  };

  useEffect(() => {
    fetchDataTokens();
  }, []);

  const currencyNames = Object.keys(wallet).filter(
    (name) => name !== "id" && name !== "created_at"
  );

  const handleForecastNameChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForecastName(e.target.value);
  const handleForecastIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForecastInterval(e.target.value);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValueBuyTokens(e.target.value);

  const delayedCharacters = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      let index = 0;
      let displaySymbols = "";
      const generate = () => {
        setTimeout(() => {
          if (index < text.length - 1) {
            displaySymbols += text[index];
            setSlowdowner(displaySymbols);
            index++;
            generate();
          } else {
            resolve();
          }
        }, 20);
      };
      generate();
    });
  };

  const handlForecast = async () => {
    setSlowdowner("Loading...");
    setIsActive(false);
    const forecastResult = await forecastPost(forecastName, forecastInterval);
    await delayedCharacters(forecastResult);
    setIsActive(true);
    fetchDataTokens();
  };

  const handlBuyTokens = async () => {
    await ForecastToken.set(+valueBuyTokens);
    fetchDataTokens();
    setValueBuyTokens("1");
  };

  return (
    <div className="container py-5">
      <div className="row gy-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Ваши токены</div>
            <div className="card-body">
              <p className="mb-3">У вас <strong>{valueTokens}</strong> токенов для прогноза.</p>
              <div className="mb-3">
                <label className="form-label">Купить токены:</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={valueBuyTokens}
                  onChange={handleQuantityChange}
                  placeholder="Введите количество"
                />
              </div>
              <button className="btn btn-success w-100" onClick={handlBuyTokens}>
                Купить
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Прогноз курса</div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Прогнозируемая валюта</label>
                <select
                  className="form-select"
                  value={forecastName}
                  onChange={handleForecastNameChange}
                >
                  {currencyNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Период прогноза</label>
                <select
                  className="form-select"
                  value={forecastInterval}
                  onChange={handleForecastIntervalChange}
                >
                  {intervalNames.map((interval) => (
                    <option key={interval} value={interval}>{interval} дней</option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handlForecast}
                disabled={!isActive}
              >
                Получить прогноз
              </button>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">Результат</div>
            <div className="card-body text-center fs-5">
              {slowdowner === "Loading..." ?  "Loading..." : slowdowner}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
