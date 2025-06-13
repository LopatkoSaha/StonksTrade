import "./MainFeatures.css";
import { FadeInSection } from "elements/FadeInSection";

export function MainFeatures() {
  return (
    <div className="main-features">
        <FadeInSection direction="left" additionalClass="feature">
          <h3 className="fs-5 mt-2">🚀 StonksTrade — туда, где деньги крутятся быстро</h3>
          <p className="fs-6 mt-2">
            Забудь скучные биржи. Здесь ты торгуешь быстро, дерзко и в плюсе.
            Присоединяйся к платформе, где крипта — это не мода, а способ жить.
          </p>
        </FadeInSection>
        <FadeInSection direction="right" additionalClass="feature">
        <h3 className="fs-5 mt-2">Мы не обычная биржа. Мы — StonksTrade</h3>
          <p className="fs-6 mt-2">
            ⚡ Скорость, как у ракеты — сделки летят, пока другие тормозят<br />
            🔒 Твоя крипта — под замком — никакой драмы, только жёсткая безопасность<br />
            🧠 Функции для про-игроков — графики, сигналы, боты — всё под рукой<br />
            😎 Дизайн, который не бесит — интерфейс не мешает, а помогает<br />
            ☎️ Поддержка, как у друзей — без ботов и скриптов
          </p>
        </FadeInSection>
        <FadeInSection direction="left" additionalClass="feature">
          <h3 className="fs-5 mt-2">Торговля без тормозов. Именно так, как ты хочешь</h3>
          <p className="fs-6 mt-2">
          Ты можешь:<br />
          <br />
          ⚔️ Покупать и продавать монеты в пару кликов<br />
          📊 Следить за графиками в реальном времени<br />
          🤖 Подключать автоторговлю и ботов<br />
          🔄 Обменивать токены без комиссии<br />
          📱 Всё это — с телефона, где бы ты ни был<br />
          <br />
          StonksTrade — это не просто «ещё одна платформа». Это твой личный инструмент для взрывной торговли.
          </p>
        </FadeInSection>
        <FadeInSection direction="right" additionalClass="feature">
          <h3 className="fs-5 mt-2">Хватит смотреть. Пора входить в игру</h3>
          <p className="fs-6 mt-2">
            Рынок не ждёт. Создай аккаунт за 60 секунд — и зарабатывай уже сегодня.
          </p>
          <button className="btn btn-success btn-lg buy-btn">🔥 Залететь в StonksTrade</button>
        </FadeInSection>
        <FadeInSection direction="left" additionalClass="feature">
        <h3 className="fs-5 mt-2">Мы не обещаем — мы доказываем</h3>
          <p className="fs-6 mt-2">
            «На StonksTrade я зашёл по приколу. Остался — потому что за неделю сделал x2. Пушка!»<br />
              — Виталий, 24 года, трейдер-самоучка<br />
            <br />
            «Здесь всё летает. Остальные платформы — как Windows 95 в сравнении.»<br />
              — Ксения, торгует криптой с 2020
          </p>
        </FadeInSection>
    </div>
  );
}
