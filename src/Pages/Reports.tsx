import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts';
import { monthlyData, categoryStats, inventoryData } from '../Data';

type Period = 'week' | 'month' | 'quarter' | 'year';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl p-3 text-sm" style={{ border: '1px solid rgba(74,222,128,0.2)' }}>
        <p className="text-green-300 font-medium mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }} className="text-xs">
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString('ar') : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const COLORS = ['#4ade80', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5', '#86efac'];

const Reports = memo(() => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<Period>('month');

  const periods: { key: Period; label: string }[] = [
    { key: 'week', label: t('reports.week') },
    { key: 'month', label: t('reports.month') },
    { key: 'quarter', label: t('reports.quarter') },
    { key: 'year', label: t('reports.year') },
  ];

  const totalIn = monthlyData.reduce((s, d) => s + d.incoming, 0);
  const totalOut = monthlyData.reduce((s, d) => s + d.outgoing, 0);
  const totalValue = monthlyData.reduce((s, d) => s + d.value, 0);

  const valueData = monthlyData.map(d => ({ ...d, net: d.incoming - d.outgoing }));

  const topItems = [...inventoryData]
    .sort((a, b) => b.price * b.quantity - a.price * a.quantity)
    .slice(0, 5)
    .map(i => ({ name: i.name, value: i.price * i.quantity, quantity: i.quantity }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Period selector */}
        <div className="flex items-center gap-1 glass-card rounded-xl p-1" role="group" aria-label="اختيار الفترة الزمنية">
          {periods.map(p => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              aria-pressed={period === p.key}
              className="px-4 py-2 text-sm rounded-lg transition-all font-medium"
              style={period === p.key
                ? { background: 'linear-gradient(135deg, #166534, #16a34a)', color: 'white' }
                : { color: '#4ade8099' }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #166534, #16a34a)' }}
          aria-label={t('reports.download')}
        >
          <Download size={15} />
          {t('reports.download')}
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'إجمالي الوارد', value: totalIn.toLocaleString('ar'), icon: TrendingDown, color: '#4ade80', bg: 'rgba(74,222,128,0.1)' },
          { label: 'إجمالي الصادر', value: totalOut.toLocaleString('ar'), icon: TrendingUp, color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
          { label: 'إجمالي القيمة', value: `${(totalValue / 1000).toFixed(0)}k ر.س`, icon: BarChart2, color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
        ].map((kpi, i) => (
          <div key={i} className="glass-card glass-card-hover rounded-2xl p-5" role="region" aria-label={kpi.label}>
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-xl p-2.5" style={{ background: kpi.bg }}>
                <kpi.icon size={18} style={{ color: kpi.color }} aria-hidden="true" />
              </div>
              <span className="text-xs badge-success px-2 py-1 rounded-full">7 أشهر</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: kpi.color, fontFamily: 'Cairo, sans-serif' }}>
              {kpi.value}
            </p>
            <p className="text-xs text-green-400/60 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incoming vs Outgoing */}
        <section className="glass-card rounded-2xl p-5" aria-label="مقارنة الوارد والصادر">
          <h3 className="text-white font-bold mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>
            الوارد مقابل الصادر
          </h3>
          <p className="text-xs text-green-400/50 mb-4">كميات الحركة الشهرية</p>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,222,128,0.08)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#4ade8080', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4ade8080', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(v) => <span style={{ color: '#4ade8099', fontSize: 12 }}>{v}</span>} />
                <Bar dataKey="incoming" name="وارد" fill="#4ade80" opacity={0.85} radius={[4, 4, 0, 0]} />
                <Bar dataKey="outgoing" name="صادر" fill="#60a5fa" opacity={0.85} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Value trend */}
        <section className="glass-card rounded-2xl p-5" aria-label="اتجاه القيمة الشهرية">
          <h3 className="text-white font-bold mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>
            اتجاه قيمة المخزون
          </h3>
          <p className="text-xs text-green-400/50 mb-4">بالريال السعودي</p>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={valueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,222,128,0.08)" />
                <XAxis dataKey="month" tick={{ fill: '#4ade8080', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4ade8080', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" name="القيمة (ر.س)" stroke="#4ade80" strokeWidth={2.5}
                  dot={{ fill: '#4ade80', r: 4 }} activeDot={{ r: 6, fill: '#4ade80' }} />
                <Line type="monotone" dataKey="net" name="الصافي" stroke="#fbbf24" strokeWidth={2}
                  strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category value */}
        <section className="glass-card rounded-2xl p-5" aria-label="قيمة الفئات">
          <h3 className="text-white font-bold mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
            قيمة المخزون حسب الفئة
          </h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats} layout="vertical" barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,222,128,0.08)" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#4ade8080', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#4ade8099', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="القيمة (ر.س)" radius={[0, 4, 4, 0]}>
                  {categoryStats.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Top items by value */}
        <section className="glass-card rounded-2xl p-5" aria-label="أعلى الأصناف قيمة">
          <h3 className="text-white font-bold mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
            أعلى الأصناف قيمةً
          </h3>
          <div className="space-y-3" role="list">
            {topItems.map((item, i) => {
              const maxVal = topItems[0].value;
              const pct = Math.round((item.value / maxVal) * 100);
              return (
                <div key={i} role="listitem" className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-green-200 font-medium truncate ml-4">{item.name}</span>
                    <span className="text-green-400/70 flex-shrink-0">{item.value.toLocaleString('ar')} ر.س</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(74,222,128,0.1)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: COLORS[i] }}
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
      </div>
    </div>
  );
});

Reports.displayName = 'Reports';
export default Reports;