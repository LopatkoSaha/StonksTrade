import React, { useState } from "react";

import { useAppSelector } from "store/hooks";
import { useCheckAuth } from "hooks/useCheckAuth";
import { CabinetPageProps, TCabinetTabs, dictionary } from "config";

export const CabinetPage: React.FC<CabinetPageProps> = ({tabProps}) => {

  useCheckAuth();
  const user = useAppSelector((state) => state.user);
  const isUser = Boolean(user);
  

  const [activeTab, setActiveTab] = useState<TCabinetTabs>(Object.keys(tabProps)[0] as TCabinetTabs);

  if (!tabProps || Object.keys(tabProps).length === 0) {
    return <div>Загрузка...</div>; 
  }

  return (
    <>
      {!isUser && 
        <div className="cabinetPage d-flex justify-content-center align-items-center">
          <p className="">Кабинет доступен только авторизированным пользователям</p>
        </div>
      }
      {isUser && (
        <div className="cabinetPage">
          {/* Заголовок */}
          <div className="text-center mb-4">
            <h2 className="fw-bold">{dictionary[activeTab]}</h2>
          </div>

          {/* Таб-меню */}
          <div className="d-flex flex-wrap justify-content-center mb-4 gap-2">
            {Object.keys(tabProps).map((name) => {
              const tabName = name as TCabinetTabs;
              const isActive = tabName === activeTab;
              return (
                <button
                  key={tabName}
                  className={`btn ${isActive ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => setActiveTab(tabName)}
                >
                  {dictionary[tabName]}
                </button>
              );
            })}
          </div>
          {/* Контент текущего таба */}
          <div className="card p-4 shadow-sm">
            {React.createElement(tabProps[activeTab])}
          </div>
        </div>
      )}
    </>
  )
};