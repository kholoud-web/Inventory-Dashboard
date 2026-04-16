import { UI, CHART_COLORS } from './reportsUi';

interface TopItem {
  name: string;
  value: number;
  quantity: number;
}

interface TopItemsValueListProps {
  items: TopItem[];
}

const TopItemsValueList = ({ items }: TopItemsValueListProps) => {
  return (
    <section className={`rounded-2xl p-5 ${UI.panel}`} aria-label="أعلى الأصناف قيمة">
      <h3 className={`${UI.title} font-bold mb-4`} style={{ fontFamily: 'Cairo, sans-serif' }}>
        أعلى الأصناف قيمةً
      </h3>

      <div className="space-y-4" role="list">
        {items.map((item, i) => {
          const maxVal = items[0]?.value || 1;
          const pct = Math.round((item.value / maxVal) * 100);

          return (
            <div key={i} role="listitem" className="space-y-1.5">
              <div className="flex justify-between text-xs gap-3">
                <span className="text-slate-200 font-medium truncate ml-4">
                  {item.name}
                </span>
                <span className="text-slate-400 flex-shrink-0">
                  {item.value.toLocaleString('ar')} ر.س
                </span>
              </div>

              <div className="h-2.5 rounded-full overflow-hidden bg-slate-800/80">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: CHART_COLORS[i % CHART_COLORS.length] }}
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopItemsValueList;