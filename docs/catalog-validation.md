# Catalog validation

## Local commands

```
npm ci
npm run build
npm run lint
npm test
```

Tests validate catalog uniqueness, categories, local assets, accent-insensitive search, product-specific WhatsApp links, generated product pages, metadata and local links. The static build currently emits 46 pages, preserving existing blog, links and FBO routes.

## Manual checks

- Desktop and mobile: no horizontal overflow; readable header, hero and product cards.
- Category buttons update results and selected state.
- Search handles names and accented words; empty results can be reset.
- More products reveals the remaining matching products.
- Product details show the matching image, official source and WhatsApp enquiry.
- URL query parameters `q` and `categoria` initialize the catalog filter.
- FAQ expands by keyboard; mobile navigation opens/closes and Escape closes it.
- Lead interest options update the WhatsApp message without submitting a form or storing personal data.
- All new outgoing WhatsApp links use the existing verified business number. Messages are not automatically sent.

## Scope notes

The home and catalog copy was rebuilt using verified product information. Older blog and FBO article content is preserved and is not a new certification or fact-check of those legacy claims. No checkout, CRM, email collection, new analytics provider or production deployment is introduced by this branch.

## Preview browser validation (2026-10-19)

- Vercel preview reached READY; desktop layout checked at 1180 CSS px, with no broken images or document overflow.
- Narrow responsive layout checked at 393 CSS px using browser page zoom; document width stayed within the viewport. This is a responsive CSS check, not a physical-device test.
- Category filtering, accented search, empty-state reset, loading more items, interest-specific WhatsApp text, FAQ expansion, deep-link query filters, detail navigation and mobile menu/Escape all passed.
- No application console errors observed (the browser extension emitted its own unrelated metadata error).
- Replaced plain arrow characters in static detail pages with SVG icons after visual review.
- No enquiry was actually sent during testing.
