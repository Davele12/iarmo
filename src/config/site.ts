export const site = {
  name: 'iarmo',
  url: 'https://iarmo.com',
  locale: 'es_CO',
  language: 'es-CO',
  description: 'Automatizamos procesos, conectamos información y construimos soluciones de datos, software e inteligencia artificial para empresas en Colombia.',
  navigation: [
    { href: '/soluciones', label: 'Soluciones' },
    { href: '/planes', label: 'Acompañamiento' },
    { href: '/casos', label: 'Casos' },
    { href: '/nosotros', label: 'Nosotros' },
  ],
} as const;
export const supportedLocales = ['es'] as const;
export type Locale = typeof supportedLocales[number];
