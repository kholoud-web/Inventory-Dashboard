import { Search, Plus, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ItemStatus } from '../../Types';

interface InventoryToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  statusFilter: ItemStatus | 'all';
  setStatusFilter: (value: ItemStatus | 'all') => void;
  categories: string[];
  onResetPage: () => void;
}

const InventoryToolbar = ({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  categories,
  onResetPage,
}: InventoryToolbarProps) => {
  const { t } = useTranslation();

  const inputClass =
    'rounded-xl px-4 py-3 text-sm bg-slate-950/50 border border-slate-800/70 text-slate-100 placeholder-slate-500 outline-none';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className={`flex flex-1 min-w-56 items-center gap-2 ${inputClass}`} role="search">
        <Search size={16} className="text-slate-400 flex-shrink-0" />
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onResetPage();
          }}
          placeholder={t('inventory.search')}
          className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none text-right"
          aria-label={t('common.search')}
        />
      </div>

      <select
        value={categoryFilter}
        onChange={(e) => {
          setCategoryFilter(e.target.value);
          onResetPage();
        }}
        className={inputClass}
        aria-label={t('inventory.category')}
      >
        {categories.map((c) => (
          <option key={c} value={c} className="bg-slate-950 text-slate-100">
            {c === 'all' ? t('categories.all') : c}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => {
          setStatusFilter(e.target.value as ItemStatus | 'all');
          onResetPage();
        }}
        className={inputClass}
        aria-label={t('inventory.status')}
      >
        <option value="all" className="bg-slate-950 text-slate-100">جميع الحالات</option>
        <option value="inStock" className="bg-slate-950 text-slate-100">{t('status.inStock')}</option>
        <option value="lowStock" className="bg-slate-950 text-slate-100">{t('status.lowStock')}</option>
        <option value="outOfStock" className="bg-slate-950 text-slate-100">{t('status.outOfStock')}</option>
      </select>

      <div className="flex items-center gap-2 mr-auto">
        <button className="rounded-xl px-4 py-3 text-sm text-slate-300 hover:text-slate-100 flex items-center gap-2 transition-all bg-slate-950/40 border border-slate-800/70 hover:bg-slate-900">
          <Download size={15} />
          <span className="hidden sm:inline">{t('inventory.export')}</span>
        </button>

        <button
          className="rounded-xl px-4 py-3 text-sm text-white flex items-center gap-2 transition-all hover:opacity-95 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0f766e, #0891b2)' }}
        >
          <Plus size={15} />
          <span className="hidden sm:inline">{t('inventory.addItem')}</span>
        </button>
      </div>
    </div>
  );
};

export default InventoryToolbar;