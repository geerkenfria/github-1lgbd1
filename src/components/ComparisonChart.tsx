import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts-gl';
import { Company, Metric, CompanyData } from '../types';
import { getChartColors } from '../utils/chartUtils';
import { processChartData } from '../utils/dataUtils';

interface ComparisonChartProps {
  companies: Company[];
  metrics: Metric[];
  data: CompanyData[];
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
  companies,
  metrics,
  data,
}) => {
  const selectedCompanies = companies.filter(c => c.selected);
  const selectedMetrics = metrics.filter(m => m.selected);
  const colors = getChartColors();

  const option = useMemo(() => {
    // Si no hay métricas o empresas seleccionadas, mostrar un gráfico vacío
    if (selectedMetrics.length === 0 || selectedCompanies.length === 0) {
      return {
        radar: {
          indicator: metrics.map(metric => ({
            name: metric.name,
            max: 100
          })),
          shape: 'circle',
          splitNumber: 5,
          center: ['50%', '55%'],
          radius: '60%',
          name: {
            textStyle: {
              color: '#fff'
            }
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)'],
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          }
        },
        series: []
      };
    }

    return {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (!params.value) return '';
          const values = params.value;
          let result = `${params.name}<br/>`;
          selectedMetrics.forEach((metric, index) => {
            result += `${metric.name}: ${values[index]}%<br/>`;
          });
          return result;
        }
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      radar: {
        indicator: selectedMetrics.map(metric => ({
          name: metric.name,
          max: 100
        })),
        shape: 'circle',
        splitNumber: 5,
        center: ['50%', '55%'],
        radius: '60%',
        name: {
          textStyle: {
            color: '#fff'
          }
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)'],
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 10
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        }
      },
      series: [{
        type: 'radar',
        data: selectedCompanies.map((company, index) => {
          const companyData = data.find(d => d.Empresa === company.name);
          return {
            name: company.name,
            value: processChartData(selectedMetrics, companyData),
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: colors[index]
            },
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                {
                  color: 'rgba(0, 0, 0, 0)',
                  offset: 0
                },
                {
                  color: colors[index],
                  offset: 0.8
                }
              ]),
              opacity: 0.5
            },
            itemStyle: {
              color: colors[index]
            }
          };
        })
      }]
    };
  }, [selectedCompanies, selectedMetrics, data, colors, metrics]);

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl">
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

export default ComparisonChart;