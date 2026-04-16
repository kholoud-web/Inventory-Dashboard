import { useState, lazy, Suspense, useCallback, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import type { NavPage } from '../Types';

const Dashboard = lazy(() => import('../Pages/Dashboard'));
const Inventory = lazy(() => import('../Pages/inventory/Inventory'));
const Reports = lazy(() => import('../Pages/reports/Reports'));
const Alerts = lazy(() => import('../Pages/alerts/Alerts'));
const Suppliers = lazy(() => import('../Pages/Suppliers'));
const Settings = lazy(() => import('../Pages/Setting'));

const PageLoader = () => (
  <div className="flex items-center justify-center h-48" role="status" aria-label="جارٍ التحميل">
    <div className="flex gap-2">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ background: '#4ade80', animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

const pageMap: Record<NavPage, ReactElement> = {
  dashboard: <Dashboard />,
  inventory: <Inventory />,
  reports:   <Reports />,
  alerts:    <Alerts />,
  suppliers: <Suppliers />,
  settings:  <Settings />,
};

export default function DashboardLayout() {
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState<NavPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = useCallback((page: NavPage) => {
    setActivePage(page);
    setSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);
  const closeSidebar  = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="bg-mesh min-h-screen" dir="rtl" lang="ar">
      {/* Skip-to-content for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-green-600 focus:text-white"
      >
        الانتقال إلى المحتوى الرئيسي
      </a>

      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <div className="lg:pr-64 min-h-screen flex flex-col">
        <Header activePage={activePage} onMenuToggle={toggleSidebar} />

        <main
          id="main-content"
          role="main"
          aria-label={t(`nav.${activePage}`)}
          className="flex-1 p-4 sm:p-6"
        >
          <Suspense fallback={<PageLoader />}>
            {pageMap[activePage]}
          </Suspense>
        </main>

        <footer
          role="contentinfo"
          className="px-6 py-3 text-center border-t border-green-900/20"
        >
          <p className="text-xs text-green-900">
            مستودع برو © {new Date().getFullYear()} — نظام إدارة المخزون
          </p>
        </footer>
      </div>
    </div>
  );
}