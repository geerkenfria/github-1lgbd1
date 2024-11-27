import React from 'react';
import { Company, Metric } from '../types';
import { BarChartIcon, TableIcon, ListIcon, CheckSquare, Square } from 'lucide-react';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';

interface ControlsProps {
  companies: Company[];
  metrics: Metric[];
  onCompanyChange: (index: number) => void;
  onMetricChange: (index: number) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onUpdateChart: () => void;
  layout?: 'vertical' | 'horizontal';
}

export const Controls: React.FC<ControlsProps> = ({
  companies,
  metrics,
  onCompanyChange,
  onMetricChange,
  onSelectAll,
  onClearAll,
  layout = 'horizontal'
}) => {
  const containerClass = layout === 'vertical' 
    ? 'space-y-6'
    : 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-8';

  return (
    <div className={containerClass}>
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <ListIcon className="w-5 h-5 text-blue-600" />
          Empresas
        </h3>
        <div className="space-y-0.5">
          {companies.map((company, index) => (
            <Checkbox
              key={company.name}
              label={company.name}
              checked={company.selected}
              onChange={() => onCompanyChange(index)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <TableIcon className="w-5 h-5 text-blue-600" />
          Métricas
        </h3>
        <div className="space-y-0.5">
          {metrics.map((metric, index) => (
            <Checkbox
              key={metric.name}
              label={metric.name}
              checked={metric.selected}
              onChange={() => onMetricChange(index)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <BarChartIcon className="w-5 h-5 text-blue-600" />
          Acciones
        </h3>
        <div className="space-y-2">
          <Button
            onClick={onSelectAll}
            fullWidth
            icon={<CheckSquare className="w-4 h-4" />}
          >
            Seleccionar Todo
          </Button>
          <Button
            onClick={onClearAll}
            fullWidth
            variant="outline"
            icon={<Square className="w-4 h-4" />}
          >
            Limpiar Todo
          </Button>
        </div>
      </div>
    </div>
  );
};