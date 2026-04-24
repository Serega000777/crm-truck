import { prisma } from '../../lib/prisma.js';
import type { TripInput } from '../../lib/validation.js';

export const tripsService = {
  list() {
    return prisma.trip.findMany({
      orderBy: { tripDate: 'desc' },
      include: { vehicle: true },
    });
  },
  create(input: TripInput) {
    return prisma.trip.create({
      data: {
        vehicleId: input.vehicleId,
        tripDate: new Date(input.tripDate),
        destination: input.destination,
        amount: input.amount,
        comment: input.comment,
        moneyStatus: input.moneyStatus,
      },
      include: { vehicle: true },
    });
  },
};
