import { useState } from "react";

import { TOption } from "./AllGameOptions";

type TProps = {
    props: TOption
    isUpdate: boolean;
    closeHandler: () => void;
    createHandler: (data: any) => void;
    updataHandler: (data: any) => void;
};

export const FormOptions = ({
    props,
    isUpdate,
    closeHandler,
    createHandler,
    updataHandler
}: TProps) => {

    let initGameConfig: Record<string, any> = {};
  if(props.game_config) {
    for (const key in JSON.parse(props.game_config)) {
      initGameConfig[key] = "";
    };
  };

    const [nameComplexity, setNameComplexity] = useState<string>(isUpdate ? props.name_complexity : "");
    const [bonusCoefficient, setBonusCoefficient] = useState<string>(isUpdate ? props.bonus_coefficient : "");
    const [discriptionComplexity, setDiscriptionComplexity] = useState<string>(isUpdate ? props.discription_complexity : "");
    const [sortOrder, setSortOrder] = useState<string>(isUpdate ? props.sort_order : "");
    const [gameConfig, setGameConfig] = useState<Record<string, any>>(isUpdate ? JSON.parse(props.game_config) : initGameConfig);

    const handleNameComplexityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameComplexity(e.target.value);
    };
    const handleBonusCoefficientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBonusCoefficient(e.target.value);
    };
    const handleDiscriptionComplexityChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDiscriptionComplexity(e.target.value);
    };
    const handleGortOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSortOrder(e.target.value);
    };

    const handleGameConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.dataset.key;
        const value = e.target.value;
      
        if (key) {
          setGameConfig((prev) => ({
            ...prev,
            [key]: Number(value),
          }));
        }
      };

    const requestData = {
        id: props.id,
        gameId: props.game_id,
        nameComplexity,
        bonusCoefficient,
        discriptionComplexity,
        sortOrder,
        gameConfig,
    };

    const isRequestData = Object.values(requestData).every(value => Boolean(value));

    const requestDataHandler = () => {
        if(isUpdate) updataHandler(requestData);
        if(!isUpdate) createHandler(requestData);
        closeHandler();
    };

    return (
        <div className="modal d-block bg-dark bg-opacity-50" tabIndex={-1}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Заполните форму</h5>
                    <button type="button" className="btn-close" onClick={closeHandler}></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                    <label className="form-label">name_complexity:</label>
                    <input
                        className="form-control"
                        type="text"
                        data-key="name_complexity"
                        value={nameComplexity}
                        onChange={handleNameComplexityChange}
                        placeholder="Введите значение"
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">bonus_coefficient:</label>
                    <input
                        className="form-control"
                        type="number"
                        min={1}
                        data-key="bonus_coefficient"
                        value={bonusCoefficient}
                        onChange={handleBonusCoefficientChange}
                        placeholder="Введите значение"
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">discription_complexity:</label>
                    <textarea
                        className="form-control"
                        data-key="discription_complexity"
                        value={discriptionComplexity}
                        onChange={handleDiscriptionComplexityChange}
                        placeholder="Введите значение"
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">sort_order:</label>
                    <input
                        className="form-control"
                        type="number"
                        data-key="sort_order"
                        value={sortOrder}
                        onChange={handleGortOrderChange}
                        placeholder="Введите значение"
                    />
                    </div>

                    {Object.entries(gameConfig).map(([key, value]) => (
                    <div className="mb-3" key={key}>
                        <label className="form-label">{key}:</label>
                        <input
                        className="form-control"
                        type="number"
                        min={1}
                        data-key={key}
                        value={value}
                        onChange={handleGameConfigChange}
                        placeholder="Введите значение"
                        />
                    </div>
                    ))}
                </div>

                <div className="modal-footer">
                    <button
                    className="btn btn-primary"
                    onClick={requestDataHandler}
                    disabled={!isRequestData}
                    >
                    Готово
                    </button>
                    <button className="btn btn-secondary" onClick={closeHandler}>
                    Отмена
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}