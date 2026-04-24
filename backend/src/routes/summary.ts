import { Router } from 'express';
import { asyncHandler } from '../lib/http.js';
import { summaryService } from '../modules/summary/service.js';

export const summaryRouter = Router();

summaryRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const item = await summaryService.getOverview();
    res.json({ ok: true, item });
  }),
);
