import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { ScriptTarget, transpileModule } from 'typescript';

// Exercise the actual client script without introducing a DOM/browser package.
// These deliberately small doubles cover observer/lifecycle behavior; visual
// layout, browser history, and native focus behavior still need browser QA.
const component = readFileSync(new URL('../src/components/MotionEnhancer.astro', import.meta.url), 'utf8');
const script = component.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'MotionEnhancer must contain its client script');
const compiledScript = transpileModule(script, { compilerOptions: { target: ScriptTarget.ES2022 } }).outputText;

type MockEvent = { target?: MockElement; detail?: { reset: boolean } };
type Listener = (event: MockEvent) => void;

class MockEventTarget {
  listeners = new Map<string, Set<Listener>>();
  addEventListener(name: string, callback: Listener) {
    if (!this.listeners.has(name)) this.listeners.set(name, new Set());
    this.listeners.get(name)!.add(callback);
  }
  removeEventListener(name: string, callback: Listener) {
    this.listeners.get(name)?.delete(callback);
  }
  emit(name: string, event: MockEvent = {}) {
    for (const callback of this.listeners.get(name) || []) callback(event);
  }
}

class MockAnimation extends MockEventTarget {
  constructor(public element: MockElement, public keyframes: Keyframe[], public options: KeyframeAnimationOptions) { super(); }
  cancel() { this.element.animations.delete(this); }
  finish() { this.cancel(); this.emit('finish'); }
}

class MockElement extends MockEventTarget {
  children: MockElement[] = [];
  parent: MockElement | null = null;
  activeElement: MockElement | null = null;
  isConnected = true;
  position = 'static';
  animations = new Set<MockAnimation>();
  constructor(public classes: string[] = [], public reveal = false) { super(); }
  append(child: MockElement) { this.children.push(child); child.parent = this; return child; }
  matches(selectors: string): boolean {
    return selectors.split(',').some(raw => {
      const selector = raw.trim();
      return selector === '*' || (selector === '[data-reveal]' && this.reveal)
        || (selector.startsWith('.') && !selector.includes(' ') && this.classes.includes(selector.slice(1)));
    });
  }
  querySelectorAll(selectors: string): MockElement[] {
    return this.children.flatMap(child => [...(child.matches(selectors) ? [child] : []), ...child.querySelectorAll(selectors)]);
  }
  querySelector(selectors: string): MockElement | null { return this.querySelectorAll(selectors)[0] || null; }
  closest(selector: string): MockElement | null { return this.matches(selector) ? this : this.parent?.closest(selector) || null; }
  contains(target: MockElement): boolean { return this === target || this.children.some(child => child.contains(target)); }
  animate(keyframes: Keyframe[], options: KeyframeAnimationOptions) {
    const animation = new MockAnimation(this, keyframes, options);
    this.animations.add(animation);
    return animation;
  }
}

function createFixture(reducedMotion = false) {
  const observers: MockIntersectionObserver[] = [];
  const mutationObservers: MockMutationObserver[] = [];
  class MockIntersectionObserver {
    observed = new Set<MockElement>();
    constructor(public callback: (entries: { target: MockElement; isIntersecting: boolean }[]) => void) { observers.push(this); }
    observe(element: MockElement) { this.observed.add(element); }
    unobserve(element: MockElement) { this.observed.delete(element); }
    disconnect() { this.observed.clear(); }
    enter(...elements: MockElement[]) {
      this.callback(elements.filter(element => this.observed.has(element)).map(target => ({ target, isIntersecting: true })));
    }
  }
  class MockMutationObserver {
    closed = false;
    constructor(public callback: (records: { addedNodes: MockElement[] }[]) => void) { mutationObservers.push(this); }
    observe() {}
    disconnect() { this.closed = true; }
    add(element: MockElement) { this.callback([{ addedNodes: [element] }]); }
    remove() { this.callback([{ addedNodes: [] }]); }
  }

  const document = new MockElement();
  document.activeElement = document;
  const site = document.append(new MockElement(['aa-site']));
  const card = site.append(new MockElement(['aa-product-card'], true));
  const link = card.append(new MockElement());
  const offscreen = site.append(new MockElement(['aa-product-card'], true));
  const fixedWrapper = site.append(new MockElement([], true));
  fixedWrapper.append(new MockElement()).position = 'fixed';
  const stickyWrapper = site.append(new MockElement([], true));
  stickyWrapper.append(new MockElement()).position = 'sticky';
  const nested = site.append(new MockElement([], true));
  const nestedChild = nested.append(new MockElement([], true));
  const preference = Object.assign(new MockEventTarget(), { matches: reducedMotion });

  runInNewContext(compiledScript, {
    document,
    window: { IntersectionObserver: MockIntersectionObserver, matchMedia: () => preference },
    IntersectionObserver: MockIntersectionObserver,
    MutationObserver: MockMutationObserver,
    Element: MockElement,
    HTMLElement: MockElement,
    getComputedStyle: (element: MockElement) => ({ position: element.position }),
  });
  return { document, site, card, link, offscreen, fixedWrapper, stickyWrapper, nested, nestedChild, preference, observers, mutationObservers, observer: observers[0], mutations: mutationObservers[0] };
}

test('reveals only intersecting content, with a visible starting opacity', () => {
  const { observer, card, offscreen } = createFixture();
  assert.equal(card.animations.size, 0, 'observing must not alter the initial presentation');
  assert.equal(offscreen.animations.size, 0);
  observer.enter(card);
  assert.equal(card.animations.size, 1);
  assert.equal(offscreen.animations.size, 0, 'offscreen focusable content must stay untouched');
  const animation = [...card.animations][0];
  assert.ok(Number(animation.keyframes[0].opacity) > 0);
  assert.equal(animation.options.fill, 'none', 'completed animations must not retain transforms');
  animation.finish();
  observer.enter(card);
  assert.equal(card.animations.size, 0, 'ordinary scrolling must not replay a completed reveal');
});

test('does not animate nested reveal wrappers or fixed/sticky containing blocks', () => {
  const { observer, fixedWrapper, stickyWrapper, nested, nestedChild } = createFixture();
  assert.ok(!observer.observed.has(nested));
  assert.ok(observer.observed.has(nestedChild));
  observer.enter(fixedWrapper, stickyWrapper);
  assert.equal(fixedWrapper.animations.size, 0);
  assert.equal(stickyWrapper.animations.size, 0);
});

test('focus and pointer interaction cancel gestures immediately', () => {
  for (const interaction of ['focusin', 'pointerdown']) {
    const { observer, card, link, document } = createFixture();
    observer.enter(card);
    assert.equal(card.animations.size, 1);
    document.emit(interaction, { target: link });
    assert.equal(card.animations.size, 0, interaction);
  }
  const { observer, offscreen, document } = createFixture();
  document.emit('focusin', { target: offscreen });
  observer.enter(offscreen);
  assert.equal(offscreen.animations.size, 0, 'focusing pending content cancels its future reveal');
});

test('replays catalog filter changes without replaying existing cards on load-more', () => {
  const { observer, card, site, document } = createFixture();
  observer.enter(card);
  [...card.animations][0].finish();
  document.emit('aa:catalog-update', { target: site, detail: { reset: false } });
  observer.enter(card);
  assert.equal(card.animations.size, 0);
  for (let count = 0; count < 3; count++) {
    document.emit('aa:catalog-update', { target: site, detail: { reset: true } });
    observer.enter(card);
    assert.equal(card.animations.size, 1);
    [...card.animations][0].finish();
  }
});

test('does not move a focused card on filter updates', () => {
  const { observer, card, link, site, document } = createFixture();
  document.activeElement = link;
  document.emit('aa:catalog-update', { target: site, detail: { reset: true } });
  observer.enter(card);
  assert.equal(card.animations.size, 0);
});

test('honors initial and live reduced-motion preferences for current and new content', () => {
  const initiallyReduced = createFixture(true);
  assert.equal(initiallyReduced.observer.observed.size, 0);
  assert.equal(initiallyReduced.card.animations.size, 0);

  const { observer, card, site, preference, mutations } = createFixture();
  observer.enter(card);
  preference.matches = true;
  preference.emit('change');
  assert.equal(card.animations.size, 0);
  assert.equal(observer.observed.size, 0);
  const reducedCard = site.append(new MockElement(['aa-product-card'], true));
  mutations.add(reducedCard);
  assert.equal(observer.observed.size, 0);
  assert.equal(reducedCard.animations.size, 0);

  preference.matches = false;
  preference.emit('change');
  const newCard = site.append(new MockElement(['aa-product-card'], true));
  mutations.add(newCard);
  observer.enter(newCard);
  assert.equal(newCard.animations.size, 1);
});

test('cleans up removed cards, observers, animations, and listeners during navigation', () => {
  const { observer, card, offscreen, mutations, document, preference, observers } = createFixture();
  observer.enter(card);
  card.isConnected = false;
  offscreen.isConnected = false;
  mutations.remove();
  assert.equal(card.animations.size, 0);
  assert.ok(!observer.observed.has(offscreen));

  document.emit('astro:before-swap');
  assert.equal(observer.observed.size, 0);
  assert.equal(mutations.closed, true);
  for (const event of ['focusin', 'pointerdown', 'aa:catalog-update']) assert.equal(document.listeners.get(event)?.size, 0);
  assert.equal(preference.listeners.get('change')?.size, 0);

  document.emit('astro:page-load');
  assert.equal(observers.length, 2);
  for (const event of ['focusin', 'pointerdown', 'aa:catalog-update']) assert.equal(document.listeners.get(event)?.size, 1);
});
