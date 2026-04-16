import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import ReportsTooltip from './ReportsTooltip';
import { UI, CHART_COLORS } from './reportsUi';

interface CategoryValueChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const CategoryValueChart = ({ data }: CategoryValueChartProps) => {
  return (
    <section className={`min-w-0 rounded-2xl p-5 ${UI.panel}`} aria-label="قيمة الفئات">
      <h3 className={`${UI.title} font-bold mb-4`} style={{ fontFamily: 'Cairo, sans-serif' }}>
        قيمة المخزون حسب الفئة
      </h3>

      <div className="w-full min-w-0 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barSize={18}>
            <CartesianGrid strokeDasharray="3 3" stroke={UI.grid} horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#cbd5e1', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<ReportsTooltip />} />
            <Bar dataKey="value" name="القيمة (ر.س)" radius={[0, 6, 6, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} opacity={0.9} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default CategoryValueChart;