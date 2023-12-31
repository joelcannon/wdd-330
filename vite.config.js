import { resolve } from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  root: 'src/',
  // define: {
  //   'process.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
  // },
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        map: resolve(__dirname, 'src/map/index.html'),
        notice: resolve(__dirname, 'src/notice/index.html'),
        install: resolve(__dirname, 'src/install/index.html'),
        device: resolve(__dirname, 'src/device/index.html'),
        // checkout: resolve(__dirname, "src/checkout/index.html"),
        // product1: resolve(
        //   __dirname,
        //   "src/product_pages/cedar-ridge-rimrock-2.html"
        // ),
        // product2: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),
        // product3: resolve(
        //   __dirname,
        //   "src/product_pages/northface-alpine-3.html"
        // ),
        // product4: resolve(
        //   __dirname,
        //   "src/product_pages/northface-talus-4.html"
        // ),
      },
    },
  },
});
