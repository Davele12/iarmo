export const site = {
  name: 'iarmo',
  tagline: 'Soluciones inteligentes',
  url: 'https://iarmo.com',
  locale: 'es_CO',
  language: 'es-CO',
  description: 'Automatizamos procesos, conectamos información y construimos soluciones de datos, software e inteligencia artificial para empresas en Colombia.',
  navigation: [
    { href: '/#inicio', label: 'Inicio' },
    { href: '/#soluciones', label: 'Soluciones' },
    { href: '/#clientes', label: 'Clientes' },
    { href: '/#planes', label: 'Planes' },
    { href: '/#diagnostico', label: 'Diagnóstico' },
    { href: '/#nosotros', label: 'Nosotros' },
  ],
} as const;
export const supportedLocales = ['es'] as const;
export type Locale = typeof supportedLocales[number];
