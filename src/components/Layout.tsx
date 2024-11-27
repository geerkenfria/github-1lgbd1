import React, { useState } from 'react';
import { Menu, X, Settings, HelpCircle, BarChart2 } from 'lucide-react';
import { Company, Metric } from '../types';
import { Controls } from './Controls';

interface LayoutProps {
  children: React.ReactNode;
  companies: Company[];
  metrics: Metric[];
  onCompanyChange: (index: number) => void;
  onMetricChange: (index: number) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  companies,
  metrics,
  onCompanyChange,
  onMetricChange,
  onSelectAll,
  onClearAll,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed z-50 m-4 p-2 rounded-lg bg-white shadow-lg md:hidden"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-blue-600" />
              <h2 className="font-semibold text-gray-800">Análisis Empresarial</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto p-4">
            <Controls
              companies={companies}
              metrics={metrics}
              onCompanyChange={onCompanyChange}
              onMetricChange={onMetricChange}
              onSelectAll={onSelectAll}
              onClearAll={onClearAll}
              onUpdateChart={() => {}}
              layout="vertical"
            />
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <div className="flex justify-around">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-72">
        <main className="p-6">{children}</main>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};