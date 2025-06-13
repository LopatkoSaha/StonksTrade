import { useState } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "store/hooks";
import { preorderSet } from "api/preorderSet";
import { preordersGet } from "api/preordersGet";

interface WalletState {
    [key: string]: number;
}

interface CoinIconsState {
    [key: string]: string;
}

export const Preorder = () => {
    const dispatch = useDispatch();
    const wallet: WalletState = useAppSelector((state) => state.wallet);
    const user = useAppSelector((state) => state.user);
    const icons: CoinIconsState = useAppSelector((state) => state.coinIcons);

    const currencyNames = Object.keys(wallet).filter(
        (name) => name !== "id" && name !== "created_at"
    );

    const [saleName, setSaleName] = useState("usd");
    const [buyName, setBuyName] = useState("usd");
    const [quantity, setQuantity] = useState("");
    const [trigger, setTrigger] = useState("");
    const [isAllIn, setIsAllIn] = useState(false);

    const handleSaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSaleName(event.target.value);
    };
    const handleBuyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBuyName(event.target.value);
    };
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value);
    };
    const handleIsAllInChange = () => {
        setIsAllIn(!isAllIn);
        if (!isAllIn) setQuantity("");
    };
    const handleTriggerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrigger(event.target.value);
    };

    const isValidFormPreorder = [saleName, buyName].some(
        (item) => (item === "") || (saleName === buyName)
    ) || (!isAllIn && quantity === "") || (trigger === "");

    const cancelHandler = () => {
        setSaleName("usd");
        setBuyName("usd");
        setQuantity("");
        setIsAllIn(false);
        setTrigger("");
    };

    const preorderHandler = async () => {
        await preorderSet(saleName, buyName, isAllIn ? null : +quantity, isAllIn ? 1 : 0 , +trigger);
        preordersGet(dispatch);
        cancelHandler();
    };

    return (
    <div className="container py-4">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-header text-center fw-bold">Создать предзаказ</div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="saleDropdown" className="form-label">
              За какую валюту купить
            </label>
            <select
              id="saleDropdown"
              className="form-select"
              value={saleName}
              onChange={handleSaleChange}
            >
              {currencyNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="buyDropdown" className="form-label">
              Какую валюту купить
            </label>
            <select
              id="buyDropdown"
              className="form-select"
              value={buyName}
              onChange={handleBuyChange}
            >
              {currencyNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Количество</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Введите количество"
              disabled={isAllIn}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Желаемый курс</label>
            <input
              type="number"
              className="form-control"
              value={trigger}
              onChange={handleTriggerChange}
              placeholder="Введите желаемый курс"
            />
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isAllIn}
              onChange={handleIsAllInChange}
              id="allInCheck"
            />
            <label className="form-check-label" htmlFor="allInCheck">
              Купить на всё
            </label>
          </div>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary"
              onClick={preorderHandler}
              disabled={isValidFormPreorder}
            >
              Создать
            </button>
            <button className="btn btn-outline-secondary" onClick={cancelHandler}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
