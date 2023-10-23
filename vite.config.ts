/// <reference types="vitest" />
import reactRefresh from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    reactRefresh(),
    viteTsconfigPaths(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
  },
});
