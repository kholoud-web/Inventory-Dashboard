import type { InventoryItem } from '../../Types';
import StatusBadge from '../../components/Statusbadge';
import StockProgress from './StockProgress';
import { useTranslation } from 'react-i18next';

interface InventoryRowProps {
  item: InventoryItem;
}

const InventoryRow = ({ item }: InventoryRowProps) => {
  const { t } = useTranslation();

  return (
    <tr className="transition-colors border-b border-slate-800/50 hover:bg-slate-950/30">
      <td className="px-4 py-4">
        <div>
          <p className="text-sm text-slate-100 font-semibold">{item.name}</p>
          <p className="text-xs text-slate-500">{item.sku}</p>
        </div>
      </td>

      <td className="px-4 py-4">
        <span className="inline-flex rounded-full px-2.5 py-1 text-xs text-sky-300 bg-sky-500/10 border border-sky-500/20">
          {item.category}
        </span>
      </td>

      <td className="px-4 py-4">
        <span className="text-sm text-slate-100 font-medium">
          {item.quantity.toLocaleString('ar')}
        </span>
        <span className="text-xs text-slate-500 mr-1">{item.unit}</span>
      </td>

      <td className="px-4 py-4 text-sm text-slate-200">
        {item.price.toLocaleString('ar')} ر.س
      </td>

      <td className="px-4 py-4 w-36">
        <StockProgress item={item} />
      </td>

      <td className="px-4 py-4">
        <StatusBadge status={item.status} />
      </td>

      <td className="px-4 py-4">
        <button
          className="text-xs text-slate-400 hover:text-slate-100 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-800/70"
          aria-label={`تعديل ${item.name}`}
        >
          {t('common.edit')}
        </button>
      </td>
    </tr>
  );
};

export default InventoryRow;