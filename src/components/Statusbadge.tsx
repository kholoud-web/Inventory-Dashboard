import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type{ ItemStatus } from '../Types';

interface StatusBadgeProps {
  status: ItemStatus;
}

const StatusBadge = memo(({ status }: StatusBadgeProps) => {
  const { t } = useTranslation();
  const classMap: Record<ItemStatus, string> = {
    inStock: 'badge-success',
    lowStock: 'badge-warning',
    outOfStock: 'badge-danger',
    reorder: 'badge-info',
  };
  return (
    <span className={`${classMap[status]} text-xs px-2.5 py-1 rounded-full font-medium`}>
      {t(`status.${status}`)}
    </span>
  );
});

StatusBadge.displayName = 'StatusBadge';
export default StatusBadge;