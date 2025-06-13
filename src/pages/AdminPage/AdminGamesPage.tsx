import React, { useState } from "react";

import { useAppSelector } from "store/hooks";
import { AdminGamesPageProps, TAdminGamesTabs, dictionary } from "config";
import { useCheckAuth } from "hooks/useCheckAuth";

export const AdminGamesPage: React.FC<AdminGamesPageProps> = ({tabProps}) => {

  useCheckAuth();
  const user = useAppSelector((state) => state.user);
  const isUser = Boolean(user?.name);

  const [activeTab, setActiveTab] = useState<TAdminGamesTabs>(Object.keys(tabProps)[0] as TAdminGamesTabs);

  if (!tabProps || Object.keys(tabProps).length === 0) {
    return <div>Загрузка...</div>; 
  }

  return (
    <>
      {isUser && (
        <div className="adminGamePage">
          <h3 className="mb-4">{dictionary[activeTab]}</h3>
          
          <ul className="nav nav-tabs mb-3">
            {Object.keys(tabProps).map((name) => {
              const tabName = name as TAdminGamesTabs;
              return (
                <li className="nav-item" key={tabName}>
                  <button
                    className={`nav-link ${tabName === activeTab ? "active" : ""}`}
                    onClick={() => setActiveTab(tabName)}
                    type="button"
                  >
                    {dictionary[tabName]}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="tab-content">
            <div className="tab-pane active">
              {React.createElement(tabProps[activeTab])}
            </div>
          </div>
        </div>
      )}
    </>
  )
};