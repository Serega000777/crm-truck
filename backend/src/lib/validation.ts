import { z } from 'zod';

export const vehicleSchema = z.object({
  name: z.string().min(1),
  plate: z.string().optional(),
});

export const tripSchema = z.object({
  vehicleId: z.string().min(1),
  tripDate: z.string().min(1),
  destination: z.string().min(1),
  amount: z.number().positive(),
  comment: z.string().optional(),
  moneyStatus: z.enum(['PAID', 'UNPAID']),
});

export const expenseSchema = z.object({
  vehicleId: z.string().min(1),
  expenseDate: z.string().min(1),
  category: z.string().min(1),
  amount: z.number().positive(),
  comment: z.string().optional(),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;
export type TripInput = z.infer<typeof tripSchema>;
export type ExpenseInput = z.infer<typeof expenseSchema>;
