import { memo } from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'emerald' | 'yellow' | 'red' | 'blue';
  trend?: { value: number; label: string };
}

const colorMap = {
  green: {
    border: 'rgba(16, 185, 129, 0.28)',
    text: '#34d399',
    iconBg: 'rgba(16, 185, 129, 0.12)',
    glow: 'shadow-[0_0_0_1px_rgba(16,185,129,0.08),0_8px_30px_rgba(16,185,129,0.08)]',
  },
  yellow: {
    border: 'rgba(245, 158, 11, 0.28)',
    text: '#fbbf24',
    iconBg: 'rgba(245, 158, 11, 0.12)',
    glow: 'shadow-[0_0_0_1px_rgba(245,158,11,0.08),0_8px_30px_rgba(245,158,11,0.08)]',
  },
  red: {
    border: 'rgba(244, 63, 94, 0.28)',
    text: '#fb7185',
    iconBg: 'rgba(244, 63, 94, 0.12)',
    glow: 'shadow-[0_0_0_1px_rgba(244,63,94,0.08),0_8px_30px_rgba(244,63,94,0.08)]',
  },
  blue: {
    border: 'rgba(56, 189, 248, 0.28)',
    text: '#38bdf8',
    iconBg: 'rgba(56, 189, 248, 0.12)',
    glow: 'shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_8px_30px_rgba(56,189,248,0.08)]',
  },
} as const;

const StatCard = memo(
  ({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) => {
    const c = colorMap[color] || colorMap.green;

    return (
      <div
        className={`group relative overflow-hidden rounded-2xl border bg-slate-900/70 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900 ${c.glow}`}
        role="region"
        aria-label={title}
        style={{ borderColor: c.border }}
      >
        {/* soft background glow */}
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: c.text }}
        />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              {title}
            </p>

            <p
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: c.text }}
            >
              {value}
            </p>

            {subtitle && (
              <p className="mt-1 text-xs font-medium text-white">
                {subtitle}
              </p>
            )}
          </div>

          <div
            className="rounded-xl border p-3 transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: c.iconBg, borderColor: c.border }}
          >
            <Icon size={18} style={{ color: c.text }} aria-hidden="true" />
          </div>
        </div>

        {trend && (
          <div className="relative z-10 mt-4 flex items-center gap-2 border-t border-white/5 pt-3">
            <div
              className={`rounded-md px-2 py-1 text-[10px] font-bold ${
                trend.value >= 0
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-rose-500/10 text-rose-400'
              }`}
            >
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>

            <span className="text-[11px] text-white">{trend.label}</span>
          </div>
        )}
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';

export default StatCard;