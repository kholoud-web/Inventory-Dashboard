import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Package, AlertTriangle, TrendingUp, DollarSign,
  ArrowUp, ArrowDown,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import StatCard from '../components/StateCard';
import { dashboardStats, monthlyData, categoryStats, movementsData } from '../Data';

{/* UI palette */}
const UI = {
  card: 'bg-slate-900/70 backdrop-blur-xl border border-slate-800/80',
  cardHover: 'hover:bg-slate-900/90',
  title: 'text-slate-100',
  muted: 'text-slate-400',
  soft: 'text-slate-500',
  grid: 'rgba(148,163,184,0.08)',
  incoming: '#34d399', // emerald-400
  outgoing: '#38bdf8', // sky-400
};

const COLORS = ['#34d399', '#38bdf8', '#a78bfa', '#fbbf24', '#fb7185', '#22d3ee'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
  <div className="bg-slate-900/90 backdrop-blur-md rounded-xl p-3 shadow-xl border border-white/10">
        <p className="text-white font-bold mb-2 text-xs border-b border-white/5 pb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-[11px] py-0.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-400">{entry.name}:</span>
            <span className="text-white font-mono">{entry.value.toLocaleString('ar')}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = memo(() => {
  const { t } = useTranslation();

  const weeklyData = [
    { day: 'الأحد', in: 45, out: 38 },
    { day: 'الاثنين', in: 62, out: 55 },
    { day: 'الثلاثاء', in: 38, out: 42 },
    { day: 'الأربعاء', in: 70, out: 65 },
    { day: 'الخميس', in: 55, out: 48 },
    { day: 'الجمعة', in: 28, out: 22 },
    { day: 'السبت', in: 32, out: 18 },
  ];

  return (
   <div className="space-y-6 animate-in fade-in duration-500 px-4">
      {/* Stats Grid */}
      <section aria-label={t('dashboard.overview')}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t('totalItems')}
            value={dashboardStats.totalItems.toLocaleString('ar')}
            subtitle="في 7 فئات مفعّلة"
            icon={Package}
            color="yellow" 
            trend={{ value: 5.2, label: 'عن الشهر الماضي' }}
          />
          <StatCard
            title={t('totalValue')}
            value={`${(dashboardStats.totalValue / 1000).toFixed(0)}k ر.س`}
            subtitle="صافي القيمة الحالية"
            icon={DollarSign}
            color="blue" 
            trend={{ value: 8.1, label: 'عن الشهر الماضي' }}
          />
          <StatCard
            title={t('lowStock')}
            value={dashboardStats.lowStockCount}
            subtitle="تتطلب إعادة طلب"
            icon={AlertTriangle}
            color="emerald" 
            trend={{ value: -2, label: 'عن الأسبوع الماضي' }}
          />
          <StatCard
            title={t('outOfStock')}
            value={dashboardStats.outOfStockCount}
            subtitle="نقص حاد في المخزون"
            icon={TrendingUp}
            color="red" 
            trend={{ value: 1, label: 'هذا الأسبوع' }}
          />
        </div>
      </section>

      {/* Charts Row */}
  {/* Charts Row */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Monthly trend chart */}
    <section className={`lg:col-span-2 rounded-2xl p-6 transition-all duration-300 ${UI.card} ${UI.cardHover}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className={`${UI.title} font-bold text-lg leading-none`}>
            {t('dashboard.monthlyTrend')}
          </h3>
          <p className={`text-xs mt-1 ${UI.muted}`}>تحليل حركة الوارد والصادر</p>
        </div>

        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider">
          <span className={`flex items-center gap-1.5 ${UI.muted}`}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: UI.incoming }} />
            وارد
          </span>
          <span className={`flex items-center gap-1.5 ${UI.muted}`}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: UI.outgoing }} />
            صادر
          </span>
        </div>
      </div>

      <div style={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="inGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={UI.incoming} stopOpacity={0.28} />
                <stop offset="95%" stopColor={UI.incoming} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={UI.outgoing} stopOpacity={0.18} />
                <stop offset="95%" stopColor={UI.outgoing} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={UI.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="incoming"
              name="وارد"
              stroke={UI.incoming}
              fill="url(#inGrad)"
              strokeWidth={3}
              dot={{ r: 4, fill: UI.incoming, strokeWidth: 2, stroke: '#020617' }}
              activeDot={{ r: 6 }}
            />

            <Area
              type="monotone"
              dataKey="outgoing"
              name="صادر"
              stroke={UI.outgoing}
              fill="url(#outGrad)"
              strokeWidth={2.5}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>

    {/* Pie chart */}
    <section className={`flex flex-col rounded-2xl p-6 transition-all duration-300 ${UI.card} ${UI.cardHover}`}>
      <h3 className={`${UI.title} font-bold mb-1`}>{t('dashboard.topCategories')}</h3>
      <p className={`text-xs mb-6 ${UI.muted}`}>توزيع المخزون حسب الفئة</p>

      <div className="flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryStats}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              dataKey="count"
              paddingAngle={6}
              stroke="none"
            >
              {categoryStats.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        {categoryStats.slice(0, 4).map((cat, i) => (
          <div key={i} className="rounded-lg border border-slate-800/70 bg-slate-950/40 p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
              <span className="text-[10px] text-slate-400 truncate">{cat.name}</span>
            </div>
            <p className="text-sm text-slate-100 font-bold px-4">
              {cat.count.toLocaleString('ar')}
            </p>
          </div>
        ))}
      </div>
    </section>
  </div>

  {/* Bottom Row */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Weekly bar chart */}
    <section className={`rounded-2xl p-6 transition-all duration-300 ${UI.card} ${UI.cardHover}`}>
      <h3 className={`${UI.title} font-bold mb-1`}>{t('dashboard.weeklyMovement')}</h3>
      <p className={`text-xs mb-6 ${UI.muted}`}>إجمالي الحركة خلال الـ 7 أيام الماضية</p>

      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke={UI.grid} vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="in" name="وارد" fill={UI.incoming} radius={[6, 6, 0, 0]} barSize={12} />
            <Bar dataKey="out" name="صادر" fill={UI.outgoing} radius={[6, 6, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>

    {/* Recent activity */}
    <section className={`rounded-2xl p-6 transition-all duration-300 ${UI.card} ${UI.cardHover}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`${UI.title} font-bold`}>{t('dashboard.recentActivity')}</h3>
        <button className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
          عرض الكل
        </button>
      </div>

      <div className="space-y-3">
        {movementsData.slice(0, 5).map((mv) => (
          <div
            key={mv.id}
            className="flex items-center gap-4 p-3 rounded-xl bg-slate-950/30 hover:bg-slate-950/50 border border-slate-800/50 transition-all"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner ${
                mv.type === 'in'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-sky-500/10 text-sky-400'
              }`}
            >
              {mv.type === 'in' ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-100 font-bold truncate">{mv.itemName}</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-2">
                {mv.reason}
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                {mv.operator}
              </p>
            </div>

            <div className="text-left">
              <p
                className={`text-sm font-mono font-bold ${
                  mv.type === 'in' ? 'text-emerald-400' : 'text-sky-400'
                }`}
              >
                {mv.type === 'in' ? '+' : '-'}
                {mv.quantity}
              </p>
              <p className="text-[10px] text-slate-500">
                {mv.date.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
export default Dashboard;