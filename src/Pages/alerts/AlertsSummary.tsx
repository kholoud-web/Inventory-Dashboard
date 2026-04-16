import { ALERTS_UI } from './alertsUi';

interface AlertsSummaryProps {
  activeCount: number;
  criticalCount: number;
  warningCount: number;
  resolvedCount: number;
}

const AlertsSummary = ({
  activeCount,
  criticalCount,
  warningCount,
  resolvedCount,
}: AlertsSummaryProps) => {
  const stats = [
    {
      label: 'إجمالي التنبيهات',
      value: activeCount,
      color: ALERTS_UI.sky,
      bg: 'rgba(56,189,248,0.10)',
    },
    {
      label: 'حرجة',
      value: criticalCount,
      color: ALERTS_UI.rose,
      bg: 'rgba(251,113,133,0.10)',
    },
    {
      label: 'تحذيرات',
      value: warningCount,
      color: ALERTS_UI.amber,
      bg: 'rgba(251,191,36,0.10)',
    },
    {
      label: 'تم حلها',
      value: resolvedCount,
      color: ALERTS_UI.emerald,
      bg: 'rgba(52,211,153,0.10)',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 ${ALERTS_UI.panel}`}
          role="region"
          aria-label={stat.label}
        >
          <div
            className="w-10 h-10 mx-auto mb-3 rounded-xl border"
            style={{
              background: stat.bg,
              borderColor: 'rgba(148,163,184,0.14)',
            }}
          />
          <p
            className="text-2xl font-bold"
            style={{ color: stat.color, fontFamily: 'Cairo, sans-serif' }}
          >
            {stat.value}
          </p>
          <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AlertsSummary;