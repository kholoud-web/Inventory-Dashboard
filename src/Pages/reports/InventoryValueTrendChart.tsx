import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ReportsTooltip from './ReportsTooltip';
import { UI } from './reportsUi';

interface InventoryValueTrendChartProps {
  data: {
    month: string;
    value: number;
    net: number;
  }[];
}

const InventoryValueTrendChart = ({ data }: InventoryValueTrendChartProps) => {
  return (
    <section className={`min-w-0 rounded-2xl p-5 ${UI.panel}`} aria-label="اتجاه القيمة الشهرية">
      <h3 className={`${UI.title} font-bold mb-1`} style={{ fontFamily: 'Cairo, sans-serif' }}>
        اتجاه قيمة المخزون
      </h3>
      <p className={`text-xs mb-4 ${UI.muted}`}>بالريال السعودي</p>

      <div className="w-full min-w-0 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={UI.grid} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<ReportsTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              name="القيمة (ر.س)"
              stroke={UI.emerald}
              strokeWidth={2.5}
              dot={{ fill: UI.emerald, r: 4 }}
              activeDot={{ r: 6, fill: UI.emerald }}
            />
            <Line
              type="monotone"
              dataKey="net"
              name="الصافي"
              stroke={UI.amber}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default InventoryValueTrendChart;