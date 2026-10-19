import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { writeFile } from 'node:fs/promises';

const SITE_URL = (process.env.PUBLIC_SITE_URL || 'https://alfaaloe.vercel.app').replace(/\/+$/, '');

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
    {
      name: 'canonical-robots',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          await writeFile(
            new URL('robots.txt', dir),
            `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`,
          );
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
  },
  output: 'static',
});
