const ReportsTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl p-3 text-sm bg-slate-950/95 border border-slate-800 shadow-2xl">
        <p className="text-slate-100 font-medium mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }} className="text-xs">
            {entry.name}:{' '}
            {typeof entry.value === 'number'
              ? entry.value.toLocaleString('ar')
              : entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default ReportsTooltip;