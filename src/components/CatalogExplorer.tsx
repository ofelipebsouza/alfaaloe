import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, PRODUCTS, categoryLabel, normalizeSearch, type Product } from '../lib/catalog';
import { createWhatsAppLink } from '../lib/utils';
import { trackWhatsAppClick } from '../lib/tracking';

export function ProductCard({ product }: { product: Product }) {
  return <article className="aa-product-card" data-product-slug={product.slug} data-reveal>
    <a className={`aa-product-image aa-tone-${product.category}`} href={`/produtos/${product.slug}`} aria-label={`Ver detalhes de ${product.name}`}>
      <span className="aa-product-category">{categoryLabel(product.category)}</span>
      <img src={product.image} alt={product.name} width="500" height="500" loading="lazy" decoding="async"/>
      <span className="aa-product-arrow"><ArrowUpRight size={19}/></span>
    </a>
    <div className="aa-product-info"><h3><a href={`/produtos/${product.slug}`}>{product.name}</a></h3><p>{product.description}</p>
      <div className="aa-product-actions"><a href={createWhatsAppLink(`Olá! Vi o ${product.name} no catálogo da Alfa Aloe e gostaria de consultar valor e disponibilidade.`)} target="_blank" rel="noopener noreferrer" onClick={e => trackWhatsAppClick(e, `catalog_${product.slug}`)}>Tenho interesse <ArrowUpRight size={16}/></a><a className="aa-detail-link" href={`/produtos/${product.slug}`}>Detalhes</a></div>
    </div>
  </article>;
}

export default function CatalogExplorer({ full = false }: { full?: boolean }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('todos');
  const [limit, setLimit] = useState(full ? 12 : 8);
  const catalogRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchHistoryEntry = useRef(false);
  const focusProduct = useRef<string | null>(null);
  const previousFilter = useRef('todos\0');

  useEffect(() => {
    const readFilters = () => {
      const params = new URLSearchParams(window.location.search);
      const selected = params.get('categoria');
      setQuery(params.get('q') || '');
      setCategory(CATEGORIES.some(item => item.id === selected) ? selected! : 'todos');
      setLimit(full ? 12 : 8);
      searchHistoryEntry.current = false;
    };
    readFilters();
    window.addEventListener('popstate', readFilters);
    return () => window.removeEventListener('popstate', readFilters);
  }, [full]);

  const filtered = useMemo(() => PRODUCTS.filter(product => (category === 'todos' || product.category === category) && normalizeSearch(`${product.name} ${product.description} ${categoryLabel(product.category)}`).includes(normalizeSearch(query.trim()))), [query, category]);

  useEffect(() => {
    const filter = `${category}\0${query}`;
    // The enhancer can replay entry gestures without remounting stable cards.
    catalogRef.current?.dispatchEvent(new CustomEvent('aa:catalog-update', {
      bubbles: true,
      detail: { reset: previousFilter.current !== filter },
    }));
    previousFilter.current = filter;
    if (focusProduct.current) {
      catalogRef.current?.querySelector<HTMLAnchorElement>(`[data-product-slug="${focusProduct.current}"] .aa-product-image`)?.focus();
      focusProduct.current = null;
    }
  }, [query, category, limit]);

  const writeFilters = (nextQuery: string, nextCategory: string, replace = false) => {
    const url = new URL(window.location.href);
    if (nextQuery) url.searchParams.set('q', nextQuery);
    else url.searchParams.delete('q');
    if (nextCategory !== 'todos') url.searchParams.set('categoria', nextCategory);
    else url.searchParams.delete('categoria');
    if (url.href !== window.location.href) {
      window.history[replace ? 'replaceState' : 'pushState'](window.history.state, '', url);
    }
  };
  const selectCategory = (id: string) => {
    setCategory(id);
    setLimit(full ? 12 : 8);
    searchHistoryEntry.current = false;
    writeFilters(query, id);
  };
  const changeQuery = (value: string) => {
    setQuery(value);
    setLimit(full ? 12 : 8);
    // One Back step per search session, rather than one for every keystroke.
    writeFilters(value, category, searchHistoryEntry.current);
    searchHistoryEntry.current = true;
  };
  const clearQuery = () => {
    searchRef.current?.focus();
    setQuery('');
    setLimit(full ? 12 : 8);
    searchHistoryEntry.current = false;
    writeFilters('', category);
  };
  const clear = () => {
    searchRef.current?.focus();
    setQuery('');
    setCategory('todos');
    setLimit(full ? 12 : 8);
    searchHistoryEntry.current = false;
    writeFilters('', 'todos');
  };

  return <section ref={catalogRef} className="aa-catalog aa-container" id="produtos" aria-labelledby="catalog-title">
    <div className="aa-section-heading"><div><span className="aa-eyebrow">O SEU PRÓXIMO CUIDADO COMEÇA AQUI</span><h2 id="catalog-title">Encontre o seu <span>Forever.</span></h2></div><p>Bebidas, beleza e cuidados para fazer parte da sua rotina. Explore e converse com a gente.</p></div>
    <div className="aa-catalog-tools"><div className="aa-filters" role="group" aria-label="Filtrar por categoria"><button type="button" onClick={() => selectCategory('todos')} aria-pressed={category === 'todos'}>Todos <span>{PRODUCTS.length}</span></button>{CATEGORIES.map(item => <button type="button" key={item.id} onClick={() => selectCategory(item.id)} aria-pressed={category === item.id}>{item.label}</button>)}</div><label className="aa-search"><Search size={18}/><span className="aa-sr-only">Buscar produtos</span><input ref={searchRef} value={query} onChange={e => changeQuery(e.target.value)} onBlur={() => { searchHistoryEntry.current = false; }} placeholder="O que você procura?" type="search"/>{query && <button type="button" aria-label="Limpar busca" onClick={clearQuery}><X size={15}/></button>}</label></div>
    <div className="aa-catalog-meta"><p role="status" aria-live="polite" aria-atomic="true">{filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}{category !== 'todos' ? ` em ${categoryLabel(category)}` : ''}</p><span><SlidersHorizontal size={14}/> Valores e disponibilidade sob consulta</span></div>
    {filtered.length ? <div className="aa-product-grid">{filtered.slice(0, limit).map(product => <ProductCard key={product.slug} product={product}/>)}</div> : <div className="aa-empty" data-reveal><Search size={32}/><h3>Nenhum produto por aqui.</h3><p>Tente outro nome ou explore todas as categorias.</p><button type="button" className="aa-button aa-button-dark" onClick={clear}>Limpar filtros</button></div>}
    {filtered.length > limit && <div className="aa-load-more"><button type="button" className="aa-button aa-button-outline" onClick={event => {
      if (event.detail === 0) focusProduct.current = filtered[limit]?.slug || null;
      setLimit(current => current + 12);
    }}>Ver mais produtos <ArrowRight size={18}/></button><span>Mostrando {Math.min(limit, filtered.length)} de {filtered.length}</span></div>}
    {!full && <a href="/catalogo" className="aa-complete-catalog">Explorar o catálogo completo <ArrowUpRight size={16}/></a>}
  </section>;
}
