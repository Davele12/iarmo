import localFont from 'next/font/local';

export const inter = localFont({
  src: '../assets/fonts/inter-latin-variable.woff2',
  variable: '--font-inter', weight: '400 700', display: 'swap',
  fallback: ['Arial'], adjustFontFallback: 'Arial',
});
export const manrope = localFont({
  src: '../assets/fonts/manrope-latin-variable.woff2',
  variable: '--font-manrope', weight: '400 700', display: 'swap',
  fallback: ['Arial'], adjustFontFallback: 'Arial',
});
