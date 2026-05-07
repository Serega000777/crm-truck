import { getTelegramInitData } from './tma';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export interface VehicleDto {
  id: string;
  name: string;
  plate?: string | null;
  imageUrl?: string | null;
  isActive?: boolean;
}

export interface SummaryDto {
  vehicles: number;
  trips: number;
  revenue: number;
  paid: number;
  unpaid: number;
  expenses: number;
  netProfit: number;
}

export interface AnalyticsDto {
  period: string;
  vehicleId: string | null;
  from: string;
  to: string;
  vehicles: number;
  trips: number;
  revenue: number;
  paid: number;
  unpaid: number;
  expenses: number;
  netProfit: number;
  balance: number;
  plan: number;
  vehicleSections?: Array<{
    vehicle: string | null;
    trips: number;
    revenue: number;
    paid: number;
    unpaid: number;
  }>;
  expenseItems: Array<{
    date: string;
    vehicle: string | null;
    category: string;
    amount: number;
  }>;
}

export interface TripDto {
  id: string;
  tripDate: string;
  destination: string;
  amount: number;
  distanceKm?: number | null;
  comment?: string | null;
  moneyStatus: 'PAID' | 'UNPAID';
  vehicle: VehicleDto | null;
}

export interface ExpenseDto {
  id: string;
  expenseDate: string;
  category: string;
  amount: number;
  comment?: string | null;
  isDefault?: boolean;
  vehicle: VehicleDto | null;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const telegramInitData = getTelegramInitData();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(telegramInitData ? { Authorization: `tma ${telegramInitData}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getVehicles() {
    return request<{ ok: true; items: VehicleDto[] }>('/vehicles');
  },
  createVehicle(body: { name: string; plate?: string; imageUrl?: string }) {
    return request<{ ok: true; item: VehicleDto }>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  updateVehicle(id: string, body: { name?: string; plate?: string; imageUrl?: string; isActive?: boolean }) {
    return request<{ ok: true; item: VehicleDto }>(`/vehicles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },
  deleteVehicle(id: string) {
    return request<{ ok: true; item: { id: string } }>(`/vehicles/${id}`, {
      method: 'DELETE',
    });
  },
  uploadVehicleImage(body: { fileName: string; mimeType: string; base64: string }) {
    return request<{ ok: true; item: { imageUrl: string } }>('/vehicles/upload-image', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  getTrips() {
    return request<{ ok: true; items: TripDto[] }>('/trips');
  },
  createTrip(body: {
    vehicleId: string;
    tripDate: string;
    destination: string;
    amount: number;
    distanceKm?: number;
    comment?: string;
    moneyStatus: 'PAID' | 'UNPAID';
  }) {
    return request<{ ok: true; item: TripDto }>('/trips', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  updateTrip(id: string, body: {
    tripDate?: string;
    destination?: string;
    amount?: number;
    distanceKm?: number;
    comment?: string;
    moneyStatus?: 'PAID' | 'UNPAID';
  }) {
    return request<{ ok: true; item: TripDto }>(`/trips/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },
  getExpenses() {
    return request<{ ok: true; items: ExpenseDto[] }>('/expenses');
  },
  createExpense(body: {
    vehicleId: string;
    expenseDate: string;
    category: string;
    amount: number;
    comment?: string;
    isDefault?: boolean;
  }) {
    return request<{ ok: true; item: ExpenseDto }>('/expenses', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  updateExpense(id: string, body: {
    expenseDate?: string;
    category?: string;
    amount?: number;
    comment?: string;
  }) {
    return request<{ ok: true; item: ExpenseDto }>(`/expenses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },
  getSummary() {
    return request<{ ok: true; item: SummaryDto }>('/summary');
  },
  getMe() {
    return request<{ ok: true; item: { telegramUser: { id: number; username?: string; firstName?: string; lastName?: string } } }>('/auth/me');
  },
  getCurrentUser() {
    return request<{ ok: true; item: { id: string; telegramId: string; name: string; role: 'DRIVER' | 'MANAGER' | 'CEO' } }>('/users/me');
  },
  updateCurrentUserRole(body: { role: 'DRIVER' | 'MANAGER' | 'CEO' }) {
    return request<{ ok: true; item: { id: string; telegramId: string; name: string; role: 'DRIVER' | 'MANAGER' | 'CEO' } }>('/users/me/role', {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },
  savePlan(body: {
    period: 'day' | 'week' | 'month' | 'halfyear' | 'year' | 'custom';
    fromDate: string;
    toDate: string;
    amount: number;
    vehicleId?: string;
  }) {
    return request<{ ok: true; item: { id: string } }>('/plans', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  getAnalytics(params: {
    period: 'day' | 'week' | 'month' | 'halfyear' | 'year' | 'custom';
    vehicleId?: string;
    from?: string;
    to?: string;
  }) {
    const search = new URLSearchParams();
    search.set('period', params.period);
    if (params.vehicleId) search.set('vehicleId', params.vehicleId);
    if (params.from) search.set('from', params.from);
    if (params.to) search.set('to', params.to);
    return request<{ ok: true; item: AnalyticsDto }>(`/summary/analytics?${search.toString()}`);
  },
};
