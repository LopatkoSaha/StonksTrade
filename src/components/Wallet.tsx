import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "store/hooks";
import { walletGet } from "api/walletGet";

interface WalletState {
    [key: string]: number;
  }

  interface CoinIconsState {
    [key: string]: string;
  }

export const Wallet = () => {
    const dispatch = useDispatch();
  const wallet: WalletState = useAppSelector((state) => state.wallet);
  const icons: CoinIconsState = useAppSelector((state) => state.coinIcons);
  const courses = useAppSelector((state) => state.courses);

  useEffect(() => {
    walletGet(dispatch);
  }, [courses]);

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-header text-white bg-dark fs-4">Кошелек</div>
        <div className="card-body">
          {/* Баланс в USD */}
          <div className="text-end mb-4">
            <h4 className="text-success">${Number(wallet.usd).toFixed(2)}</h4>
          </div>

          {/* Список монет */}
          <div className="row g-4">
            {Object.entries(wallet).map(([name, value]) => {
              if (name === "id" || name === "created_at" || name === "usd" || value < 0.01) return null;

              return (
                <div className="col-6 col-md-4 col-lg-3" key={name}>
                  <div className="card h-100 text-center p-3">
                    <div className="mb-2">
                      <img
                        src={icons[name]}
                        alt={name}
                        className="img-fluid"
                        style={{ width: "35%", height: "auto" }}
                      />
                    </div>
                    <h6 className="text-capitalize mb-1">{name}</h6>
                    <div className="fw-bold">{Number(value).toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
};