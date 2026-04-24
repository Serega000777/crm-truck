export type MoneyStatus = 'paid' | 'unpaid';

export interface TripInput {
  vehicleId: string;
  tripDate: string;
  destination: string;
  amount: number;
  comment?: string;
  moneyStatus: MoneyStatus;
}

export interface ExpenseInput {
  vehicleId: string;
  expenseDate: string;
  category: string;
  amount: number;
  comment?: string;
}
