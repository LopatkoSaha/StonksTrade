# 📘 Документация проекта Stonks Trade

## 🔧 1. Общая информация о проекте

# React + TypeScript + Bootstrap + Font Awesome Template

**Stonks Trade** — это веб-приложение для отслеживания, управления и обмена вымышленной криптовалютой. Проект включает как пользовательскую часть, так и административную панель.

### ✨ Основной функционал:

- **Аутентификация пользователей** (JWT).
- **Отслеживание курсов валют в реальном времени** через WebSocket (`react-use-websocket`).
- **Графики изменений валют** (`@canvasjs/react-charts`).
- **Игровые сервисы**: ставки и умножение средств.
- **Личный кабинет пользователя**:
  - Статус кошелька.
  - Торговля валютами (в т.ч. автоматическая).
  - Менеджмент предзаказов.
  - Интеграция с Telegram через `telegraf` (уведомления).
  - Модель ИИ (`mistlslLlm`) для прогнозирования конъюнктуры рынка.
- **Административная панель**:
  - Управление пользователями (активация/деактивация).
  - Управление кошельками (редактирование балансов).
  - Настройка параметров игровых сервисов.

📍 Демо: [`https://LopatkoSaha.github.io/StonksTrade/`](https://LopatkoSaha.github.io/StonksTrade/)

---

## ⚙️ 2. Технологии и стек

| Технология / Библиотека      | Версия     | Назначение                                                |
|------------------------------|------------|-----------------------------------------------------------|
| React                        | ^19.1.0    | Основной UI-фреймворк                                     |
| TypeScript                   | ~5.8.3     | Статическая типизация                                     |
| Bootstrap                    | ^5.3.6     | Фреймворк для верстки адаптивных дизайнов                 |
| React Router DOM             | ^6.30.1    | Маршрутизация                                             |
| Redux Toolkit                | ^2.8.2     | Глобальное состояние (синхр. и асинхр. логика)            |
| React Redux                  | ^9.2.0     | Интеграция Redux с React                                  |
| React Hook Form              | ^7.57.0    | Обработка и валидация форм                                |
| Axios                        | ^1.9.0     | Работа с HTTP-запросами                                   |
| CanvasJS (React)             | ^1.0.2     | Построение интерактивных графиков                         |
| React Use WebSocket          | ^3.0.0     | WebSocket-подключения                                     |
| React Scripts                | 5.0.1      | CRA-конфигурация                                          |
| React Testing Library / Jest | ^13.4.0+   | Юнит и интеграционные тесты                               |
| Web Vitals                   | ^2.1.4     | Метрики производительности                                |
| @types/*                     | ^*         | Типы для TypeScript                                       |

---

## 🧱 3. Структура проекта

```
src/
├── api/                Работа с backend (axios-запросы)
├── assets/             Шрифты, изображения
├── components/         Переиспользуемые компоненты
| └──  app.tsx          Подключение к Redux и локальному хранилищу
├── elements/           Примитивные UI-элементы
├── features/           Бизнесс-фичи
├── hooks/              Кастомные хуки
├── pages/              Страницы (роуты)
├── store/              Локальное хранилище
├── config/             Конфигурации
├── main.css            Общие стили
├── main.tsx            Главный компонент приложения
└── index.tsx           Точка входа
```

## 🚀 4. Установка и запуск

```
git clone https://github.com/LopatkoSaha/StonksTrade.git
cd StonksTrade
npm install

# Запуск в dev-режиме
npm run dev

# Сборка production-бандла
npm run build
```

## 🧪 5. Тестирование

```
npm run test
```
Используется Jest и @testing-library/react для написания модульных и интеграционных тестов.

## 🧭 6. Навигация и маршруты

| Путь               | Компонент          | Описание                         |
| ------------------ | ------------------ | -------------------------------- |
| `/`                | `MainPage`         | Главная                          |
| `/about`           | `AboutPage`        | О проекте                        |
| `/cabinet`         | `CabinetPage`      | Личный кабинет                   |
| `/market`          | `MarketPage`       | Валютный рынок                   |
| `/chart/:currency` | `ChartPage`        | График выбранной валюты          |
| `/contacts`        | `ContactsPage`     | Обратная связь                   |
| `/games`           | `GamePage`         | Игровая зона                     |
| `/admin/users`     | `AdminUsersPage`   | Панель управления пользователями |
| `/admin/wallets`   | `AdminWalletsPage` | Управление кошельками            |
| `/admin/games`     | `AdminGamesPage`   | Конфигурации игровых сервисов    |

## 🔐 7. Работа с API

Все запросы к backend выполняются через axios. Пример:

```
export const userGet = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get('http://localhost:3500/user/get', {
      withCredentials: true,
    });
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(showMessage({
      msgType: "warning",
      msgText: error.errName,
    }));
  }
}
```

## 🧠 8. Прогнозирование с AI

Интеграция с моделью ИИ (mistlslLlm) позволяет:

* прогнозировать динамику валют;

* снижать риски при трейдинге;

* использовать предиктивные графики в интерфейсе.

## 📄 10. Авторство

* 👨‍💼 Руководитель проекта: [Andrey Lopatko](https://github.com/d00dde)

* 👨‍💻 Основной разработчик: [LopatkoSaha](https://github.com/LopatkoSaha)
