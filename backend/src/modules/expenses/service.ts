import { prisma } from '../../lib/prisma.js';
import type { ExpenseInput } from '../../lib/validation.js';

export const expensesService = {
  list() {
    return prisma.expense.findMany({
      orderBy: { expenseDate: 'desc' },
      include: { vehicle: true },
    });
  },
  create(input: ExpenseInput) {
    return prisma.expense.create({
      data: {
        vehicleId: input.vehicleId,
        expenseDate: new Date(input.expenseDate),
        category: input.category,
        amount: input.amount,
        comment: input.comment,
      },
      include: { vehicle: true },
    });
  },
};
