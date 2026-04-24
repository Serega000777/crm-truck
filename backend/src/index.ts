import express from 'express';
import { errorHandler } from './lib/errors.js';
import { expensesRouter } from './routes/expenses.js';
import { summaryRouter } from './routes/summary.js';
import { tripsRouter } from './routes/trips.js';
import { vehiclesRouter } from './routes/vehicles.js';

const app = express();
const port = Number(process.env.PORT ?? 3010);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'crm-logistics-backend' });
});

app.use('/vehicles', vehiclesRouter);
app.use('/trips', tripsRouter);
app.use('/expenses', expensesRouter);
app.use('/summary', summaryRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`crm-logistics backend listening on :${port}`);
});
