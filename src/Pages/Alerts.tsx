import React, { memo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, AlertCircle, Info, CheckCircle, Clock, X } from 'lucide-react';
import { alertsData as initialAlerts } from '../Data';
import type { Alert, AlertSeverity } from '../Types';

const severityConfig: Record<AlertSeverity, { icon: React.ElementType; color: string; bg: string; border: string; badge: string }> = {
  critical: { icon: AlertCircle, color: '#f87171', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', badge: 'badge-danger' },
  warning:  { icon: AlertTriangle, color: '#fbbf24', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', badge: 'badge-warning' },
  info:     { icon: Info, color: '#60a5fa', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', badge: 'badge-info' },
};

const typeLabels: Record<Alert['type'], string> = {
  outOfStock: 'نفاد المخزون',
  lowStock: 'نقص المخزون',
  expiry: 'انتهاء الصلاحية',
  reorder: 'إعادة الطلب',
};

const Alerts = memo(() => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('active');
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all');

  const resolve = useCallback((id: string) => {
    setAlerts(prev => prev.map(a =>
      a.id === id ? { ...a, status: 'resolved', resolvedAt: new Date() } : a
    ));
  }, []);

  const filtered = alerts
    .filter(a => filter === 'all' ? true : a.status === filter)
    .filter(a => severityFilter === 'all' ? true : a.severity === severityFilter);

  const activeCount = alerts.filter(a => a.status === 'active').length;
  const criticalCount = alerts.filter(a => a.status === 'active' && a.severity === 'critical').length;
  const warningCount = alerts.filter(a => a.status === 'active' && a.severity === 'warning').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي التنبيهات', value: activeCount, color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
          { label: 'حرجة', value: criticalCount, color: '#f87171', bg: 'rgba(239,68,68,0.1)' },
          { label: 'تحذيرات', value: warningCount, color: '#fbbf24', bg: 'rgba(245,158,11,0.1)' },
          { label: 'تم حلها', value: alerts.filter(a => a.status === 'resolved').length, color: '#6ee7b7', bg: 'rgba(110,231,183,0.1)' },
        ].map((stat, i) => (
          <div key={i} className="glass-card glass-card-hover rounded-2xl p-4 text-center" role="region" aria-label={stat.label}>
            <p className="text-2xl font-bold" style={{ color: stat.color, fontFamily: 'Cairo, sans-serif' }}>
              {stat.value}
            </p>
            <p className="text-xs text-green-400/60 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 glass-card rounded-xl p-1" role="group" aria-label="تصفية حسب الحالة">
          {[
            { key: 'active' as const, label: t('alerts.active') },
            { key: 'resolved' as const, label: t('alerts.resolved') },
            { key: 'all' as const, label: 'الكل' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className="px-3 py-1.5 text-sm rounded-lg transition-all"
              style={filter === f.key
                ? { background: 'linear-gradient(135deg, #166534, #16a34a)', color: 'white' }
                : { color: '#4ade8099' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 glass-card rounded-xl p-1" role="group" aria-label="تصفية حسب الشدة">
          {[
            { key: 'all' as const, label: 'الكل' },
            { key: 'critical' as AlertSeverity, label: t('alerts.critical') },
            { key: 'warning' as AlertSeverity, label: t('alerts.warning') },
            { key: 'info' as AlertSeverity, label: t('alerts.info') },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setSeverityFilter(f.key)}
              aria-pressed={severityFilter === f.key}
              className="px-3 py-1.5 text-sm rounded-lg transition-all"
              style={severityFilter === f.key
                ? { background: 'rgba(74,222,128,0.2)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }
                : { color: '#4ade8066' }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts list */}
      <div className="space-y-3" role="list" aria-label={t('alerts.title')}>
        {filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <CheckCircle size={40} className="mx-auto mb-3 text-green-400/30" aria-hidden="true" />
            <p className="text-green-400/60 font-medium">{t('alerts.noAlerts')}</p>
          </div>
        ) : filtered.map((alert) => {
          const cfg = severityConfig[alert.severity];
          const Icon = cfg.icon;
          const isActive = alert.status === 'active';
          return (
            <div
              key={alert.id}
              role="listitem"
              className="rounded-2xl p-4 flex items-start gap-4 transition-all"
              style={{
                background: isActive ? cfg.bg : 'rgba(22,101,52,0.05)',
                border: `1px solid ${isActive ? cfg.border : 'rgba(74,222,128,0.08)'}`,
                opacity: isActive ? 1 : 0.6,
              }}
              aria-label={`تنبيه: ${alert.itemName}`}
            >
              {/* Icon */}
              <div className="relative flex-shrink-0 mt-0.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: isActive ? cfg.bg : 'rgba(22,101,52,0.1)' }}>
                  <Icon size={20} style={{ color: isActive ? cfg.color : '#4ade8040' }} aria-hidden="true" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.badge}`}>
                    {typeLabels[alert.type]}
                  </span>
                  <span className="text-white font-semibold text-sm">{alert.itemName}</span>
                </div>
                <p className="text-xs text-green-300/70">{alert.message}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-green-400/40">
                  <span className="flex items-center gap-1">
                    <Clock size={11} aria-hidden="true" />
                    {alert.createdAt.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {alert.resolvedAt && (
                    <span className="badge-success px-2 py-0.5 rounded-full">
                      ✓ تم الحل في {alert.resolvedAt.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              {isActive && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => resolve(alert.id)}
                    className="text-xs px-3 py-1.5 rounded-lg badge-success hover:opacity-80 transition-opacity font-medium"
                    aria-label={`${t('alerts.markResolved')}: ${alert.itemName}`}
                  >
                    {t('alerts.markResolved')}
                  </button>
                  <button
                    className="p-1.5 text-green-400/40 hover:text-green-300 transition-colors rounded-lg"
                    aria-label={t('common.close')}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

Alerts.displayName = 'Alerts';
export default Alerts;