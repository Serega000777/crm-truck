import { Router } from 'express';
import { asyncHandler } from '../lib/http.js';
import { expenseSchema } from '../lib/validation.js';
import { expensesService } from '../modules/expenses/service.js';

export const expensesRouter = Router();

expensesRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const items = await expensesService.list();
    res.json({ ok: true, items });
  }),
);

expensesRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const input = expenseSchema.parse(req.body);
    const expense = await expensesService.create(input);
    res.status(201).json({ ok: true, item: expense });
  }),
);
