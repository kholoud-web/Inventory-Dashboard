import { memo, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { inventoryData } from '../../Data';
import type { InventoryItem, ItemStatus } from '../../Types';

import InventoryToolbar from './InventoryToolbar';
import InventorySummary from './InventorySummary';
import InventoryTable from './InventoryTable';
import InventoryPagination from './InventoryPagination';

export type SortKey = keyof Pick<InventoryItem, 'name' | 'quantity' | 'price' | 'category'>;
export type SortDir = 'asc' | 'desc';

const Inventory = memo(() => {
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<ItemStatus | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);

  const pageSize = 8;

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(inventoryData.map((i) => i.category)))],
    []
  );

  const filtered = useMemo(() => {
    let data = [...inventoryData];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.sku.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      data = data.filter((i) => i.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      data = data.filter((i) => i.status === statusFilter);
    }

    data.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];

      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }

      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv), 'ar')
        : String(bv).localeCompare(String(av), 'ar');
    });

    return data;
  }, [search, categoryFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginated = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
      setPage(1);
    },
    [sortKey]
  );

  return (
    <div className="space-y-5 animate-fade-in px-3">
      <InventoryToolbar
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categories={categories}
        onResetPage={() => setPage(1)}
      />

      <InventorySummary
        currentCount={paginated.length}
        totalCount={filtered.length}
      />

      <InventoryTable
        items={paginated}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
      />

      <InventoryPagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        onPageChange={setPage}
      />
    </div>
  );
});

Inventory.displayName = 'Inventory';
export default Inventory;