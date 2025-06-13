import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { axiosLogin } from "api/userAuth";
import { userGet } from "api/userGet";
import { walletGet } from "api/walletGet";

type LogFormProps = {
  onClose: () => void;
};

type FormValues = {
  login: string;
  password: string;
};

export const LogForm: React.FC<LogFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    await axiosLogin({ email: data.login, password: data.password }, dispatch);
    userGet(dispatch);
    walletGet(dispatch);
    onClose();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Авторизация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${errors.login ? "is-invalid" : ""}`}
              placeholder="Введите email"
              {...register("login", { required: "Логин обязателен" })}
            />
            {errors.login && <div className="invalid-feedback">{errors.login.message}</div>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Введите пароль"
              value="1111"
              {...register("password", { required: "Пароль обязателен" })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary" disabled={!isValid}>
              Ок
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
