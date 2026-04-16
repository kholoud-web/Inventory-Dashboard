import { ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { SortDir, SortKey } from '../Inventory';

interface InventoryTableHeadProps {
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}

const InventoryTableHead = ({ sortKey, sortDir, onSort }: InventoryTableHeadProps) => {
  const { t } = useTranslation();

  const columns = [
    { key: 'name' as SortKey, label: t('inventory.itemName') },
    { key: 'category' as SortKey, label: t('inventory.category') },
    { key: 'quantity' as SortKey, label: t('inventory.quantity') },
    { key: 'price' as SortKey, label: t('inventory.price') },
  ];

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (
      sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
    ) : null;

  return (
    <thead>
      <tr className="border-b border-slate-800/80 bg-slate-950/50">
        {columns.map((col) => (
          <th
            key={col.key}
            className="text-right px-4 py-3 text-xs font-semibold text-slate-400 cursor-pointer select-none hover:text-slate-200 transition-colors"
            onClick={() => onSort(col.key)}
            scope="col"
            aria-sort={
              sortKey === col.key
                ? sortDir === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            <span className="flex items-center gap-1 justify-end">
              {col.label}
              <SortIcon k={col.key} />
            </span>
          </th>
        ))}

        <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400">مستوى المخزون</th>
        <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400">
          {t('inventory.status')}
        </th>
        <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400">
          {t('inventory.actions')}
        </th>
      </tr>
    </thead>
  );
};

export default InventoryTableHead;