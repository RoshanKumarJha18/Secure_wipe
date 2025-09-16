import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Changed to 5173 to match the backend's allowed local origin.
    // The proxy is a development-only tool. For production, the frontend
    // will call the full backend URL directly using an environment variable.
    // We can keep it for local development if the frontend calls /api.
    // However, the best practice is to have the frontend use the full URL
    // from an environment variable even in development.
    hmr: {
      overlay: false
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  
});
