# Architecture v1

## Product flow
1. Пользователь добавляет поездки и расходы через Telegram-бота
2. Бот валидирует и отправляет данные в backend
3. Backend сохраняет записи в PostgreSQL
4. Backend считает агрегаты для главной и аналитики
5. В будущем те же данные использует Mini App

## Main modules

### backend
Отвечает за:
- CRUD по машинам
- CRUD по поездкам
- CRUD по расходам
- расчёт выручки
- расчёт денег отдано / не отдано
- расчёт чистой прибыли
- аналитические выборки

### bot
Отвечает за:
- приём команд и свободного текста
- пошаговые сценарии добавления записи
- быстрые запросы сводки
- вызов backend API

### db
Отвечает за:
- таблицы
- миграции
- связи
- индексы

### frontend
Отложенный модуль под Telegram Mini App.

## Core entities
- users
- vehicles
- trips
- expenses
- expense_categories
- trip_payments

## Business rules
- поездка относится к одной машине
- расход относится к одной машине и дате
- деньги по поездке могут быть отданы или не отданы
- неотданные деньги не входят в доступный баланс
- аналитика агрегируется по машине и периоду

## Suggested repository structure
- `backend/src/modules`
- `backend/src/lib`
- `backend/src/routes`
- `bot/src`
- `db/prisma`
- `shared/src`
