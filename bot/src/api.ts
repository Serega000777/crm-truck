const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:3010';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getVehicles() {
    return request<{ ok: boolean; items: Array<{ id: string; name: string; plate?: string | null }> }>('/vehicles');
  },
  createVehicle(body: { name: string; plate?: string }) {
    return request<{ ok: boolean; item: { id: string; name: string; plate?: string | null } }>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  createTrip(body: {
    vehicleId: string;
    tripDate: string;
    destination: string;
    amount: number;
    comment?: string;
    moneyStatus: 'PAID' | 'UNPAID';
  }) {
    return request<{ ok: boolean; item: { id: string } }>('/trips', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  createExpense(body: {
    vehicleId: string;
    expenseDate: string;
    category: string;
    amount: number;
    comment?: string;
  }) {
    return request<{ ok: boolean; item: { id: string } }>('/expenses', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  getSummary() {
    return request<{
      ok: boolean;
      item: {
        vehicles: number;
        trips: number;
        revenue: number;
        paid: number;
        unpaid: number;
        expenses: number;
        netProfit: number;
      };
    }>('/summary');
  },
};
