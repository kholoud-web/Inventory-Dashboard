import { memo } from 'react';
import { Truck, Phone, Mail, MapPin, Star } from 'lucide-react';

const suppliers = [
  { id: '1', name: 'شركة ديل', category: 'إلكترونيات', contact: 'سامي العمري', phone: '+966 11 234 5678', email: 'info@dell.sa', city: 'الرياض', rating: 4.8, orders: 24, status: 'active' },
  { id: '2', name: 'HP العربية', category: 'إلكترونيات', contact: 'نورة الحربي', phone: '+966 12 345 6789', email: 'info@hp.sa', city: 'جدة', rating: 4.5, orders: 18, status: 'active' },
  { id: '3', name: 'مصنع النسيج', category: 'ملابس', contact: 'محمد القحطاني', phone: '+966 13 456 7890', email: 'info@nasij.sa', city: 'الدمام', rating: 4.2, orders: 31, status: 'active' },
  { id: '4', name: 'مزرعة الخير', category: 'مواد غذائية', contact: 'فهد الشمري', phone: '+966 16 567 8901', email: 'info@alkhair.sa', city: 'القصيم', rating: 4.7, orders: 45, status: 'active' },
  { id: '5', name: 'أدوات الخليج', category: 'أدوات', contact: 'علي الغامدي', phone: '+966 17 678 9012', email: 'info@khalij.sa', city: 'الأحساء', rating: 4.3, orders: 12, status: 'inactive' },
  { id: '6', name: 'أثاث الديار', category: 'أثاث', contact: 'ريم السلمي', phone: '+966 11 789 0123', email: 'info@aldiyar.sa', city: 'الرياض', rating: 4.6, orders: 9, status: 'active' },
];

const Suppliers = memo(() => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="قائمة الموردين">
        {suppliers.map(sup => (
          <div key={sup.id} role="listitem"
            className="glass-card glass-card-hover rounded-2xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(74,222,128,0.15)' }}>
                  <Truck size={18} className="text-green-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    {sup.name}
                  </h3>
                  <span className="text-xs badge-info px-2 py-0.5 rounded-full">{sup.category}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${sup.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                {sup.status === 'active' ? 'نشط' : 'غير نشط'}
              </span>
            </div>

            <div className="space-y-2 text-xs text-green-300/70">
              <div className="flex items-center gap-2">
                <Phone size={12} aria-hidden="true" className="text-green-400/50" />
                <span dir="ltr">{sup.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} aria-hidden="true" className="text-green-400/50" />
                <span>{sup.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} aria-hidden="true" className="text-green-400/50" />
                <span>{sup.city}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-green-900/20 text-xs">
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400" fill="#fbbf24" aria-hidden="true" />
                <span className="text-green-200 font-medium">{sup.rating}</span>
              </div>
              <span className="text-green-400/50">{sup.orders} طلب</span>
              <button className="text-green-400 hover:text-green-300 transition-colors font-medium">
                عرض التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Suppliers.displayName = 'Suppliers';
export default Suppliers;