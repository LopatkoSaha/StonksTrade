import { useState, useEffect } from "react";

import { allGamesInfoGet, setGameDiscriptionPost } from "api/adminRestApi/gamesInfo";
import { OneGameInfo } from "./OneGameInfo";

export const AllGamesInfo = () => {
  const [gamesInfo, setGamesInfo] = useState<Record<string, any>[] | null>(null);


  useEffect(() => {
      const fetchInfo = async () => {
          try {
            const data = await allGamesInfoGet();
            setGamesInfo(data);
          } catch (error) {
            console.error("Ошибка при получении данных об играх:", error);
          }
        };
        fetchInfo();
  },[])

  const handleDiscription = async (id: number, name: string, discription: string) => {
    await setGameDiscriptionPost(id, name, discription);
    const newData = await allGamesInfoGet();
    setGamesInfo(newData);
  };

  if(!gamesInfo) return null;

  return (
    <div className="container">
      <div className="row">
        {gamesInfo.map((item, idx) => (
          <div className="col-md-4 mb-3" key={idx + Date.now()}>
            <OneGameInfo
              id={item.id}
              name={item.name}
              discription={item.discription}
              handleDiscription={handleDiscription}
            />
          </div>
        ))}
      </div>
    </div>
  )
}