import { useState, useEffect } from "react";

import { allGamesInfoGet, allGameOptonsPost } from "api/adminRestApi/gamesInfo";
import { createGameOptionsPost, updataGameOptionsPost, deleteGameOptionsPost } from "api/adminRestApi/gameOptions";
import { Dropdown } from "./Dropdown";
import { OneOption } from "./OneOption";
import { FormOptions } from "./FormOptions";

type TGameInfo = {
  info: {
    id: number;
    name: string;
    discription: string;
  };
  options: {
    id: number;
    game_id: number;
    name_complexity: string;
    bonus_coefficient: string;
    discription_complexity: string;
    sort_order: string;
    game_config: string;
  }[];
};

type TRequestData = {
    id: number;
    gameId: number;
    nameComplexity: string;
    bonusCoefficient: string;
    discriptionComplexity: string;
    sortOrder: string;
    gameConfig: Record<string, number>;
}

export type TOption = TGameInfo["options"][number];

export const AllGameOptions = () => { 
  const [gamesName, setGamesName] = useState<string[] | null>(null);
  const [gameName, setGameName] = useState<string>("");
  const [gameOptions, setGameOptions] = useState<TGameInfo | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [optionIdx, setOptionIdx] = useState<number>(0);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);


  async function createRequestHandler(data: TRequestData){
    await createGameOptionsPost(data.gameId, data.nameComplexity, data.bonusCoefficient, data.discriptionComplexity, data.sortOrder, data.gameConfig);
    await fetchOptions();
  };

  async function updataRequestHandler(data: TRequestData){
    await updataGameOptionsPost(data.id, data.nameComplexity, data.bonusCoefficient, data.discriptionComplexity, data.sortOrder, data.gameConfig);
    await fetchOptions();
  };

  async function deleteRequestHandler(id: number){
    await deleteGameOptionsPost(id);
    await fetchOptions();
  };

  function closeHandler(){
    setShowModal(false);
  }
  function createHandler(){
    setShowModal(true);
    setOptionIdx(0);
    setIsUpdate(false);
  }

  function updateHandler(index: number){
    setShowModal(true);
    setOptionIdx(index);
    setIsUpdate(true);
  }


  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await allGamesInfoGet();
        const games = data.map((item: Record<string, any>) => {
          return item.name;
          });
        setGamesName(games);
      } catch (error) {
        console.error("Ошибка при получении данных об играх:", error);
      }
    };
    fetchInfo();
  },[]);

  const fetchOptions = async () => {
    try {
      const data = await allGameOptonsPost(gameName);
      setGameOptions(data);
    } catch (error) {
      console.error("Ошибка при получении опций игры:", error);
    }
  };

  useEffect(() => { 
    fetchOptions();
  },[gameName]);

  return (
    <div className="container">
      {gamesName && (
        <div className="mb-3">
          <Dropdown gameNames={gamesName} gameName={gameName} setGameName={setGameName} />
        </div>
      )}

      <h4 className="mb-3">{gameOptions ? gameOptions.info.name : ""}</h4>

      {gameName && (
        <button className="btn btn-primary mb-4" onClick={createHandler}>
          Создать опции
        </button>
      )}

      <div className="row g-3">
        {gameOptions &&
          gameOptions.options
            .sort((a, b) => +a.sort_order - +b.sort_order)
            .map((item, idx) => (
              <div className="col-12" key={item.id}>
                <OneOption
                  idx={idx}
                  id={item.id}
                  game_id={item.game_id}
                  name_complexity={item.name_complexity}
                  bonus_coefficient={item.bonus_coefficient}
                  discription_complexity={item.discription_complexity}
                  sort_order={item.sort_order}
                  game_config={item.game_config}
                  deleteRequestHandler={deleteRequestHandler}
                  updateHandler={updateHandler}
                />
              </div>
            ))}
      </div>

      {showModal && (
        <FormOptions
          props={gameOptions?.options[optionIdx]!}
          isUpdate={isUpdate}
          closeHandler={closeHandler}
          createHandler={createRequestHandler}
          updataHandler={updataRequestHandler}
        />
      )}
    </div>
  )
}