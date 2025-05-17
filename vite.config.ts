import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';
import path from "path";

// https://vitejs.dev/config/
const isProduction = process.env.NODE_ENV === 'production';
const base = isProduction ? '/artmatch-landing/' : '/';

export default defineConfig({
  base,
  server: {
    host: "::",
    port: 8080,
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: !isProduction,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-slot']
        }
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Artmatch',
        short_name: 'Artmatch',
        description: 'Conexão entre Artistas e Editais',
        theme_color: '#6a3ea1',
        icons: [
          {
            src: `${base}images/artmatch-192.svg`,
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: `${base}images/artmatch-512.svg`,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        start_url: base,
        display: 'standalone',
        background_color: '#ffffff',
        scope: base
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
