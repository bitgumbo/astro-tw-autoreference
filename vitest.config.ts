// import path from "node:path";
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    environment: 'node',

    globals: true,

    include: ['tests/**/*.{spec,test,e2e}.ts'],

    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text', 'json', 'html'],
      include: ['src/**/*.ts'],
    },
  },
});
