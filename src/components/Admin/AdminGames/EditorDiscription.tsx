import { useState } from "react";

type TProps = {
    discription: string;
    changeDiscription: (text: string) => void;
    showEditer: () => void;
}

export const EditorDiscription = ({ discription, changeDiscription, showEditer}: TProps) => {
    const [newDiscription, setNewDiscription] = useState<string>(discription);

    const handleTriggerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDiscription(e.target.value);
      };
    
    const validator = discription === newDiscription;
    const handleChange = () => {
        changeDiscription(newDiscription);
        showEditer();
    };

    return(
        <div className="p-3 border rounded bg-light mb-3">
            <div className="mb-3">
                <textarea
                className="form-control"
                value={newDiscription}
                onChange={handleTriggerChange}
                placeholder="Введите описание"
                rows={4}
                />
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button
                className="btn btn-primary"
                onClick={handleChange}
                disabled={validator}
                >
                Применить
                </button>
                <button className="btn btn-outline-secondary" onClick={showEditer}>
                Отмена
                </button>
            </div>
        </div>
    )
}