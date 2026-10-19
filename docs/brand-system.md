# Alfa Aloe: brand guide, biolink and motion

## Routes

- `/styleguide/`: live color tokens, typography, spacing, component states, local interaction demos and motion guidance.
- `/styleguides/`: redirect to the singular canonical route.
- `/branding/`: proposed voice, visual usage and identity direction using the current approved palette.
- `/links/`: mobile-first catalog and WhatsApp entry point. No contact collection form, unverified email/social links or stock portrait.

## Replacing the provisional signature

The current leaf-and-wordmark signature is provisional, not a new official logo. All updated surfaces use `src/components/BrandMark.tsx`.

1. Place the owner's approved logo file in `public/brand/`.
2. Set `BRAND.logo` in `src/lib/brand.ts` to `{ src: '/brand/logo.svg', alt: 'Alfa Aloe', width: 200, height: 60 }`, using the asset's actual aspect ratio.
3. Verify the supplied file on both light and dark surfaces (header, footer, branding and biolink). Do not stretch, redraw or automatically recolor it.
4. Update the favicon separately only when the owner supplies an approved icon.

The `null` default deliberately preserves the existing provisional signature. No pending logo upload or back-office interface is implied.

## Design source of truth

- Approved six-color palette and reusable spacing, radius and timing tokens: `src/styles/tokens.css`.
- Display metadata and centralized mark configuration: `src/lib/brand.ts`.
- Styleguide color tests enforce exact CSS/display parity.
- Montserrat remains the heading family; Inter remains the interface/body family. No new font or package was added.

## Motion and interaction

`MotionEnhancer.astro`, included once by `Layout.astro`, progressively enhances visible content with short, finite Web Animations triggered by IntersectionObserver. Content is visible without JavaScript. It does not animate sticky/fixed ancestors, intercept scrolling or postpone clicks.

Keyboard focus and pointer interaction immediately settle the affected element. Changes to `prefers-reduced-motion` cancel running and pending entrances; CSS disables transitions, repeated demos and smooth scroll. `data-reveal` marks optional content units on new pages. Catalog cards retain stable React keys while filter changes can replay entry gestures.

Catalog search/category state is reflected in the URL and restores through Back/Forward. Search typing uses one history entry per session. Keyboard loading of more products focuses the first added product rather than leaving focus on a removed button.

## Verification

Run in order:

```sh
npm ci
npm run lint
npm run build
npm test
```

In a restricted environment, point npm's cache and Astro's configuration directory at writable temporary directories. This does not change application configuration or dependencies.

The tests cover all 28 original products, source/image paths, generated routes and metadata, verified WhatsApp links, new route semantics, palette/spacing parity, a single-point logo replacement, and motion safety contracts. Interactive desktop/narrow-viewport checks complement those static checks.
