import { useState } from "react";
import { telegramQRGet } from "api/telegramQRGet";

export const Telegram = () => {
  const [qr, setQr] = useState("");

  return (
    <div className="container py-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-header text-center fs-4 fw-bold">
          Взаимодействие с Telegram
        </div>
        <div className="card-body d-flex flex-column align-items-center gap-3">
          {qr ? (
            <img
              src={qr}
              alt="QRcode"
              className="img-fluid"
              style={{ maxWidth: "300px" }}
            />
          ) : (
            <div className="text-muted text-center">
              Нажмите кнопку, чтобы сгенерировать QR-код
            </div>
          )}
          <button
            className="btn btn-primary w-100"
            onClick={() => telegramQRGet().then((data) => setQr(data))}
          >
            {qr ? "Обновить QR-код" : "Сгенерировать QR-код"}
          </button>
        </div>
      </div>
    </div>
  );
};
