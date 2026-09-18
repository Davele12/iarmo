import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import hooks from 'eslint-plugin-react-hooks';
export default defineConfig([
  { ...js.configs.recommended, files: ['**/*.mjs'], languageOptions: { globals: { process: 'readonly', console: 'readonly', URL: 'readonly' } } },
  ...tseslint.configs.recommended,
  { files: ['**/*.{ts,tsx}'], plugins: { '@next/next': nextPlugin, 'react-hooks': hooks }, rules: { ...nextPlugin.configs.recommended.rules, ...nextPlugin.configs['core-web-vitals'].rules, ...hooks.configs.recommended.rules } },
  globalIgnores(['.next/**', '.tools/**', 'next-env.d.ts', 'playwright-report/**', 'test-results/**']),
]);
