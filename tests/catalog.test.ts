import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS, CATEGORIES, normalizeSearch, categoryLabel } from '../src/lib/catalog';
import { createWhatsAppLink, WHATSAPP_NUMBER } from '../src/lib/utils';
import { getCanonicalUrl } from '../src/lib/seo-config';

test('catalog has 28 distinct, sourced products across four categories', () => {
  assert.equal(PRODUCTS.length, 28);
  assert.equal(new Set(PRODUCTS.map(p => p.slug)).size, 28);
  assert.equal(CATEGORIES.length, 4);
  for (const product of PRODUCTS) {
    assert.match(product.slug, /^[a-z0-9-]+$/);
    assert.ok(CATEGORIES.some(category => category.id === product.category));
    assert.ok(categoryLabel(product.category));
    assert.equal(new URL(product.source).hostname, 'www.foreverliving.com.br');
    assert.ok(fs.statSync(path.join('public', product.image)).size > 1000);
    assert.ok(product.description.length > 20);
    assert.ok(fs.existsSync(`dist/produtos/${product.slug}/index.html`));
  }
});

test('search ignores accents, case and combines name/category text', () => {
  assert.equal(normalizeSearch('NUTRIÇÃO'), 'nutricao');
  assert.equal(normalizeSearch('Própolis'), 'propolis');
  assert.equal(PRODUCTS.filter(p => normalizeSearch(p.name).includes(normalizeSearch('própolis'))).length, 1);
  assert.equal(PRODUCTS.filter(p => p.category === 'bebidas').length, 5);
});

test('lead links use the verified number and preserve the product enquiry', () => {
  assert.equal(WHATSAPP_NUMBER, '5513996432357');
  const message = 'Olá! Quero consultar Aloe Vera Gel + disponibilidade.';
  const url = new URL(createWhatsAppLink(message));
  assert.equal(url.protocol, 'https:');
  assert.equal(url.hostname, 'api.whatsapp.com');
  assert.equal(url.searchParams.get('phone'), WHATSAPP_NUMBER);
  assert.equal(url.searchParams.get('text'), message);
});

test('all catalog/product pages have valid metadata and no fabricated offers', () => {
  for (const route of ['', 'catalogo', ...PRODUCTS.map(p => `produtos/${p.slug}`)]) {
    const html = fs.readFileSync(path.join('dist', route, 'index.html'), 'utf8');
    assert.ok(html.includes('lang="pt-BR"'));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes(getCanonicalUrl(`/${route}`)));
    assert.ok(!html.includes('aggregateRating'));
    assert.ok(!html.includes('schema.org/InStock'));
    for (const match of html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) JSON.parse(match[1]);
    for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[^"\s]*)"/g)) {
      const filePath = path.join('dist', decodeURIComponent(match[1]));
      assert.ok(fs.existsSync(filePath) || fs.existsSync(path.join(filePath, 'index.html')), `Missing local asset or route: ${match[1]}`);
    }
  }
});
