import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { UI } from './reportsUi';

interface ReportsKpiCardsProps {
  totalIn: number;
  totalOut: number;
  totalValue: number;
}

const ReportsKpiCards = ({ totalIn, totalOut, totalValue }: ReportsKpiCardsProps) => {
  const cards = [
    {
      label: 'إجمالي الوارد',
      value: totalIn.toLocaleString('ar'),
      icon: TrendingDown,
      color: UI.emerald,
      bg: 'rgba(52,211,153,0.12)',
    },
    {
      label: 'إجمالي الصادر',
      value: totalOut.toLocaleString('ar'),
      icon: TrendingUp,
      color: UI.sky,
      bg: 'rgba(56,189,248,0.12)',
    },
    {
      label: 'إجمالي القيمة',
      value: `${(totalValue / 1000).toFixed(0)}k ر.س`,
      icon: BarChart2,
      color: UI.amber,
      bg: 'rgba(251,191,36,0.12)',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((kpi, i) => (
        <div
          key={i}
          className={`rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${UI.panel}`}
          role="region"
          aria-label={kpi.label}
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className="rounded-xl p-2.5 border"
              style={{
                background: kpi.bg,
                borderColor: 'rgba(148,163,184,0.15)',
              }}
            >
              <kpi.icon size={18} style={{ color: kpi.color }} aria-hidden="true" />
            </div>

            <span className="text-xs px-2 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/70">
              7 أشهر
            </span>
          </div>

          <p
            className="text-2xl font-bold tracking-tight"
            style={{ color: kpi.color, fontFamily: 'Cairo, sans-serif' }}
          >
            {kpi.value}
          </p>

          <p className="text-xs text-slate-400 mt-1">{kpi.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportsKpiCards;