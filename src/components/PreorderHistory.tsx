import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "store/hooks";
import { preorderDelete } from "api/preorderDelete";
import { preordersGet } from "api/preordersGet";

interface CoinIconsState {
  [key: string]: string;
}

const optionShow = ["Активные", "Не активные", "Все"];

export const PreorderHistory = () => {
  const dispatch = useDispatch();
  const icons: CoinIconsState = useAppSelector((state) => state.coinIcons);
  const courses = useAppSelector((state) => state.courses);
  const preorders = useAppSelector((state) => state.preorders);
  const [conditionShow, setConditionShow] = useState(optionShow[0]);

  useEffect(() => {
    preordersGet(dispatch);
  }, [courses]);

  const handleShowPreorders = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConditionShow(e.target.value);
  };

  const handlerDeletePreorder = async (id: number) => {
    await preorderDelete(dispatch, id);
    preordersGet(dispatch);
  };

  const filteredPreorders = preorders.filter((item) => {
    if (conditionShow === "Активные") return item.is_active === 1;
    if (conditionShow === "Не активные") return item.is_active === 0;
    return true;
  });

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <h4>{conditionShow} предзаказы</h4>
      </div>

      <div className="mb-4 d-flex align-items-center gap-2">
        <label htmlFor="dropdown" className="form-label mb-0">
          Показать:
        </label>
        <select
          id="dropdown"
          className="form-select w-auto"
          value={conditionShow}
          onChange={handleShowPreorders}
        >
          {optionShow.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {filteredPreorders.length === 0 ? (
        <div className="text-muted">Данные отсутствуют</div>
      ) : (
        <div className="row row-cols-1 g-3">
          {filteredPreorders.map((item) => (
            <div className="col" key={item.id}>
              <div
                className={`card shadow-sm ${
                  item.is_active === 1 ? "border-success" : "border-secondary"
                }`}
              >
                <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <div className="mb-2 mb-md-0">
                    <p className="mb-1 fw-semibold">
                      Купить {item.is_all_in ? "на всё" : item.value_buy}{" "}
                      <strong>{item.currency_buy}</strong> за{" "}
                      <strong>{item.currency_sell}</strong>
                    </p>
                    <p className="mb-0 text-muted small">
                      Курс: {item.trigger_course} | Дата:{" "}
                      {item.created_at.split("T")[0]} |{" "}
                      {item.is_active === 1 ? (
                        <span className="text-success">Активный</span>
                      ) : (
                        <span className="text-secondary">Не активный</span>
                      )}
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handlerDeletePreorder(item.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
