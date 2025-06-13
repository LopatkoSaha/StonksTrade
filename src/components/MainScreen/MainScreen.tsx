import "./MainScreen.css";
import { Modal } from "components/Modal/Modal";

export function MainScreen() {
  return (
    <div className="main-screen">
      <div className="container pt-5 main-content">
        <div className="w-50 d-flex flex-column justify-content-start">
          <h1>STONKS TRADE</h1>
          <h2>Торгуй умнее. Двигайся быстрее. Будь впереди.</h2>
          <p className="fs-3 mt-2">Инновационная платформа для покупки, продажи и управления криптовалютой — просто, безопасно и выгодно.</p>
        </div>
        <button className="btn btn-success btn-lg buy-btn" onClick={() => alert('Поздравляем, ты впереди')}>Быть впереди</button>
      </div>
    </div>
  );
}
