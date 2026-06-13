import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { baseConfig } from './vite.config'
import path from "path"

export default defineConfig(({ mode }) => {
  return {
    ...baseConfig({ mode }),
    plugins: [svgr(), react()],
    ssgOptions: {
      format: 'esm',
      includedRoutes(paths) {
        return paths.filter(p => [
          '/',
          '/release/simple-page/v2/ru',
        ].includes(p))
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.ssg.html'),
        },
      },
    },
  }
});