import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts-gl';
import { Company, Metric, CompanyData } from '../types';
import { getChartColors } from '../utils/chartUtils';
import { processChartData } from '../utils/dataUtils';

interface BarChart3DProps {
  companies: Company[];
  metrics: Metric[];
  data: CompanyData[];
}

export const BarChart3D: React.FC<BarChart3DProps> = ({
  companies,
  metrics,
  data,
}) => {
  const selectedCompanies = companies.filter(c => c.selected);
  const selectedMetrics = metrics.filter(m => m.selected);
  const colors = getChartColors();

  const option = useMemo(() => {
    if (selectedMetrics.length === 0 || selectedCompanies.length === 0) {
      return {
        xAxis3D: { type: 'category', data: [] },
        yAxis3D: { type: 'category', data: [] },
        zAxis3D: { type: 'value' },
        series: []
      };
    }

    const series = selectedCompanies.map((company, index) => {
      const companyData = data.find(d => d.Empresa === company.name);
      const values = processChartData(selectedMetrics, companyData);
      
      return values.map((value, metricIndex) => ({
        company: company.name,
        metric: selectedMetrics[metricIndex].name,
        value
      }));
    }).flat();

    return {
      tooltip: {},
      visualMap: {
        max: 100,
        inRange: {
          color: colors
        }
      },
      xAxis3D: {
        type: 'category',
        data: selectedCompanies.map(c => c.name),
        axisLabel: {
          interval: 0,
          rotate: 30
        }
      },
      yAxis3D: {
        type: 'category',
        data: selectedMetrics.map(m => m.name)
      },
      zAxis3D: {
        type: 'value',
        max: 100,
        name: 'Valor (%)'
      },
      grid3D: {
        boxWidth: 100,
        boxHeight: 80,
        boxDepth: 80,
        viewControl: {
          projection: 'perspective',
          autoRotate: true,
          autoRotateSpeed: 10,
          distance: 200
        },
        light: {
          main: {
            intensity: 1.2,
            shadow: true
          },
          ambient: {
            intensity: 0.3
          }
        }
      },
      series: [{
        type: 'bar3D',
        data: series.map(item => [
          item.company,
          item.metric,
          item.value
        ]),
        shading: 'realistic',
        itemStyle: {
          opacity: 0.8
        },
        emphasis: {
          itemStyle: {
            opacity: 1
          }
        },
        label: {
          show: false
        }
      }]
    };
  }, [selectedCompanies, selectedMetrics, data, colors]);

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl mt-8">
      <div className="h-[700px] bg-[rgba(0,0,0,0.3)] backdrop-blur-sm rounded-lg p-4">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
          notMerge={true}
        />
      </div>
    </div>
  );
};

export default BarChart3D;