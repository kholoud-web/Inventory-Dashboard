import { memo } from 'react';
import { Truck, Phone, Mail, MapPin, Star, User } from 'lucide-react';

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
    <div className="space-y-6 animate-fade-in px-4">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        role="list"
        aria-label="قائمة الموردين"
      >
        {suppliers.map((sup) => {
          const isActive = sup.status === 'active';

          return (
            <div
              key={sup.id}
              role="listitem"
              className="rounded-2xl p-5 space-y-4 bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:bg-slate-900/90 hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0"
                    style={{
                      background: 'rgba(56,189,248,0.10)',
                      borderColor: 'rgba(56,189,248,0.18)',
                    }}
                  >
                    <Truck size={18} className="text-sky-400" aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="text-slate-100 font-bold text-sm truncate"
                      style={{ fontFamily: 'Cairo, sans-serif' }}
                    >
                      {sup.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                        {sup.category}
                      </span>

                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full border ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                        }`}
                      >
                        {isActive ? 'نشط' : 'غير نشط'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact person */}
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/35 border border-slate-800/60 rounded-xl px-3 py-2">
                <User size={13} className="text-slate-400" aria-hidden="true" />
                <span className="text-slate-400">جهة التواصل:</span>
                <span className="text-slate-200 font-medium">{sup.contact}</span>
              </div>

              {/* Info */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone size={13} aria-hidden="true" className="text-slate-500" />
                  <span dir="ltr" className="text-slate-300">{sup.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 min-w-0">
                  <Mail size={13} aria-hidden="true" className="text-slate-500 shrink-0" />
                  <span className="text-slate-300 truncate">{sup.email}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin size={13} aria-hidden="true" className="text-slate-500" />
                  <span className="text-slate-300">{sup.city}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/70 text-xs gap-3">
                <div className="flex items-center gap-1.5">
                  <Star size={13} className="text-amber-400" fill="#fbbf24" aria-hidden="true" />
                  <span className="text-white font-semibold">{sup.rating}</span>
                </div>

                <span className="text-white">{sup.orders} طلب</span>

                <button className="text-sky-400 hover:text-sky-300 transition-colors font-medium">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

Suppliers.displayName = 'Suppliers';
export default Suppliers;