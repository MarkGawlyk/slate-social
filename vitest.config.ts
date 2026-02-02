/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    // Vitest configuration options
    environment: 'happy-dom',
    // Exclude Playwright e2e tests from Vitest
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
  },
} as any);
