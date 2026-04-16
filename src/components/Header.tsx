import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Bell, User } from 'lucide-react';
import type{ NavPage } from '../Types';
import { alertsData  } from '../Data';

interface HeaderProps {
  activePage: NavPage;
  onMenuToggle: () => void;

}

const Header = memo(({ activePage, onMenuToggle }: HeaderProps) => {
  const { t } = useTranslation();
  const activeAlerts = alertsData.filter(a => a.status === 'active').length;


  return (
  <header
  role="banner"
  className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b border-white/5 backdrop-blur-xl bg-slate-950/80"
>
  {/* Mobile menu button */}
  <button
    onClick={onMenuToggle}
    className="lg:hidden text-slate-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
    aria-label="فتح القائمة"
  >
    <Menu size={20} />
  </button>

  {/* Page title & Date */}
  <div className="flex-1">
    <h2 className="text-white font-bold text-xl tracking-tight mx-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {t(`${activePage}`)}
    </h2>
    <p className="text-[11px] text-slate-500 font-medium mt-0.5 uppercase tracking-wide mx-6">
      {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    </p>
  </div>


  {/* Alerts bell */}
  <button
    className="relative p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all group"
    aria-label={`${t('alerts.title')} - ${activeAlerts} ${t('alerts.alertsCount')}`}
  >
    <Bell size={20} className="group-hover:scale-110 transition-transform" />
    {activeAlerts > 0 && (
      <span
        className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-4 ring-slate-950 shadow-lg"
        aria-hidden="true"
      >
        {activeAlerts}
      </span>
    )}
  </button>

  {/* User avatar */}
  <button
    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 hover:bg-white/10 hover:border-white/20 transition-all group"
    aria-label="الملف الشخصي"
  >
    <div className="hidden sm:block text-right">
      <p className="text-sm text-slate-200 font-semibold leading-none">أحمد خالد</p>
      <p className="text-[10px] text-emerald-500/80 font-medium mt-1">مسؤول النظام</p>
    </div>
    
    <div 
      className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/10 group-hover:shadow-emerald-500/20 transition-all"
      style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
    >
      <User size={18} className="text-white" />
    </div>
  </button>
</header>
  );
});

Header.displayName = 'Header';
export default Header;