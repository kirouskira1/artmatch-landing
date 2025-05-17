import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Artmatch',
        short_name: 'Artmatch',
        description: 'Conexão entre Artistas e Editais',
        theme_color: '#6a3ea1',
        icons: [
          {
            src: '/images/artmatch-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/artmatch-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
});
