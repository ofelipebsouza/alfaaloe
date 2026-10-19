/// <reference types="astro/client" />

// Keep this fallback in sync with astro.config.mjs and public/robots.txt.
const siteUrl = (import.meta.env?.PUBLIC_SITE_URL || 'https://alfaaloe.vercel.app').replace(/\/+$/, '');

export const SITE = {
  name: 'Alfa Aloe',
  url: siteUrl,
  favicon: '/icon.svg',
  locale: 'pt_BR',
  language: 'pt-BR',
  author: 'Alfa Aloe',
} as const;

export const BUSINESS = {
  name: 'Alfa Aloe',
  description:
    'Catálogo de produtos Forever Living com atendimento independente pelo WhatsApp para consultar opções, preços e disponibilidade.',
  telephone: '+5513996432357',
  whatsapp: '5513996432357',
} as const;

export const DEFAULT_SEO = {
  defaultTitle: 'Alfa Aloe | Catálogo de produtos Forever Living',
  defaultDescription: BUSINESS.description,
  keywords: ['Alfa Aloe', 'Forever Living', 'catálogo Forever', 'aloe vera', 'produtos Forever Living'],
} as const;

/** Internal pages always use the configured site, without query or hash variants. */
export function getCanonicalUrl(value: string = '/') {
  const { pathname } = new URL(value, `${SITE.url}/`);
  const lastSegment = pathname.split('/').pop() || '';
  const canonicalPath = pathname.endsWith('/') || lastSegment.includes('.') ? pathname : `${pathname}/`;
  return new URL(canonicalPath, `${SITE.url}/`).href;
}
