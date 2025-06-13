import { Routes, Route } from "react-router-dom";
import { MainPage } from "pages/MainPage";
import { AboutPage } from "pages/AboutPage";
import { CabinetPage } from "pages/CabinetPage";
import { MarketPage } from "pages/MarketPage";
import { ChartPage } from "pages/ChartPage/ChartPage";
import { ContactsPage } from "pages/ContactsPage";
import { GamePage } from "pages/GamePage";
import { AdminUsersPage } from "pages/AdminPage/AdminUsersPage";
import { AdminWalletsPage } from "pages/AdminPage/AdminWalletsPage"
import { AdminGamesPage } from "pages/AdminPage/AdminGamesPage";
import { cabinetTabs, AdminUsersTabs, AdminWalletsTabs, AdminGamesTabs } from "config";

export const pages = {
  HOME: { title: "Home", to: "/", component: MainPage },
  ABOUT: { title: "About", to: "/about", component: AboutPage },
  CABINET: { title: "Cabinet", to: "/cabinet", component: () => <CabinetPage tabProps={cabinetTabs} />},
  MARKET: { title: "Market", to: "/market", component: MarketPage },
  CHART: { title: "Chart", to: "/chart/:currency", component: ChartPage },
  CONTACTS: { title: "Contacts", to: "/contacts", component: ContactsPage },
  GAMES: { title: "Games", to: "/games", component: GamePage },
  USERSADMIN: { title: "UsersAdm", to: "/admin/users", component: () => <AdminUsersPage tabProps={AdminUsersTabs} />},
  WALLETSADMIN: { title: "WalletsAdm", to: "/admin/wallets", component: () => <AdminWalletsPage tabProps={AdminWalletsTabs} />},
  GAMESADMIN: { title: "GamesAdm", to: "/admin/games", component: () => <AdminGamesPage tabProps={AdminGamesTabs} />},

};

export function Router() {
  return (
    <Routes>
      {Object.entries(pages).map(([key, { to, component: Component }]) => (
        <Route key={key} path={to} element={<Component />} />
      ))}
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
}