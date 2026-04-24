import { Router } from 'express';
import { asyncHandler } from '../lib/http.js';
import { tripSchema } from '../lib/validation.js';
import { tripsService } from '../modules/trips/service.js';

export const tripsRouter = Router();

tripsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const items = await tripsService.list();
    res.json({ ok: true, items });
  }),
);

tripsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const input = tripSchema.parse(req.body);
    const trip = await tripsService.create(input);
    res.status(201).json({ ok: true, item: trip });
  }),
);
