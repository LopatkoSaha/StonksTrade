import { TOption } from "./AllGameOptions";

type TProps = TOption & {
    idx: number;
    deleteRequestHandler: (id: number) => void;
    updateHandler: (index: number) => void;
};

export const OneOption = ({
    idx,
    id, 
    game_id, 
    name_complexity, 
    bonus_coefficient, 
    discription_complexity, 
    sort_order, 
    game_config,
    deleteRequestHandler,
    updateHandler
}: TProps) => {

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">name_complexity: {name_complexity}</h5>

                <p className="mb-1"><strong>bonus_coefficient:</strong> {bonus_coefficient}</p>
                <p className="mb-1">
                <strong>discription_complexity:</strong>{" "}
                {discription_complexity.length > 20
                    ? discription_complexity.slice(0, 20) + "..."
                    : discription_complexity}
                </p>
                <p className="mb-3"><strong>sort_order:</strong> {sort_order}</p>

                <div className="d-flex gap-2">
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => updateHandler(idx)}
                >
                    Изменить
                </button>
                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteRequestHandler(id)}
                >
                    Удалить
                </button>
                </div>
            </div>
        </div>
    )
}