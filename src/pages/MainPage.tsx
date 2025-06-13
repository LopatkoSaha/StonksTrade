import "./pages.css";
import { MainScreen } from "components/MainScreen/MainScreen";
import { MainFeatures } from "components/MainFeatures/MainFeatures";

export function MainPage() {
  return (
    <div className="mainPage">
      <MainScreen />
      <MainFeatures />
    </div>
  );
}
