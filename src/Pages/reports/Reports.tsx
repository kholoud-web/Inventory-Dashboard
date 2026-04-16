import { memo, useState } from 'react';
import { monthlyData, categoryStats, inventoryData } from '../../Data';

import ReportsHeader from './ReportsHeader';
import ReportsKpiCards from './ReportsKpiCards';
import IncomingOutgoingChart from './IncomingOutgoingChart';
import InventoryValueTrendChart from './InventoryValueTrendChart';
import CategoryValueChart from './CategoryValueChart';
import TopItemsValueList from './TopItemsValueList';

type Period = 'week' | 'month' | 'quarter' | 'year';

const Reports = memo(() => {
  const [period, setPeriod] = useState<Period>('month');

  const totalIn = monthlyData.reduce((s, d) => s + d.incoming, 0);
  const totalOut = monthlyData.reduce((s, d) => s + d.outgoing, 0);
  const totalValue = monthlyData.reduce((s, d) => s + d.value, 0);

  const valueData = monthlyData.map((d) => ({
    ...d,
    net: d.incoming - d.outgoing,
  }));

  const topItems = [...inventoryData]
    .sort((a, b) => b.price * b.quantity - a.price * a.quantity)
    .slice(0, 5)
    .map((i) => ({
      name: i.name,
      value: i.price * i.quantity,
      quantity: i.quantity,
    }));

  return (
    <div className="space-y-6 animate-fade-in px-4">
      <ReportsHeader period={period} setPeriod={setPeriod} />

      <ReportsKpiCards
        totalIn={totalIn}
        totalOut={totalOut}
        totalValue={totalValue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomingOutgoingChart data={monthlyData} />
        <InventoryValueTrendChart data={valueData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryValueChart data={categoryStats} />
        <TopItemsValueList items={topItems} />
      </div>
    </div>
  );
});

Reports.displayName = 'Reports';
export default Reports;