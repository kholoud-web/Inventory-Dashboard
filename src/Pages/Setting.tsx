import { memo, useState } from 'react';
import { Bell, Shield, Database, Palette, Globe, Save } from 'lucide-react';

const Settings = memo(() => {
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoReorder, setAutoReorder] = useState(false);
  const [currency, setCurrency] = useState('SAR');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Toggle = ({ checked, onChange, id, label }: { checked: boolean; onChange: (v: boolean) => void; id: string; label: string }) => (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="text-sm text-green-200 cursor-pointer">{label}</label>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className="relative w-11 h-6 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
        style={{ background: checked ? '#166534' : 'rgba(74,222,128,0.15)', border: `1px solid ${checked ? '#4ade80' : 'rgba(74,222,128,0.2)'}` }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200"
          style={{
            background: checked ? '#4ade80' : 'rgba(74,222,128,0.4)',
            right: checked ? '2px' : 'calc(100% - 22px)',
          }}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {[
        {
          icon: Bell, title: 'إعدادات التنبيهات', items: (
            <div className="space-y-4">
              <Toggle id="email-notif" checked={emailNotifications} onChange={setEmailNotifications} label="تنبيهات البريد الإلكتروني" />
              <Toggle id="auto-reorder" checked={autoReorder} onChange={setAutoReorder} label="إعادة الطلب التلقائي" />
              <div>
                <label htmlFor="low-stock" className="text-sm text-green-200 block mb-2">
                  حد تنبيه نقص المخزون (%)
                </label>
                <input
                  id="low-stock"
                  type="range"
                  min={5} max={30} step={5}
                  value={lowStockThreshold}
                  onChange={e => setLowStockThreshold(Number(e.target.value))}
                  className="w-full accent-green-500"
                  aria-valuemin={5} aria-valuemax={30} aria-valuenow={lowStockThreshold}
                />
                <div className="flex justify-between text-xs text-green-400/50 mt-1">
                  <span>5%</span>
                  <span className="text-green-400 font-medium">{lowStockThreshold}%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>
          )
        },
        {
          icon: Globe, title: 'إعدادات النظام', items: (
            <div className="space-y-4">
              <div>
                <label htmlFor="currency" className="text-sm text-green-200 block mb-2">العملة</label>
                <select
                  id="currency"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className="glass-card rounded-xl px-4 py-2.5 text-sm text-green-300 outline-none w-full"
                  style={{ background: 'rgba(22,101,52,0.08)' }}
                >
                  <option value="SAR" style={{ background: '#0a0f0a' }}>ريال سعودي (ر.س)</option>
                  <option value="AED" style={{ background: '#0a0f0a' }}>درهم إماراتي (د.إ)</option>
                  <option value="KWD" style={{ background: '#0a0f0a' }}>دينار كويتي (د.ك)</option>
                  <option value="USD" style={{ background: '#0a0f0a' }}>دولار أمريكي ($)</option>
                </select>
              </div>
              <div className="text-sm text-green-400/60 glass-card rounded-xl p-3">
                <p>اللغة: <span className="text-green-300">العربية</span></p>
                <p className="mt-1">المنطقة الزمنية: <span className="text-green-300">توقيت الرياض (GMT+3)</span></p>
              </div>
            </div>
          )
        },
        {
          icon: Database, title: 'إدارة البيانات', items: (
            <div className="space-y-3">
              {[
                { label: 'تصدير بيانات المخزون (CSV)', color: '#4ade80' },
                { label: 'تصدير التقارير (PDF)', color: '#60a5fa' },
                { label: 'نسخ احتياطي للبيانات', color: '#fbbf24' },
              ].map((btn, i) => (
                <button key={i}
                  className="w-full text-sm px-4 py-2.5 rounded-xl glass-card text-right transition-all hover:bg-green-900/20"
                  style={{ color: btn.color, border: `1px solid ${btn.color}33` }}>
                  {btn.label}
                </button>
              ))}
            </div>
          )
        },
      ].map((section, i) => (
        <section key={i} className="glass-card rounded-2xl p-6" aria-label={section.title}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(74,222,128,0.15)' }}>
              <section.icon size={16} className="text-green-400" aria-hidden="true" />
            </div>
            <h3 className="text-white font-bold" style={{ fontFamily: 'Cairo, sans-serif' }}>{section.title}</h3>
          </div>
          {section.items}
        </section>
      ))}

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
        style={{ background: saved ? '#166534' : 'linear-gradient(135deg, #166534, #16a34a)' }}
        aria-label="حفظ الإعدادات"
      >
        <Save size={16} />
        {saved ? '✓ تم الحفظ بنجاح' : 'حفظ الإعدادات'}
      </button>
    </div>
  );
});

Settings.displayName = 'Settings';
export default Settings;