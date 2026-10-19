import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import BrandMark from '../src/components/BrandMark';
import { BRAND, COLOR_TOKENS, SPACE_TOKENS } from '../src/lib/brand';
import { getCanonicalUrl } from '../src/lib/seo-config';
import { WHATSAPP_NUMBER } from '../src/lib/utils';

const page = (route: string) => fs.readFileSync(`dist/${route}/index.html`, 'utf8');

test('brand pages render semantic, canonical documents with valid internal links', () => {
  for (const route of ['styleguide', 'branding', 'links']) {
    const html = page(route);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, route);
    assert.ok(html.includes(getCanonicalUrl(`/${route}`)), route);
    assert.ok(html.includes('id="main"'), route);
    assert.ok(!/Seu Nome Aqui|href="#"|aggregateRating|schema.org\/InStock/.test(html), route);
    for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[^"\s]*)"/g)) {
      const local = path.join('dist', decodeURIComponent(match[1]));
      assert.ok(fs.existsSync(local) || fs.existsSync(path.join(local, 'index.html')), `Missing ${match[1]}`);
    }
  }
  assert.ok(page('styleguides').includes('/styleguide/'));
});

test('styleguide documents the exact approved color and spacing tokens', () => {
  const css = fs.readFileSync('src/styles/tokens.css', 'utf8');
  const html = page('styleguide');
  assert.deepEqual(COLOR_TOKENS.map(c=>c.hex), ['#20372a','#8fcf65','#eff4e9','#fdfdf9','#68736a','#dfe6dc']);
  for (const color of COLOR_TOKENS) {
    assert.ok(css.includes(`${color.token}: ${color.hex};`));
    assert.ok(html.includes(color.token));
    assert.ok(html.toLowerCase().includes(color.hex));
  }
  for (const spacing of SPACE_TOKENS) assert.ok(css.includes(`--aa-space-${spacing}: ${spacing}px;`));
  assert.ok(html.includes('Montserrat') && html.includes('Inter'));
  assert.ok(html.includes('disabled'));
  assert.ok(html.includes('aria-pressed="true"'));
});

test('biolink contains only verified destinations and no data-collection form', () => {
  const html = page('links');
  assert.ok(!/<form\b|type="email"|instagram\.com|mailto:|<img[^>]+unsplash\.com/.test(html));
  let whatsappLinks = 0;
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (href.startsWith('#')) {
      assert.ok(href.length > 1 && html.includes(`id="${href.slice(1)}"`));
    } else if (href.startsWith('/')) {
      assert.ok(/^\/(?:$|catalogo(?:[/?#]|$)|privacidade(?:[/?#]|$)|links(?:[/?#]|$))/.test(href), href);
    } else {
      const url = new URL(href);
      assert.equal(url.hostname, 'api.whatsapp.com');
      assert.equal(url.protocol, 'https:');
      assert.equal(url.searchParams.get('phone'), WHATSAPP_NUMBER);
      assert.ok((url.searchParams.get('text') || '').length > 10);
      whatsappLinks++;
    }
  }
  assert.ok(whatsappLinks > 0);
});

test('official logo can replace the provisional mark from one configuration', () => {
  const original = BRAND.logo;
  try {
    assert.ok(renderToStaticMarkup(React.createElement(BrandMark)).includes('aa-logo-icon'));
    BRAND.logo = { src:'/brand/approved-logo.svg', alt:'Alfa Aloe', width:200, height:60 };
    const html = renderToStaticMarkup(React.createElement(BrandMark));
    assert.ok(html.includes('src="/brand/approved-logo.svg"'));
    assert.ok(html.includes('alt="Alfa Aloe"'));
    assert.ok(!html.includes('aa-logo-icon'));
  } finally { BRAND.logo = original; }
});

test('motion enhancement is optional and responds to reduced-motion preferences', () => {
  const source = fs.readFileSync('src/components/MotionEnhancer.astro', 'utf8');
  const css = fs.readFileSync('src/styles/motion.css', 'utf8');
  assert.ok(source.includes('prefers-reduced-motion'));
  assert.ok(source.includes('IntersectionObserver'));
  assert.ok(source.includes('focusin'));
  assert.ok(source.includes('cancel'));
  assert.ok(css.includes('prefers-reduced-motion'));
  assert.ok(!/data-reveal[^}]*opacity\s*:\s*0\s*[;}]/s.test(css));
});
