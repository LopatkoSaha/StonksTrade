import { Wallet } from "components/Wallet";
import { BuyCurrency } from "components/BuyCurrency";
import { Telegram } from "components/Telegram";
import { Forecast } from "components/Forecast";
import { Preorder } from "components/Preorder";
import { PreorderHistory } from "components/PreorderHistory";
import { AllGameOptions } from "components/Admin/AdminGames/AllGameOptions";
import { AllGamesInfo } from "components/Admin/AdminGames/AllGamesInfo";
import { UsersList } from "components/Admin/AdminUsers/UsersList";
import { WalletsList } from "components/Admin/AdminWallets/WalletsList";

export const WS_ALL_URL = "ws://localhost:8008/allCourses";
export const WS_ONE_URL = "ws://localhost:8009/oneCourse";

export const cabinetTabs = {
    Wallet: Wallet,
    BuyCurrency: BuyCurrency,
    Telegram: Telegram,
    Forecast: Forecast,
    Preorder: Preorder,
    PreorderHistory: PreorderHistory,
  } as const;
  
  export type TCabinetTabs = keyof typeof cabinetTabs;

  export interface CabinetPageProps {
    tabProps: Record<TCabinetTabs, React.FC>;
  };

  export const dictionary = {
    Wallet: "Кошелек",
    BuyCurrency: "Покупка",
    Preorder: "Предзаказ",
    PreorderHistory: "История предзаказов",
    Telegram: "Телеграм",
    Forecast: "Прогноз ИИ",
    AllGamesInfo: "Все игры",
    AllGameOptions: "Oпции игры",
    UsersList: "Общее",
    WalletsList: "Общее",
  };

  export const AdminGamesTabs = {
  AllGamesInfo: AllGamesInfo, 
  AllGameOptions: AllGameOptions, 
} as const;

export type TAdminGamesTabs = keyof typeof AdminGamesTabs;

export interface AdminGamesPageProps {
  tabProps: Record<TAdminGamesTabs, React.FC>;
};

export const AdminUsersTabs = { 
  UsersList: UsersList,  
} as const;

export type TAdminUsersTabs = keyof typeof AdminUsersTabs;

export interface AdminUsersPageProps {
  tabProps: Record<TAdminUsersTabs, React.FC>;
};

export const AdminWalletsTabs = { 
  WalletsList: WalletsList,  
} as const;

export type TAdminWalletsTabs = keyof typeof AdminWalletsTabs;

export interface AdminWalletsPageProps {
  tabProps: Record<TAdminWalletsTabs, React.FC>;
};