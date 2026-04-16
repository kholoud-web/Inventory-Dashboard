import type { InventoryItem } from '../../Types';

interface StockProgressProps {
  item: InventoryItem;
}

const StockProgress = ({ item }: StockProgressProps) => {
  const pct = Math.min(100, Math.round((item.quantity / item.maxQuantity) * 100));

  const barColor =
    item.status === 'outOfStock'
      ? '#fb7185'
      : item.status === 'lowStock'
      ? '#fbbf24'
      : '#34d399';

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px] text-slate-500">
        <span>{pct}%</span>
        <span>{item.maxQuantity}</span>
      </div>

      <div className="h-2 rounded-full overflow-hidden bg-slate-800/80">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: barColor }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`مستوى المخزون ${pct}%`}
        />
      </div>
    </div>
  );
};

export default StockProgress;