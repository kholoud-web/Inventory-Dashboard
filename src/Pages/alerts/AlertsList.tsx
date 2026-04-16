import { useTranslation } from 'react-i18next';
import type { Alert } from '../../Types';
import AlertItemCard from './AlertItemCard';
import AlertsEmptyState from './AlertsEmptyState';

interface AlertsListProps {
  alerts: Alert[];
  onResolve: (id: string) => void;
}

const AlertsList = ({ alerts, onResolve }: AlertsListProps) => {
  const { t } = useTranslation();

  if (alerts.length === 0) {
    return <AlertsEmptyState />;
  }

  return (
    <div className="space-y-3" role="list" aria-label={t('alerts.title')}>
      {alerts.map((alert) => (
        <AlertItemCard key={alert.id} alert={alert} onResolve={onResolve} />
      ))}
    </div>
  );
};

export default AlertsList;