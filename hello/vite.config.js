import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'three': resolve('./node_modules/three/build/three.module.js')
    }
  }
});
