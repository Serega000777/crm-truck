import { prisma } from '../../lib/prisma.js';
import type { VehicleInput } from '../../lib/validation.js';

export const vehiclesService = {
  list() {
    return prisma.vehicle.findMany({ orderBy: { createdAt: 'desc' } });
  },
  create(input: VehicleInput) {
    return prisma.vehicle.create({
      data: {
        name: input.name,
        plate: input.plate,
      },
    });
  },
};
