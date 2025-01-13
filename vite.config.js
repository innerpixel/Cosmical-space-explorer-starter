import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/pwa-Explorer-onboarding/' : '/',
  server: {
    port: 3000,
    strictPort: true,
    host: true, // Listen on all network interfaces
    https: false,
    cors: true,
    open: true // Auto-open browser
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Cosmical Space Explorer',
        short_name: 'Space Explorer',
        description: 'A modern Progressive Web App for space exploration',
        theme_color: '#4F46E5',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/pwa-Explorer-onboarding/',
        scope: '/pwa-Explorer-onboarding/',
        categories: ['productivity', 'utilities'],
        icons: [
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-192x192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshots/desktop-1.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Desktop View - Home'
          },
          {
            src: 'screenshots/desktop-2.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Desktop View - Features'
          },
          {
            src: 'screenshots/mobile-1.png',
            sizes: '750x1334',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Mobile View - Home'
          },
          {
            src: 'screenshots/mobile-2.png',
            sizes: '750x1334',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Mobile View - Features'
          }
        ],
        shortcuts: [
          {
            name: 'Home',
            url: '/',
            icons: [{ src: 'icons/dashboard-96x96.png', sizes: '96x96', type: 'image/png' }]
          },
          {
            name: 'Profile',
            url: '/profile',
            icons: [{ src: 'icons/profile-96x96.png', sizes: '96x96', type: 'image/png' }]
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
        inlineWorkboxRuntime: true,
        globPatterns: [
          '**/*.{js,css,html}'
        ],
        globIgnores: [
          '**/node_modules/**/*',
          'sw.js',
          'workbox-*.js'
        ],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      }
    })
  ]
})
