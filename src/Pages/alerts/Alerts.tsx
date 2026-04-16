import { memo, useState, useCallback, useMemo } from 'react';
import { alertsData as initialAlerts } from '../../Data';
import type { Alert, AlertSeverity } from '../../Types';

import AlertsSummary from './AlertsSummary';
import AlertsFilters from './AlertsFilters';
import AlertsList from './AlertsList';

const Alerts = memo(() => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('active');
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all');

  const resolve = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'resolved', resolvedAt: new Date() } : a
      )
    );
  }, []);

  const filtered = useMemo(() => {
    return alerts
      .filter((a) => (filter === 'all' ? true : a.status === filter))
      .filter((a) => (severityFilter === 'all' ? true : a.severity === severityFilter));
  }, [alerts, filter, severityFilter]);

  const activeCount = alerts.filter((a) => a.status === 'active').length;
  const criticalCount = alerts.filter(
    (a) => a.status === 'active' && a.severity === 'critical'
  ).length;
  const warningCount = alerts.filter(
    (a) => a.status === 'active' && a.severity === 'warning'
  ).length;
  const resolvedCount = alerts.filter((a) => a.status === 'resolved').length;

  return (
    <div className="space-y-6 animate-fade-in px-4">
      <AlertsSummary
        activeCount={activeCount}
        criticalCount={criticalCount}
        warningCount={warningCount}
        resolvedCount={resolvedCount}
      />

      <AlertsFilters
        filter={filter}
        setFilter={setFilter}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
      />

      <AlertsList alerts={filtered} onResolve={resolve} />
    </div>
  );
});

Alerts.displayName = 'Alerts';
export default Alerts;