# API v1

## Health
- `GET /health`

## Vehicles
- `GET /vehicles`
- `POST /vehicles`

### POST /vehicles body
```json
{
  "name": "КамАЗ 162",
  "plate": "А123АА"
}
```

## Trips
- `GET /trips`
- `POST /trips`

### POST /trips body
```json
{
  "vehicleId": "veh_xxx",
  "tripDate": "2026-04-24",
  "destination": "Урожайное",
  "amount": 8000,
  "comment": "",
  "moneyStatus": "UNPAID"
}
```

## Expenses
- `GET /expenses`
- `POST /expenses`

### POST /expenses body
```json
{
  "vehicleId": "veh_xxx",
  "expenseDate": "2026-04-24",
  "category": "fuel",
  "amount": 2500,
  "comment": "дозаправка"
}
```

## Summary
- `GET /summary`

### Summary fields
- vehicles
- trips
- revenue
- paid
- unpaid
- expenses
- netProfit
