import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/teffy-beauty-lab/', // CRÍTICO: El nombre exacto de tu repositorio
  build: {
    outDir: 'docs', // Vite creará la carpeta 'docs' para GitHub Pages
    emptyOutDir: true // Limpia la carpeta antes de cada nuevo build
  }
});
