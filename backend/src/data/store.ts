import type { ExpenseInput, TripInput, VehicleInput } from '../lib/validation.js';

export interface VehicleRecord extends VehicleInput {
  id: string;
  createdAt: string;
}

export interface TripRecord extends TripInput {
  id: string;
  createdAt: string;
}

export interface ExpenseRecord extends ExpenseInput {
  id: string;
  createdAt: string;
}

const vehicles: VehicleRecord[] = [];
const trips: TripRecord[] = [];
const expenses: ExpenseRecord[] = [];

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const store = {
  listVehicles: () => vehicles,
  createVehicle(input: VehicleInput) {
    const record: VehicleRecord = {
      id: createId('veh'),
      createdAt: new Date().toISOString(),
      ...input,
    };
    vehicles.push(record);
    return record;
  },
  listTrips: () => trips,
  createTrip(input: TripInput) {
    const record: TripRecord = {
      id: createId('trip'),
      createdAt: new Date().toISOString(),
      ...input,
    };
    trips.push(record);
    return record;
  },
  listExpenses: () => expenses,
  createExpense(input: ExpenseInput) {
    const record: ExpenseRecord = {
      id: createId('exp'),
      createdAt: new Date().toISOString(),
      ...input,
    };
    expenses.push(record);
    return record;
  },
};
