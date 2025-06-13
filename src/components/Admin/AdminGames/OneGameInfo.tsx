import { useState } from "react";

import { EditorDiscription } from "./EditorDiscription";

type TProps = {
    id: number;
    name: string;
    discription: string;
    handleDiscription: (id: number, name: string, discription: string) => void;
}

export const OneGameInfo = ({id, name, discription, handleDiscription}: TProps) => {
    const [isShowEditer, setIsShowEditer] = useState<boolean>(false);

    const changeDiscription = (text: string) => {
        handleDiscription(id, name, text);
    };
    
    const showEditor = () => {
        setIsShowEditer(false);
    }

    return(
        <div className="border rounded p-3 mb-3 shadow-sm bg-light">
            <p className="mb-1 text-muted"><strong>ID:</strong> {id}</p>
            <p className="mb-1 text-muted"><strong>Название:</strong> {name}</p>

            {!isShowEditer ? (
                <>
                <p className="mb-2 text-muted">{discription}</p>
                <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setIsShowEditer(true)}
                >
                    Изменить описание
                </button>
                </>
            ) : (
                <EditorDiscription
                discription={discription}
                changeDiscription={changeDiscription}
                showEditer={showEditor}
                />
            )}
        </div>
    )
}