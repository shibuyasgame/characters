import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/characters/',
  plugins: [vue()],
  resolve: {
    // TODO: explicitly name all extensions and remove this line
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    rollupOptions: {
      index: resolve(__dirname, 'index.html'),
      404: resolve(__dirname, '404.html')
    }
  }
})
