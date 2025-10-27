import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@context': path.resolve(__dirname, 'src/context'),
      "@components": path.resolve(__dirname, "src/components"),
      "@ui": path.resolve(__dirname, "src/components/ui"),
      "@pages": path.resolve(__dirname, "src/pages")
    }
  }
});
