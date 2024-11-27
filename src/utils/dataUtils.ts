import { Metric, CompanyData } from '../types';

export const processChartData = (
  metrics: Metric[],
  companyData: CompanyData | undefined
) => {
  if (!companyData) return Array(metrics.length).fill(0);
  
  return metrics.map(metric => {
    const value = companyData[metric.name];
    return value ? parseFloat(value) : 0;
  });
};