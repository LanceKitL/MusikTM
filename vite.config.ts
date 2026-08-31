import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      srcDir: './src',
      scope: '/',
      base: '/',
      includeAssets: ['favicon.ico', 'icons/*.png'],
      manifest: {
        name: 'MusikkTM - Worship Team Sync',
        short_name: 'MusikkTM',
        description: 'Worship team management app for schedules, chords, and lyrics',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['client/**/*.{js,css,ico,png,svg,webmanifest}']
      }
    })
  ]
});
