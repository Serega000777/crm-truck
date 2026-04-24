# Bot v1

## First commands
- `/start`
- `/vehicles`
- `/addvehicle Название | Номер`
- `/summary`

## Free text scenario
Bot already supports first natural phrase pattern:

```text
добавь ходку сегодня в Урожайное за 8000 машина КамАЗ 162
```

## Current limitation
For trip creation the vehicle must already exist in the system.

## First test flow
1. Start backend
2. Start bot
3. Send `/addvehicle КамАЗ 162 | 162`
4. Send `добавь ходку сегодня в Урожайное за 8000 машина КамАЗ 162`
5. Send `/summary`

## Next bot steps
- add `/addexpense`
- add trip edit flow
- add paid/unpaid toggle
- add filtering by vehicle
- add period reports
