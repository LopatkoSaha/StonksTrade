import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { axiosRegistration } from "api/userAuth";

type LogFormProps = {
  onClose: () => void;
};

type FormData = {
  name: string;
  email: string;
  password: string;
};

export const RegForm: React.FC<LogFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onBlur" });

  const onSubmit = (data: FormData) => {
    axiosRegistration(data, dispatch);
    onClose();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center mb-4">Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Имя */}
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Введите имя"
              {...register("name", { required: "Имя обязательно" })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Введите email"
              {...register("email", {
                required: "Email обязателен",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Некорректный email",
                },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Пароль */}
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Введите пароль"
              {...register("password", {
                required: "Пароль обязателен",
                minLength: {
                  value: 4,
                  message: "Минимум 4 символа",
                },
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          {/* Кнопки */}
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
