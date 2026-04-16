import { useTranslation } from 'react-i18next';

interface InventorySummaryProps {
  currentCount: number;
  totalCount: number;
}

const InventorySummary = ({ currentCount, totalCount }: InventorySummaryProps) => {
  const { t } = useTranslation();

  return (
    <p className="text-xs text-slate-400">
      عرض {currentCount} من {totalCount} {t('common.items')}
    </p>
  );
};

export default InventorySummary;