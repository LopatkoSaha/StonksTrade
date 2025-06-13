import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faTelegram, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./pages.css";

export function ContactsPage() {
  return (
    <div className="contactsPage">
      {/* 💬 Hero-блок */}
      <section className="bg-secondary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Связаться с нами</h1>
          <p className="lead">Мы всегда готовы помочь и ответить на ваши вопросы</p>
        </div>
      </section>

      {/* 📞 Контактные данные */}
      <section className="container py-5">
        <div className="row gy-4 justify-content-center">
          {/* Email */}
          <div className="col-md-4 text-center">
            <FontAwesomeIcon icon={faEnvelope} size="2x" className="mb-3 text-primary" />
            <h5>Email</h5>
            <p>
              <a href="mailto:stonkstrade.supp@gmail.com" className="text-decoration-none">
                stonkstrade.supp@gmail.com
              </a>
            </p>
          </div>

          {/* Telegram */}
          <div className="col-md-4 text-center">
            <FontAwesomeIcon icon={faTelegram} size="2x" className="mb-3 text-info" />
            <h5>Telegram</h5>
            <p>
              <a
                href="https://t.me/stonks_support"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                @stonks_support
              </a>
            </p>
          </div>

          {/* GitHub */}
          <div className="col-md-4 text-center">
            <FontAwesomeIcon icon={faGithub} size="2x" className="mb-3 text-dark" />
            <h5>GitHub</h5>
            <p>
              <a
                href="https://github.com/LopatkoSaha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                github.com/LopatkoSaha
              </a>
            </p>
          </div>

          {/* Телефон (опционально) */}
          <div className="col-md-4 text-center">
            <FontAwesomeIcon icon={faPhone} size="2x" className="mb-3 text-success" />
            <h5>Телефон</h5>
            <p>
              <a href="tel:+380966865677" className="text-decoration-none">
                +38 (096) 686-56-77
              </a>
            </p>
          </div>

          {/* Адрес (если нужен) */}
          <div className="col-md-4 text-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="mb-3 text-danger" />
            <h5>Офис</h5>
            <p>Кривой Рог, ул. Героев АТО, 42</p>
          </div>
        </div>
      </section>
    </div>
  );
}
