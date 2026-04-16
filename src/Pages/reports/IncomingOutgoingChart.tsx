import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import ReportsTooltip from './ReportsTooltip';
import { UI } from './reportsUi';

interface IncomingOutgoingChartProps {
  data: {
    month: string;
    incoming: number;
    outgoing: number;
  }[];
}

const IncomingOutgoingChart = ({ data }: IncomingOutgoingChartProps) => {
  return (
    <section className={`min-w-0 rounded-2xl p-5 ${UI.panel}`} aria-label="مقارنة الوارد والصادر">
      <h3 className={`${UI.title} font-bold mb-1`} style={{ fontFamily: 'Cairo, sans-serif' }}>
        الوارد مقابل الصادر
      </h3>
      <p className={`text-xs mb-4 ${UI.muted}`}>كميات الحركة الشهرية</p>

      <div className="w-full min-w-0 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke={UI.grid} vertical={false} />
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
            />
            <Tooltip content={<ReportsTooltip />} />
            <Legend formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>} />
            <Bar dataKey="incoming" name="وارد" fill={UI.emerald} opacity={0.9} radius={[6, 6, 0, 0]} />
            <Bar dataKey="outgoing" name="صادر" fill={UI.sky} opacity={0.9} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default IncomingOutgoingChart;