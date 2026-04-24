# First run

## 1. Create env file
From project root:

```bash
cp .env.example .env
```

## 2. Ensure PostgreSQL is running
Database from `.env` should exist.
Example:

```bash
createdb crm_logistics
```

## 3. Install dependencies
From `projects/crm-logistics`:

```bash
npm install
```

## 4. Generate Prisma client
```bash
npx prisma generate --schema db/prisma/schema.prisma
```

## 5. Push schema to database
```bash
npx prisma db push --schema db/prisma/schema.prisma
```

## 6. Start backend
```bash
npm run dev --workspace backend
```

## 7. Test endpoints
- `GET http://localhost:3010/health`
- `POST http://localhost:3010/vehicles`
- `POST http://localhost:3010/trips`
- `POST http://localhost:3010/expenses`
- `GET http://localhost:3010/summary`

## Example create vehicle
```bash
curl -X POST http://localhost:3010/vehicles \
  -H 'Content-Type: application/json' \
  -d '{"name":"КамАЗ 162","plate":"162"}'
```
