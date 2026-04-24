export interface ParsedTripCommand {
  destination: string;
  amount: number;
  vehicleName: string;
  moneyStatus: 'PAID' | 'UNPAID';
  tripDate: string;
}

export function parseTripText(text: string): ParsedTripCommand | null {
  const normalized = text.trim();
  const match = normalized.match(/добавь\s+ходк[ауи]?\s+(?:сегодня\s+)?в\s+(.+?)\s+за\s+(\d+)\s+машина\s+(.+)/i);

  if (!match) {
    return null;
  }

  return {
    destination: match[1].trim(),
    amount: Number(match[2]),
    vehicleName: match[3].trim(),
    moneyStatus: 'UNPAID',
    tripDate: new Date().toISOString().slice(0, 10),
  };
}
