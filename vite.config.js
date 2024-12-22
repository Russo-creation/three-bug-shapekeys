import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || './',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      'three/addons': 'three/examples/jsm',
      'three/tsl': 'three/webgpu',
      three: 'three/webgpu',
    },
  },
  plugins: [
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
});
