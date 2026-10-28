/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Listen on all interfaces so Cloud Shell Web Preview can reach the server.
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // Web Preview serves the app from *.cloudshell.dev; Vite blocks unknown hosts by default.
    allowedHosts: ['.cloudshell.dev'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
