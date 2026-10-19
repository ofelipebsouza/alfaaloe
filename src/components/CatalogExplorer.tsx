import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, PRODUCTS, categoryLabel, normalizeSearch, type Product } from '../lib/catalog';
import { createWhatsAppLink } from '../lib/utils';
import { trackWhatsAppClick } from '../lib/tracking';

export function ProductCard({ product }: { product: Product }) {
  return <article className="aa-product-card">
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
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') || '');
    const selected = params.get('categoria');
    if (selected && CATEGORIES.some(item => item.id === selected)) setCategory(selected);
  }, []);
  const filtered = useMemo(() => PRODUCTS.filter(product => (category === 'todos' || product.category === category) && normalizeSearch(`${product.name} ${product.description} ${categoryLabel(product.category)}`).includes(normalizeSearch(query.trim()))), [query, category]);
  const selectCategory = (id: string) => { setCategory(id); setLimit(full ? 12 : 8); };
  const clear = () => { setQuery(''); setCategory('todos'); setLimit(full ? 12 : 8); };
  return <section className="aa-catalog aa-container" id="produtos" aria-labelledby="catalog-title">
    <div className="aa-section-heading"><div><span className="aa-eyebrow">O SEU PRÓXIMO CUIDADO COMEÇA AQUI</span><h2 id="catalog-title">Encontre o seu <span>Forever.</span></h2></div><p>Bebidas, beleza e cuidados para fazer parte da sua rotina. Explore e converse com a gente.</p></div>
    <div className="aa-catalog-tools"><div className="aa-filters" role="group" aria-label="Filtrar por categoria"><button onClick={() => selectCategory('todos')} aria-pressed={category === 'todos'}>Todos <span>{PRODUCTS.length}</span></button>{CATEGORIES.map(item => <button key={item.id} onClick={() => selectCategory(item.id)} aria-pressed={category === item.id}>{item.label}</button>)}</div><label className="aa-search"><Search size={18}/><span className="aa-sr-only">Buscar produtos</span><input value={query} onChange={e => { setQuery(e.target.value); setLimit(full ? 12 : 8); }} placeholder="O que você procura?" type="search"/>{query && <button aria-label="Limpar busca" onClick={() => setQuery('')}><X size={15}/></button>}</label></div>
    <div className="aa-catalog-meta"><p aria-live="polite">{filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}{category !== 'todos' ? ` em ${categoryLabel(category)}` : ''}</p><span><SlidersHorizontal size={14}/> Valores e disponibilidade sob consulta</span></div>
    {filtered.length ? <div className="aa-product-grid">{filtered.slice(0, limit).map(product => <ProductCard key={product.slug} product={product}/>)}</div> : <div className="aa-empty"><Search size={32}/><h3>Nenhum produto por aqui.</h3><p>Tente outro nome ou explore todas as categorias.</p><button className="aa-button aa-button-dark" onClick={clear}>Limpar filtros</button></div>}
    {filtered.length > limit && <div className="aa-load-more"><button className="aa-button aa-button-outline" onClick={() => setLimit(current => current + 12)}>Ver mais produtos <ArrowRight size={18}/></button><span>Mostrando {Math.min(limit, filtered.length)} de {filtered.length}</span></div>}
    {!full && <a href="/catalogo" className="aa-complete-catalog">Explorar o catálogo completo <ArrowUpRight size={16}/></a>}
  </section>;
}
