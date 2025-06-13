import React, { useState } from "react";

import { useAppSelector } from "store/hooks";
import { useCheckAuth } from "hooks/useCheckAuth";
import { AdminUsersPageProps, TAdminUsersTabs, dictionary } from "config";

export const AdminUsersPage: React.FC<AdminUsersPageProps> = ({tabProps}) => {

  useCheckAuth();
  const user = useAppSelector((state) => state.user);
  const isUser = Boolean(user?.name);

  const [activeTab, setActiveTab] = useState<TAdminUsersTabs>(Object.keys(tabProps)[0] as TAdminUsersTabs);

  if (!tabProps || Object.keys(tabProps).length === 0) {
    return <div>Загрузка...</div>; 
  }

  return (
    <>
      {isUser && (
        <div className="adminUsersPage">
          <h3 className="mb-4">{dictionary[activeTab]}</h3>

          <ul className="nav nav-tabs mb-3">
            {Object.keys(tabProps).map((name) => {
              const tabName = name as TAdminUsersTabs;
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