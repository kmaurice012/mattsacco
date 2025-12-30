// Core types for MataSacco Manager

export interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  route: string;
  status: 'active' | 'maintenance' | 'grounded';
  ownerId: string;
  ownerName: string;
  saccoId: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'driver' | 'conductor' | 'mechanic' | 'admin';
  phone: string;
  nationalId: string;
  assignedVehicle?: string;
  status: 'active' | 'inactive';
  hireDate: string;
}

export interface FareCollection {
  id: string;
  vehicleId: string;
  conductorId: string;
  date: string;
  route: string;
  totalCollected: number;
  mpesaAmount: number;
  cashAmount: number;
  trips: number;
  startTime: string;
  endTime?: string;
}

export interface Remittance {
  id: string;
  vehicleId: string;
  conductorId: string;
  date: string;
  totalCollected: number;
  saccoShare: number;
  ownerShare: number;
  fuel: number;
  otherExpenses: number;
  status: 'pending' | 'completed' | 'verified';
  paymentProof?: string;
}

export interface Maintenance {
  id: string;
  vehicleId: string;
  type: 'routine' | 'repair' | 'inspection' | 'emergency';
  description: string;
  cost: number;
  date: string;
  nextServiceDate?: string;
  mechanic?: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  parts?: string[];
}

export interface DailyReport {
  date: string;
  totalCollections: number;
  totalRemittances: number;
  activeVehicles: number;
  totalTrips: number;
  expenses: number;
  netIncome: number;
}

export interface Expense {
  id: string;
  vehicleId?: string;
  category: 'fuel' | 'maintenance' | 'insurance' | 'permits' | 'other';
  amount: number;
  description: string;
  date: string;
  approvedBy?: string;
}
