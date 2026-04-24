import { prisma } from '../../lib/prisma.js';

export const summaryService = {
  async getOverview() {
    const [vehiclesCount, trips, expenses] = await Promise.all([
      prisma.vehicle.count(),
      prisma.trip.findMany(),
      prisma.expense.findMany(),
    ]);

    const revenue = trips.reduce((sum, trip) => sum + Number(trip.amount), 0);
    const paid = trips
      .filter((trip) => trip.moneyStatus === 'PAID')
      .reduce((sum, trip) => sum + Number(trip.amount), 0);
    const unpaid = trips
      .filter((trip) => trip.moneyStatus === 'UNPAID')
      .reduce((sum, trip) => sum + Number(trip.amount), 0);
    const expenseTotal = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    const netProfit = paid - expenseTotal;

    return {
      vehicles: vehiclesCount,
      trips: trips.length,
      revenue,
      paid,
      unpaid,
      expenses: expenseTotal,
      netProfit,
    };
  },
};
