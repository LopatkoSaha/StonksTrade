import { useState } from "react";

type TProps = {
    props: Record<string, any> | null;
    closeHandler: () => void;
    updataHandler: (data: any) => void;
};

export const FormWallet = ({
    props,
    closeHandler,
    updataHandler
}: TProps) => {

    let dataWallet: Record<string, any> = {};
    for (const key in props) {
        if(key === "id" || key === "userId" || key === "name" || key === "email" || key === "created_at" || key === "cost") continue;
        dataWallet[key] = +props[key];
    };

    const [wallet, setWallet] = useState<Record<string, any>>(dataWallet);

    const handleGameConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.dataset.key;
        const value = e.target.value;
      
        if (key) {
            setWallet((prev) => ({
            ...prev,
            [key]: Number(value),
          }));
        }
      };

    const requestDataHandler = () => {
        updataHandler(wallet);
        closeHandler();
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-3">
            <div className="bg-white rounded p-4 shadow-lg w-100" style={{ maxWidth: '600px' }}>
                {/* Заголовок */}
                <h5 className="mb-4 text-center text-muted">{props?.name}</h5>

                {/* Поля ввода */}
                {Object.entries(wallet).map(([key, value]) => (
                <div className="mb-3" key={key}>
                    <label className="form-label fw-semibold text-muted">{key}:</label>
                    <input
                    type="number"
                    className="form-control"
                    min={0}
                    data-key={key}
                    value={value}
                    onChange={handleGameConfigChange}
                    placeholder="Введите значение"
                    />
                </div>
                ))}

                {/* Кнопки */}
                <div className="d-flex justify-content-end gap-2 mt-4">
                <button className="btn btn-primary" onClick={requestDataHandler}>
                    Готово
                </button>
                <button className="btn btn-secondary" onClick={closeHandler}>
                    Отмена
                </button>
                </div>
            </div>
        </div>
    )
}