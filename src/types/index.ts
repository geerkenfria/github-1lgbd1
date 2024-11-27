export interface Company {
  name: string;
  selected: boolean;
}

export interface Metric {
  name: string;
  selected: boolean;
}

export interface CompanyData {
  Empresa: string;
  Planificación: string;
  'Adaptación Técnica': string;
  Liderazgo: string;
  'Impacto Comercial': string;
  'Eficiencia Operativa': string;
  'Formación y Mentoría': string;
  'Resultados Medibles': string;
  [key: string]: string;
}