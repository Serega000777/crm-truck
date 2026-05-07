import type { AnalyticsDto, ExpenseDto, TripDto, VehicleDto } from './api';
import type React from 'react';

export type TabKey = 'home' | 'trips' | 'analytics' | 'settings' | 'fleet';
export type PeriodKey = 'day' | 'week' | 'month' | 'halfyear' | 'year' | 'custom';
export type ThemeMode = 'dark' | 'light';
export type UiScale = 'compact' | 'normal' | 'large';

export interface VehicleCard {
  id: string;
  name: string;
  revenueMonth: number;
  tripsMonth: number;
  paidMonth: number;
  unpaidMonth: number;
  plate?: string | null;
  imageUrl?: string | null;
  isActive?: boolean;
}

export type VehicleFormState = {
  name: string;
  plate: string;
};

export type TripFormState = {
  tripDate: string;
  destination: string;
  amount: string;
  distanceKm: string;
  comment: string;
  moneyStatus: 'PAID' | 'UNPAID';
};

export type ExpenseFormState = {
  expenseDate: string;
  category: string;
  amount: string;
  comment: string;
  defaultAmounts: Record<string, string>;
};

export type HomeScreenProps = {
  vehicleForm: VehicleFormState;
  setVehicleForm: React.Dispatch<React.SetStateAction<VehicleFormState>>;
  vehicleCards: VehicleCard[];
  selectedVehicleId: string;
  selectedVehicle?: VehicleCard;
  selectedVehicleTripsCount: number;
  selectedVehicleExpensesTotal: number;
  selectedVehicleLastTripDate?: string;
  editingVehicleId: string | null;
  totalRevenue: number;
  revenuePeriod: 'day' | 'month' | 'all';
  totalTrips: number;
  showVehicleForm: boolean;
  showTripsModal: boolean;
  showVehicleInfoModal: boolean;
  showVehicleStatusBadge: boolean;
  selectedVehicleTrips: TripDto[];
  selectedVehicleExpenseItems: ExpenseDto[];
  selectedVehicleDistanceKm: number;
  onToggleVehicleForm: () => void;
  onChangeRevenuePeriod: (period: 'day' | 'month' | 'all') => void;
  onToggleRevenueMenu: () => void;
  showRevenueMenu: boolean;
  onSelectVehicle: (vehicleId: string) => void;
  onOpenTrips: () => void;
  onOpenTripsModal: () => void;
  onCloseTripsModal: () => void;
  onOpenVehicleInfoModal: () => void;
  onCloseVehicleInfoModal: () => void;
  onSubmitVehicle: () => void;
  onEditVehicle: () => void;
  onToggleVehicleActive: () => void;
  onToggleTripMoneyStatus: (trip: TripDto) => void;
};

export type TripsScreenProps = {
  selectedVehicle?: VehicleCard;
  vehicles: VehicleDto[];
  selectedVehicleId: string;
  errorMessage?: string;
  selectedDate: string;
  tripForm: TripFormState;
  expenseForm: ExpenseFormState;
  filteredTrips: TripDto[];
  selectedVehicleTrips: TripDto[];
  filteredExpenses: ExpenseDto[];
  editingTripId: string | null;
  editingExpenseId: string | null;
  setSelectedVehicleId: (value: string) => void;
  setSelectedDate: (value: string) => void;
  setTripForm: React.Dispatch<React.SetStateAction<TripFormState>>;
  setExpenseForm: React.Dispatch<React.SetStateAction<ExpenseFormState>>;
  defaultExpenseCategories: string[];
  onSubmitTrip: () => void;
  onEditTrip: (trip: TripDto) => void;
  onToggleTripMoneyStatus: (trip: TripDto) => void;
  onSubmitExpense: () => void;
  onEditExpense: (expense: ExpenseDto) => void;
};

export type AnalyticsScreenProps = {
  vehicles: VehicleDto[];
  selectedVehicleId: string;
  analyticsPeriod: PeriodKey;
  analyticsFrom: string;
  analyticsTo: string;
  planAmount: string;
  analytics: AnalyticsDto;
  setSelectedVehicleId: (value: string) => void;
  setAnalyticsPeriod: (value: PeriodKey) => void;
  setAnalyticsFrom: (value: string) => void;
  setAnalyticsTo: (value: string) => void;
  setPlanAmount: (value: string) => void;
  onSavePlan: () => void;
};

export type SettingsScreenProps = {
  telegramUserLabel: string;
  currentRole: 'DRIVER' | 'MANAGER' | 'CEO';
  themeMode: ThemeMode;
  uiScale: UiScale;
  selectedVehicleName?: string;
  showVehicleStatusBadge: boolean;
  vehicles: VehicleDto[];
  deletedVehicles: VehicleDto[];
  setCurrentRole: (value: 'DRIVER' | 'MANAGER' | 'CEO') => void;
  setThemeMode: (value: ThemeMode) => void;
  setUiScale: (value: UiScale) => void;
  onToggleVehicleStatusBadge: () => void;
  onOpenFleet: () => void;
  onRestoreVehicle: (vehicleId: string) => void;
  onDeleteVehicleForever: (vehicleId: string) => void;
  onEditVehicle: (vehicleId: string) => void;
  onToggleVehicleActive: (vehicleId: string) => void;
  onUploadVehiclePhoto: (vehicleId: string, file: File) => void;
  onSaveRole: () => void;
  onExitApp: () => void;
};
