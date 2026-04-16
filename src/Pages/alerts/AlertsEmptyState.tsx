import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ALERTS_UI } from './alertsUi';

const AlertsEmptyState = () => {
  const { t } = useTranslation();

  return (
    <div className={`rounded-2xl p-12 text-center ${ALERTS_UI.panel}`}>
      <CheckCircle size={40} className="mx-auto mb-3 text-emerald-400/40" aria-hidden="true" />
      <p className="text-slate-300 font-medium">{t('alerts.noAlerts')}</p>
      <p className="text-xs text-slate-500 mt-1">لا توجد تنبيهات مطابقة للفلاتر الحالية</p>
    </div>
  );
};

export default AlertsEmptyState;