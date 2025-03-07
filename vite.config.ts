import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      name: 'Mi Aplicación PWA',
      short_name: 'MiApp',
      description: 'Una aplicación PWA con React y Vite',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      // Cachear todos los recursos estáticos
      globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
      // Estrategia de caching para recursos estáticos
      runtimeCaching: [
        {
          urlPattern: /\.(js|css|html|json)$/, // Cachear JS, CSS, HTML y JSON
          handler: 'StaleWhileRevalidate', // Usar el cache, pero actualizarlo en segundo plano
          options: {
            cacheName: 'static-resources',
            expiration: {
              maxEntries: 50, // Máximo 50 entradas en el cache
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
            },
          },
        },
        {
          urlPattern: /\.(png|jpg|jpeg|svg|gif)$/, // Cachear imágenes
          handler: 'CacheFirst', // Usar el cache primero
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 50, // Máximo 50 entradas en el cache
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
            },
          },
        },
      ],
    },
  }),
  ],
})
