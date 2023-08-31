import {defineConfig} from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import reactRefresh from '@vitejs/plugin-react';
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
});
