import { Clock, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Alert } from '../../Types';
import { severityConfig, typeLabels } from './alertsConfig';

interface AlertItemCardProps {
  alert: Alert;
  onResolve: (id: string) => void;
}

const AlertItemCard = ({ alert, onResolve }: AlertItemCardProps) => {
  const { t } = useTranslation();

  const cfg = severityConfig[alert.severity];
  const Icon = cfg.icon;
  const isActive = alert.status === 'active';

  return (
    <div
      role="listitem"
      className="rounded-2xl p-4 flex items-start gap-4 transition-all hover:-translate-y-[1px]"
      style={{
        background: isActive ? 'rgba(15,23,42,0.72)' : 'rgba(15,23,42,0.38)',
        border: `1px solid ${isActive ? cfg.border : 'rgba(148,163,184,0.08)'}`,
        opacity: isActive ? 1 : 0.72,
      }}
      aria-label={`تنبيه: ${alert.itemName}`}
    >
      <div className="relative flex-shrink-0 mt-0.5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border"
          style={{
            background: isActive ? cfg.bg : 'rgba(148,163,184,0.06)',
            borderColor: isActive ? cfg.border : 'rgba(148,163,184,0.08)',
          }}
        >
          <Icon
            size={20}
            style={{ color: isActive ? cfg.color : '#64748b' }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.badgeClass}`}>
            {typeLabels[alert.type]}
          </span>
          <span className="text-slate-100 font-semibold text-sm">{alert.itemName}</span>
        </div>

        <p className="text-xs text-slate-400">{alert.message}</p>

        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock size={11} aria-hidden="true" />
            {alert.createdAt.toLocaleDateString('ar-SA', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>

          {alert.resolvedAt && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              ✓ تم الحل في{' '}
              {alert.resolvedAt.toLocaleDateString('ar-SA', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>

      {isActive && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onResolve(alert.id)}
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/12 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/18 transition-colors font-medium"
            aria-label={`${t('alerts.markResolved')}: ${alert.itemName}`}
          >
            {t('alerts.markResolved')}
          </button>

          <button
            className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-800/70"
            aria-label={t('common.close')}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertItemCard;