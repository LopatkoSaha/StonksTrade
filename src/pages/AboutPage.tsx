import "./pages.css";
import { FadeInSection } from "elements/FadeInSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import page from "assets/stonksUp.png";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

export function AboutPage() {
  return (
    <div className="aboutPage">
      {/* 🧠 Hero Section */}
      <section className="bg-secondary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Добро пожаловать в StonksTrade</h1>
          <p className="lead">
            Платформа для будущего криптовалют. Инновации. Скорость. Безопасность.
          </p>
          <a href="#mission" className="btn btn-light mt-3">Узнать больше</a>
        </div>
      </section>

      <div className="container py-5">
        {/* 💼 Миссия и цели */}
        <FadeInSection direction="left">
          <div className="row align-items-center mb-5" id="mission">
            <div className="col-md-6">
              <h2 className="h4 fw-bold mb-3">Миссия и цели</h2>
              <p className="lead">
                Сделать криптовалютную торговлю доступной, быстрой и безопасной для всех.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img src={page} alt="About" className="img-fluid rounded shadow" />
            </div>
          </div>
        </FadeInSection>

        {/* 👥 Кто мы */}
        <FadeInSection direction="right">
          <div className="text-center mb-5">
            <h2 className="h4 fw-bold mb-3">Кто мы такие</h2>
            <p className="lead">
              Команда трейдеров, разработчиков и крипто-энтузиастов с опытом более 5 лет.
            </p>
          </div>
        </FadeInSection>

        {/* 🚀 Преимущества */}
        <FadeInSection direction="left">
          <div className="mb-5">
            <h2 className="h4 fw-bold mb-3">Наши преимущества</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent">⚡ Быстрая система исполнения ордеров</li>
              <li className="list-group-item bg-transparent">🔒 Двухфакторная аутентификация</li>
              <li className="list-group-item bg-transparent">📈 Аналитика в реальном времени</li>
              <li className="list-group-item bg-transparent">🤖 Поддержка торговых ботов</li>
            </ul>
          </div>
        </FadeInSection>

        {/* 🔐 Безопасность */}
        <FadeInSection direction="right">
          <div className="mb-5">
            <h2 className="h4 fw-bold mb-3">Безопасность</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent">Холодное хранение активов</li>
              <li className="list-group-item bg-transparent">🔒 Двухфакторная защита</li>
              <li className="list-group-item bg-transparent">Шифрование пользовательских данных</li>
              <li className="list-group-item bg-transparent">Аудит кода и уязвимостей</li>
            </ul>
          </div>
        </FadeInSection>

        {/* 📬 Контакты */}
        <FadeInSection direction="left">
          <div className="mb-5">
            <h2 className="h4 fw-bold mb-3">Контакты</h2>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FontAwesomeIcon icon={faMessage} className="me-2" />
                stonkstrade.supp@gmail.com
              </li>
              <li>
                <FontAwesomeIcon icon={faGithub} className="me-2" />
                <a href="https://github.com/LopatkoSaha" target="_blank" rel="noreferrer" className="link-secondary">
                  GitHub / LopatkoSaha
                </a>
              </li>
            </ul>
          </div>
        </FadeInSection>

        {/* 🔮 Будущее */}
        <FadeInSection direction="right">
          <div className="mb-5 text-center">
            <h2 className="h4 fw-bold mb-3">Будущее StonksTrade</h2>
            <p className="lead mb-4">
              Мы только начинаем. Впереди — амбициозные цели и большие перемены.
            </p>
            <ul className="list-group list-group-flush mb-3 text-start mx-auto" style={{ maxWidth: "700px" }}>
              <li className="list-group-item bg-transparent">📱 Мобильное приложение</li>
              <li className="list-group-item bg-transparent">🎨 Интеграция NFT</li>
              <li className="list-group-item bg-transparent">💰 Стейкинг и пассивный доход</li>
              <li className="list-group-item bg-transparent">🧠 AI-аналитика и сигналы</li>
              <li className="list-group-item bg-transparent">🧰 Маркетплейс DeFi</li>
              <li className="list-group-item bg-transparent">🎓 Образовательный центр</li>
            </ul>
            <p className="lead">
              Присоединяйся к нам — формируй крипто-мир будущего вместе с нами!
            </p>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
