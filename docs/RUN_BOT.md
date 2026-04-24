# Run bot

## 1. Fill env
In `.env` set:
- `TELEGRAM_BOT_TOKEN`
- `API_BASE_URL`

## 2. Start backend
```bash
npm run dev --workspace backend
```

## 3. Start bot
```bash
npm run dev:bot
```

## 4. First checks
- `/start`
- `/addvehicle КамАЗ 162 | 162`
- `/vehicles`
- `добавь ходку сегодня в Урожайное за 8000 машина КамАЗ 162`
- `/summary`
