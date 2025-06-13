import { useState } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "store/hooks";
import { buyCurrencyPost } from "api/buyCurrencyPost";
import { buyAllInPost } from "api/buyAllInPost";
import { walletGet } from "api/walletGet";

interface WalletState {
    [key: string]: number;
  }

  interface CoinIconsState {
    [key: string]: string;
  }

export const BuyCurrency = () => {
  const dispatch = useDispatch();
  const wallet: WalletState = useAppSelector((state) => state.wallet);
  const user = useAppSelector((state) => state.user);
  const icons: CoinIconsState = useAppSelector((state) => state.coinIcons);

  const currencyNames = Object.keys(wallet).filter(
      (name) => name !== "id" && name !== "created_at"
    );

  const [saleName, setSaleName] = useState('usd');
  const [buyName, setBuyName] = useState('usd');
  const [quantity, setQuantity] = useState('');

    const handleSaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSaleName(event.target.value)
    };
    const handleBuyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBuyName(event.target.value)
    };
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value)
    };

    const isValidFormBuy = [saleName, buyName, quantity].some((item) => item === '' || saleName === buyName);
    const isValidFormBuyAllIn = [saleName, buyName].some((item) => item === '' || saleName === buyName);

    const cancelHandler = () => {
        setSaleName('usd');
        setBuyName('usd');
        setQuantity('');
      };


    const buyHandler = async () => {       
      await buyCurrencyPost(dispatch, saleName, buyName, +quantity);
      walletGet(dispatch);
      cancelHandler();
    };

    const buyAllInHandler = async () => {       
        await buyAllInPost(dispatch, saleName, buyName);
        walletGet(dispatch);
        cancelHandler();
      };

  return (
    <div className="container my-5" >
        <div className="card p-4 shadow">
            {/* Заголовок */}
            <h3 className="card-title mb-4">Покупка и продажа</h3>

            {/* Контент формы */}
            <div className="row gy-3">
            {/* Продажа за валюту */}
            <div className="col-12 col-md-4">
                <label htmlFor="sellCurrency" className="form-label">
                За какую валюту купить:
                </label>
                <select
                id="sellCurrency"
                className="form-select"
                value={saleName}
                onChange={handleSaleChange}
                >
                {currencyNames.map((name) => (
                    <option value={name} key={name}>{name}</option>
                ))}
                </select>
            </div>

            {/* Покупка валюты */}
            <div className="col-12 col-md-4">
                <label htmlFor="buyCurrency" className="form-label">
                Какую валюту купить:
                </label>
                <select
                id="buyCurrency"
                className="form-select"
                value={buyName}
                onChange={handleBuyChange}
                >
                {currencyNames.map((name) => (
                    <option value={name} key={name}>{name}</option>
                ))}
                </select>
            </div>

            {/* Ввод количества */}
            <div className="col-12 col-md-4">
                <label htmlFor="amount" className="form-label">
                Количество:
                </label>
                <input
                id="amount"
                type="number"
                className="form-control"
                placeholder="Введите количество"
                value={quantity}
                onChange={handleQuantityChange}
                />
            </div>
            </div>

            {/* Кнопки */}
            <div className="mt-4 d-flex flex-wrap gap-2">
            <button
                className="btn btn-success"
                onClick={buyHandler}
                disabled={isValidFormBuy}
            >
                Купить
            </button>
            <button
                className="btn btn-secondary"
                onClick={cancelHandler}
            >
                Отмена
            </button>
            <button
                className="btn btn-warning"
                onClick={buyAllInHandler}
                disabled={isValidFormBuyAllIn}
            >
                Купить на всё
            </button>
            </div>
        </div>
    </div>
  )
};