import type{ InventoryItem, Alert, StockMovement, MonthlyData, CategoryStat, DashboardStats } from './Types';
 
export const inventoryData: InventoryItem[] = [
  { id: '1', name: 'لابتوب ديل', sku: 'EL-001', category: 'إلكترونيات', quantity: 45, minQuantity: 10, maxQuantity: 100, unit: 'قطعة', price: 3500, supplier: 'شركة ديل', location: 'A-01', lastUpdated: new Date('2025-04-10'), status: 'inStock' },
  { id: '2', name: 'طابعة HP', sku: 'EL-002', category: 'إلكترونيات', quantity: 8, minQuantity: 10, maxQuantity: 50, unit: 'قطعة', price: 1200, supplier: 'HP العربية', location: 'A-02', lastUpdated: new Date('2025-04-12'), status: 'lowStock' },
  { id: '3', name: 'قميص رجالي', sku: 'CL-001', category: 'ملابس', quantity: 0, minQuantity: 20, maxQuantity: 200, unit: 'قطعة', price: 150, supplier: 'مصنع النسيج', location: 'B-01', lastUpdated: new Date('2025-04-08'), status: 'outOfStock' },
  { id: '4', name: 'أرز بسمتي', sku: 'FD-001', category: 'مواد غذائية', quantity: 500, minQuantity: 100, maxQuantity: 2000, unit: 'كيلوغرام', price: 12, supplier: 'مزرعة الخير', location: 'C-01', lastUpdated: new Date('2025-04-13'), status: 'inStock' },
  { id: '5', name: 'مفك كهربائي', sku: 'TL-001', category: 'أدوات', quantity: 15, minQuantity: 5, maxQuantity: 50, unit: 'قطعة', price: 280, supplier: 'أدوات الخليج', location: 'D-01', lastUpdated: new Date('2025-04-11'), status: 'inStock' },
  { id: '6', name: 'كرسي مكتب', sku: 'FN-001', category: 'أثاث', quantity: 3, minQuantity: 5, maxQuantity: 30, unit: 'قطعة', price: 850, supplier: 'أثاث الديار', location: 'E-01', lastUpdated: new Date('2025-04-09'), status: 'lowStock' },
  { id: '7', name: 'محلول تنظيف', sku: 'CH-001', category: 'مواد كيميائية', quantity: 200, minQuantity: 50, maxQuantity: 500, unit: 'لتر', price: 25, supplier: 'كيماويات النقاء', location: 'F-01', lastUpdated: new Date('2025-04-14'), status: 'inStock' },
  { id: '8', name: 'قفازات طبية', sku: 'MD-001', category: 'مستلزمات طبية', quantity: 1200, minQuantity: 500, maxQuantity: 5000, unit: 'قطعة', price: 3, supplier: 'ميد سبلاي', location: 'G-01', lastUpdated: new Date('2025-04-14'), status: 'inStock' },
  { id: '9', name: 'شاشة سامسونج', sku: 'EL-003', category: 'إلكترونيات', quantity: 22, minQuantity: 8, maxQuantity: 60, unit: 'قطعة', price: 1800, supplier: 'سامسونج الشرق', location: 'A-03', lastUpdated: new Date('2025-04-13'), status: 'inStock' },
  { id: '10', name: 'جينز نسائي', sku: 'CL-002', category: 'ملابس', quantity: 12, minQuantity: 15, maxQuantity: 150, unit: 'قطعة', price: 200, supplier: 'مصنع النسيج', location: 'B-02', lastUpdated: new Date('2025-04-10'), status: 'lowStock' },
  { id: '11', name: 'زيت زيتون', sku: 'FD-002', category: 'مواد غذائية', quantity: 180, minQuantity: 50, maxQuantity: 500, unit: 'لتر', price: 45, supplier: 'مزرعة الخير', location: 'C-02', lastUpdated: new Date('2025-04-12'), status: 'inStock' },
  { id: '12', name: 'كماشة احترافية', sku: 'TL-002', category: 'أدوات', quantity: 0, minQuantity: 10, maxQuantity: 40, unit: 'قطعة', price: 120, supplier: 'أدوات الخليج', location: 'D-02', lastUpdated: new Date('2025-04-07'), status: 'outOfStock' },
];

export const alertsData: Alert[] = [
  { id: 'a1', type: 'outOfStock', severity: 'critical', status: 'active', itemId: '3', itemName: 'قميص رجالي', message: 'نفد المخزون بالكامل - يحتاج إعادة طلب فوري', createdAt: new Date('2025-04-13'), },
  { id: 'a2', type: 'outOfStock', severity: 'critical', status: 'active', itemId: '12', itemName: 'كماشة احترافية', message: 'نفد المخزون - آخر قطعة بيعت منذ 7 أيام', createdAt: new Date('2025-04-08'), },
  { id: 'a3', type: 'lowStock', severity: 'warning', status: 'active', itemId: '2', itemName: 'طابعة HP', message: 'المخزون (8) أقل من الحد الأدنى (10)', createdAt: new Date('2025-04-12'), },
  { id: 'a4', type: 'lowStock', severity: 'warning', status: 'active', itemId: '6', itemName: 'كرسي مكتب', message: 'المخزون (3) أقل من الحد الأدنى (5)', createdAt: new Date('2025-04-09'), },
  { id: 'a5', type: 'lowStock', severity: 'warning', status: 'active', itemId: '10', itemName: 'جينز نسائي', message: 'المخزون (12) أقل من الحد الأدنى (15)', createdAt: new Date('2025-04-10'), },
  { id: 'a6', type: 'reorder', severity: 'info', status: 'active', itemId: '4', itemName: 'أرز بسمتي', message: 'يُنصح بإعادة الطلب قريباً للحفاظ على المستويات المثلى', createdAt: new Date('2025-04-14'), },
  { id: 'a7', type: 'expiry', severity: 'warning', status: 'resolved', itemId: '7', itemName: 'محلول تنظيف', message: 'دفعة منتهية الصلاحية تمت إزالتها', createdAt: new Date('2025-04-05'), resolvedAt: new Date('2025-04-06') },
];

export const movementsData: StockMovement[] = [
  { id: 'm1', itemId: '4', itemName: 'أرز بسمتي', type: 'in', quantity: 200, date: new Date('2025-04-14'), reason: 'استلام طلبية', operator: 'أحمد خالد' },
  { id: 'm2', itemId: '1', itemName: 'لابتوب ديل', type: 'out', quantity: 5, date: new Date('2025-04-14'), reason: 'بيع', operator: 'فاطمة علي' },
  { id: 'm3', itemId: '8', itemName: 'قفازات طبية', type: 'in', quantity: 500, date: new Date('2025-04-13'), reason: 'استلام طلبية', operator: 'محمد سالم' },
  { id: 'm4', itemId: '9', itemName: 'شاشة سامسونج', type: 'out', quantity: 3, date: new Date('2025-04-13'), reason: 'تحويل داخلي', operator: 'سارة أحمد' },
  { id: 'm5', itemId: '11', itemName: 'زيت زيتون', type: 'out', quantity: 20, date: new Date('2025-04-12'), reason: 'بيع', operator: 'عمر يوسف' },
  { id: 'm6', itemId: '5', itemName: 'مفك كهربائي', type: 'in', quantity: 10, date: new Date('2025-04-12'), reason: 'استلام طلبية', operator: 'أحمد خالد' },
];

export const monthlyData: MonthlyData[] = [
  { month: 'أكتوبر', incoming: 420, outgoing: 380, value: 85000 },
  { month: 'نوفمبر', incoming: 380, outgoing: 410, value: 92000 },
  { month: 'ديسمبر', incoming: 550, outgoing: 490, value: 110000 },
  { month: 'يناير', incoming: 460, outgoing: 420, value: 95000 },
  { month: 'فبراير', incoming: 390, outgoing: 350, value: 78000 },
  { month: 'مارس', incoming: 480, outgoing: 460, value: 105000 },
  { month: 'أبريل', incoming: 320, outgoing: 280, value: 71000 },
];

export const categoryStats: CategoryStat[] = [
  { name: 'إلكترونيات', count: 75, value: 142500, color: '#4ade80' },
  { name: 'مواد غذائية', count: 680, value: 27600, color: '#34d399' },
  { name: 'مستلزمات طبية', count: 1200, value: 3600, color: '#6ee7b7' },
  { name: 'ملابس', count: 12, value: 4200, color: '#a7f3d0' },
  { name: 'أدوات', count: 15, value: 5400, color: '#d1fae5' },
  { name: 'أثاث', count: 3, value: 2550, color: '#ecfdf5' },
];

export const dashboardStats: DashboardStats = {
  totalItems: 1985,
  totalValue: 267850,
  lowStockCount: 3,
  outOfStockCount: 2,
  inStockCount: 7,
  totalMovementsToday: 8,
};