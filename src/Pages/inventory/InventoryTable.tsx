import { useTranslation } from 'react-i18next';
import type { InventoryItem } from '../../Types';
import type { SortDir, SortKey } from '../Inventory';
import InventoryTableHead from './InventorybTableHead';
import InventoryRow from './InventoryRow';

interface InventoryTableProps {
  items: InventoryItem[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}

const InventoryTable = ({ items, sortKey, sortDir, onSort }: InventoryTableProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="rounded-2xl overflow-hidden bg-slate-900/70 backdrop-blur-xl border border-slate-800/80"
      role="region"
      aria-label={t('inventory.title')}
    >
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="جدول المخزون">
          <InventoryTableHead sortKey={sortKey} sortDir={sortDir} onSort={onSort} />

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-500">
                  {t('table.noResults')}
                </td>
              </tr>
            ) : (
              items.map((item) => <InventoryRow key={item.id} item={item} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;