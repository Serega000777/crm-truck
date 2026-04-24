import { Router } from 'express';
import { asyncHandler } from '../lib/http.js';
import { vehicleSchema } from '../lib/validation.js';
import { vehiclesService } from '../modules/vehicles/service.js';

export const vehiclesRouter = Router();

vehiclesRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const items = await vehiclesService.list();
    res.json({ ok: true, items });
  }),
);

vehiclesRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const input = vehicleSchema.parse(req.body);
    const vehicle = await vehiclesService.create(input);
    res.status(201).json({ ok: true, item: vehicle });
  }),
);
