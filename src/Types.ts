export type ItemStatus = 'inStock' | 'lowStock' | 'outOfStock' | 'reorder';
export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'active' | 'resolved';
export type MovementType = 'in' | 'out';

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  unit: string;
  price: number;
  supplier: string;
  location: string;
  lastUpdated: Date;
  status: ItemStatus;
  image?: string;
}

export interface Alert {
  id: string;
  type: 'lowStock' | 'outOfStock' | 'expiry' | 'reorder';
  severity: AlertSeverity;
  status: AlertStatus;
  itemId: string;
  itemName: string;
  message: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  type: MovementType;
  quantity: number;
  date: Date;
  reason: string;
  operator: string;
}

export interface DashboardStats {
  totalItems: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  inStockCount: number;
  totalMovementsToday: number;
}

export interface CategoryStat {
  name: string;
  count: number;
  value: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  incoming: number;
  outgoing: number;
  value: number;
}

export type NavPage = 'dashboard' | 'inventory' | 'reports' | 'alerts' | 'suppliers' | 'settings';                                           