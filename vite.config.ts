
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  define: {
    // Garante que referências a process.env no código de bibliotecas não quebrem
    'process.env': {}
  }
});
