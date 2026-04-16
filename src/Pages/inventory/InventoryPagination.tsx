import { useTranslation } from 'react-i18next';

interface InventoryPaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}

const InventoryPagination = ({
  page,
  totalPages,
  onPrev,
  onNext,
  onPageChange,
}: InventoryPaginationProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between px-4 py-3 border border-slate-800/70 rounded-2xl bg-slate-900/40">
      <p className="text-xs text-slate-500">
        صفحة {page} من {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={page === 1}
          className="px-3 py-1.5 text-xs rounded-lg border border-slate-800/70 bg-slate-950/40 disabled:opacity-30 text-slate-300 hover:bg-slate-900 transition-all"
          aria-label={t('table.prev')}
        >
          {t('table.prev')}
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className="w-8 h-8 rounded-lg text-xs transition-all border"
            aria-label={`صفحة ${p}`}
            aria-current={page === p ? 'page' : undefined}
            style={
              page === p
                ? {
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: 'white',
                    borderColor: 'linear-gradient(135deg, #059669, #10b981)',
                  }
                : {
                    color: '#94a3b8',
                    borderColor: 'rgba(51,65,85,0.8)',
                    background: 'rgba(2,6,23,0.35)',
                  }
            }
          >
            {p}
          </button>
        ))}

        <button
          onClick={onNext}
          disabled={page === totalPages}
          className="px-3 py-1.5 text-xs rounded-lg border border-slate-800/70 bg-slate-950/40 disabled:opacity-30 text-slate-300 hover:bg-slate-900 transition-all"
          aria-label={t('table.next')}
        >
          {t('table.next')}
        </button>
      </div>
    </div>
  );
};

export default InventoryPagination;