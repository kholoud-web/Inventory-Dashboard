import { useTranslation } from 'react-i18next';
import type { AlertSeverity } from '../../Types';
import { ALERTS_UI } from './alertsUi';

interface AlertsFiltersProps {
  filter: 'all' | 'active' | 'resolved';
  setFilter: (value: 'all' | 'active' | 'resolved') => void;
  severityFilter: AlertSeverity | 'all';
  setSeverityFilter: (value: AlertSeverity | 'all') => void;
}

const AlertsFilters = ({
  filter,
  setFilter,
  severityFilter,
  setSeverityFilter,
}: AlertsFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        className={`flex items-center gap-1 rounded-xl p-1 ${ALERTS_UI.panelSoft}`}
        role="group"
        aria-label="تصفية حسب الحالة"
      >
        {[
          { key: 'active' as const, label: t('active') },
          { key: 'resolved' as const, label: t('resolved') },
          { key: 'all' as const, label: 'الكل' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className="px-3 py-1.5 text-sm rounded-lg transition-all"
            style={
              filter === f.key
                ? {
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: 'white',
                  }
                : {
                    color: 'black',
                  }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        className={`flex items-center gap-1 rounded-xl p-1 ${ALERTS_UI.panelSoft}`}
        role="group"
        aria-label="تصفية حسب الشدة"
      >
        {[
          { key: 'all' as const, label: 'الكل' },
          { key: 'critical' as AlertSeverity, label: t('critical') },
          { key: 'warning' as AlertSeverity, label: t('warning') },
          { key: 'info' as AlertSeverity, label: t('info') },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setSeverityFilter(f.key)}
            aria-pressed={severityFilter === f.key}
            className="px-3 py-1.5 text-sm rounded-lg transition-all border"
            style={
              severityFilter === f.key
                ? {
                    color: '#e2e8f0',
                    background: 'rgba(15,23,42,0.65)',
                    borderColor: 'rgba(148,163,184,0.18)',
                  }
                : {
                    color: 'black',
                    borderColor: 'transparent',
                    background: 'transparent',
                  }
            }
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlertsFilters;