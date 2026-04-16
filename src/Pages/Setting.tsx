import { memo, useState } from 'react';
import { Bell, Database, Globe, Save } from 'lucide-react';

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

  const Toggle = ({
    checked,
    onChange,
    id,
    label,
  }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    id: string;
    label: string;
  }) => (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-sm text-slate-200 cursor-pointer">
        {label}
      </label>

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className="relative w-11 h-6 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        style={{
          background: checked ? '#0f766e' : 'rgba(51,65,85,0.9)',
          border: `1px solid ${checked ? 'rgba(45,212,191,0.55)' : 'rgba(148,163,184,0.18)'}`,
        }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200 shadow-sm"
          style={{
            background: checked ? '#5eead4' : '#cbd5e1',
            right: checked ? '2px' : 'calc(100% - 22px)',
          }}
        />
      </button>
    </div>
  );

  const sections = [
    {
      icon: Bell,
      title: 'إعدادات التنبيهات',
      iconBg: 'rgba(56,189,248,0.10)',
      iconColor: '#38bdf8',
      items: (
        <div className="space-y-4">
          <Toggle
            id="email-notif"
            checked={emailNotifications}
            onChange={setEmailNotifications}
            label="تنبيهات البريد الإلكتروني"
          />

          <Toggle
            id="auto-reorder"
            checked={autoReorder}
            onChange={setAutoReorder}
            label="إعادة الطلب التلقائي"
          />

          <div>
            <label htmlFor="low-stock" className="text-sm text-slate-200 block mb-2">
              حد تنبيه نقص المخزون (%)
            </label>

            <input
              id="low-stock"
              type="range"
              min={5}
              max={30}
              step={5}
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(Number(e.target.value))}
              className="w-full accent-sky-500"
              aria-valuemin={5}
              aria-valuemax={30}
              aria-valuenow={lowStockThreshold}
            />

            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>5%</span>
              <span className="text-sky-400 font-medium">{lowStockThreshold}%</span>
              <span>30%</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Globe,
      title: 'إعدادات النظام',
      iconBg: 'rgba(167,139,250,0.10)',
      iconColor: '#a78bfa',
      items: (
        <div className="space-y-4">
          <div>
            <label htmlFor="currency" className="text-sm text-slate-200 block mb-2">
              العملة
            </label>

            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none w-full bg-slate-950/50 border border-slate-800/70"
            >
              <option value="SAR" className="bg-slate-950 text-slate-100">
                ريال سعودي (ر.س)
              </option>
              <option value="AED" className="bg-slate-950 text-slate-100">
                درهم إماراتي (د.إ)
              </option>
              <option value="KWD" className="bg-slate-950 text-slate-100">
                دينار كويتي (د.ك)
              </option>
              <option value="USD" className="bg-slate-950 text-slate-100">
                دولار أمريكي ($)
              </option>
            </select>
          </div>

          <div className="rounded-xl p-4 bg-slate-950/35 border border-slate-800/60 text-sm">
            <p className="text-slate-400">
              اللغة: <span className="text-slate-200">العربية</span>
            </p>
            <p className="mt-1 text-slate-400">
              المنطقة الزمنية:{' '}
              <span className="text-slate-200">توقيت الرياض (GMT+3)</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: Database,
      title: 'إدارة البيانات',
      iconBg: 'rgba(251,191,36,0.10)',
      iconColor: '#fbbf24',
      items: (
        <div className="space-y-3">
          {[
            {
              label: 'تصدير بيانات المخزون (CSV)',
              text: 'text-emerald-300',
              border: 'rgba(52,211,153,0.20)',
              bg: 'hover:bg-emerald-500/8',
            },
            {
              label: 'تصدير التقارير (PDF)',
              text: 'text-sky-300',
              border: 'rgba(56,189,248,0.20)',
              bg: 'hover:bg-sky-500/8',
            },
            {
              label: 'نسخ احتياطي للبيانات',
              text: 'text-amber-300',
              border: 'rgba(251,191,36,0.20)',
              bg: 'hover:bg-amber-500/8',
            },
          ].map((btn, i) => (
            <button
              key={i}
              type="button"
              className={`w-full text-sm px-4 py-3 rounded-xl text-right transition-all border bg-slate-950/35 ${btn.text} ${btn.bg}`}
              style={{ borderColor: btn.border }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl px-6">
      {sections.map((section, i) => (
        <section
          key={i}
          className="rounded-2xl p-6 bg-slate-900/70 backdrop-blur-xl border border-slate-800/80"
          aria-label={section.title}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{
                background: section.iconBg,
                borderColor: 'rgba(148,163,184,0.14)',
              }}
            >
              <section.icon size={17} style={{ color: section.iconColor }} aria-hidden="true" />
            </div>

            <h3
              className="text-slate-100 font-bold"
              style={{ fontFamily: 'Cairo, sans-serif' }}
            >
              {section.title}
            </h3>
          </div>

          {section.items}
        </section>
      ))}

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:opacity-95 shadow-lg cursor-pointer"
        style={{
          background: saved
            ? '#059669'
            : 'linear-gradient(135deg, #059669, #10b981)',
        }}
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