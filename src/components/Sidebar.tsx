import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard, Package, BarChart3, Bell, Truck, Settings, Warehouse, X
} from 'lucide-react';
import type{ NavPage } from '../Types';
import { alertsData } from '../Data';

interface SidebarProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { key: 'dashboard' as NavPage, icon: LayoutDashboard },
  { key: 'inventory' as NavPage, icon: Package },
  { key: 'reports' as NavPage, icon: BarChart3 },
  { key: 'alerts' as NavPage, icon: Bell },
  { key: 'suppliers' as NavPage, icon: Truck },
  { key: 'settings' as NavPage, icon: Settings },
];

const Sidebar = memo(({ activePage, onNavigate, isOpen, onClose }: SidebarProps) => {
  const { t } = useTranslation();
  const activeAlerts = alertsData.filter(a => a.status === 'active').length;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

    {/* Sidebar */}
<aside
  role="navigation"
  aria-label={t('nav.dashboard')}
  className={`
    fixed right-0 top-0 h-full w-72 z-50 flex flex-col
    bg-slate-950/80 backdrop-blur-xl border-l border-white/10
    transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
  `}
>
  {/* Logo Section */}
  <div className="flex items-center justify-between p-6 border-b border-white/5">
    <div className="flex items-center gap-3">
      <div 
        className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20"
        style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
      >
        <Warehouse size={22} className="text-white" />
      </div>
      <div>
        <h1 className="text-white font-bold text-lg leading-tight tracking-tight" style={{ fontFamily: 'Cairo, sans-serif' }}>
          {t('Inventory')}
        </h1>
        <p className="text-xs text-emerald-400/70 font-medium">{t('appTagline')}</p>
      </div>
    </div>
    
    <button
      onClick={onClose}
      className="lg:hidden text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
      aria-label={t('common.close')}
    >
      <X size={20} />
    </button>
  </div>

  {/* Navigation Items */}
  <nav className="flex-1 p-4 space-y-1.5" role="menubar">
    {navItems.map(({ key, icon: Icon }) => {
      const isActive = activePage === key;
      return (
        <button
          key={key}
          role="menuitem"
          onClick={() => { onNavigate(key); onClose(); }}
          aria-current={isActive ? 'page' : undefined}
          className={`
            w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium
            transition-all duration-200 relative text-right group cursor-pointer
            ${isActive
              ? 'text-white shadow-sm'
              : 'text-slate-400 hover:text-emerald-50 hover:bg-white/5'
            }
          `}
          style={isActive ? {
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.05))',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          } : {
            border: '1px solid transparent'
          }}
        >
          {/* Active Indicator Glow */}
          {isActive && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          )}
          
          <Icon 
            size={20} 
            className={`transition-colors ${isActive ? 'text-emerald-400' : 'group-hover:text-emerald-400'}`} 
          />
          
          <span className="flex-1">{t(`${key}`)}</span>

          {key === 'alerts' && activeAlerts > 0 && (
            <span className="mr-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-4 ring-slate-950/20">
              {activeAlerts}
            </span>
          )}
        </button>
      );
    })}
  </nav>

  {/* Bottom Info Section */}
  <div className="p-4 mt-auto border-t border-white/5">
    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 transition-all hover:bg-white/10">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">آخر مزامنة</p>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <p className="text-xs text-emerald-400 font-semibold mt-0.5">منذ 5 دقائق</p>
    </div>
  </div>
</aside>
    </>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;