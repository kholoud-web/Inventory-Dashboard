import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { Alert, AlertSeverity } from '../../Types';

export const severityConfig: Record<
  AlertSeverity,
  {
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    badgeClass: string;
  }
> = {
  critical: {
    icon: AlertCircle,
    color: '#fb7185',
    bg: 'rgba(251,113,133,0.10)',
    border: 'rgba(251,113,133,0.20)',
    badgeClass: 'bg-rose-500/10 text-rose-300 border border-rose-500/20',
  },
  warning: {
    icon: AlertTriangle,
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.10)',
    border: 'rgba(251,191,36,0.20)',
    badgeClass: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
  },
  info: {
    icon: Info,
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.10)',
    border: 'rgba(56,189,248,0.20)',
    badgeClass: 'bg-sky-500/10 text-sky-300 border border-sky-500/20',
  },
};

export const typeLabels: Record<Alert['type'], string> = {
  outOfStock: 'نفاد المخزون',
  lowStock: 'نقص المخزون',
  expiry: 'انتهاء الصلاحية',
  reorder: 'إعادة الطلب',
};