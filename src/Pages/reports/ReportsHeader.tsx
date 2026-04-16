import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Period = 'week' | 'month' | 'quarter' | 'year';

interface ReportsHeaderProps {
  period: Period;
  setPeriod: (value: Period) => void;
}

const ReportsHeader = ({ period, setPeriod }: ReportsHeaderProps) => {
  const { t } = useTranslation();

  const periods: { key: Period; label: string }[] = [
    { key: 'week', label: t('reports.week') },
    { key: 'month', label: t('reports.month') },
    { key: 'quarter', label: t('reports.quarter') },
    { key: 'year', label: t('reports.year') },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div
        className="flex items-center gap-1 rounded-xl p-1 bg-slate-950/40 border border-slate-800/70"
        role="group"
        aria-label="اختيار الفترة الزمنية"
      >
        {periods.map((p) => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            aria-pressed={period === p.key}
            className="px-4 py-2 text-sm rounded-lg transition-all font-medium cursor-pointer"
            style={
              period === p.key
                ? {
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: 'white',
                  }
                : { color: 'black' }
            }
          >
            {p.label}
          </button>
        ))}
      </div>

      <button
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-white transition-all hover:opacity-95 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
        aria-label={t('reports.download')}
      >
        <Download size={15} />
        {t('reports.download')}
      </button>
    </div>
  );
};

export default ReportsHeader;