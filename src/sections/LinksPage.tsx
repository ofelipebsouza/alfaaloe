import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy, MessageCircle, Share2, ShoppingBag } from 'lucide-react';
import BrandMark from '../components/BrandMark';
import { CATEGORIES, PRODUCTS } from '../lib/catalog';
import { getCanonicalUrl } from '../lib/seo-config';
import { trackWhatsAppClick } from '../lib/tracking';
import { createWhatsAppLink } from '../lib/utils';

const shareUrl = getCanonicalUrl('/links');
const categoryProducts: Record<string, string> = { bebidas: 'aloe-vera-gel', beleza: 'aloe-vera-gelly', 'cuidados-pessoais': 'bright-toothgel', nutricao: 'arctic-sea' };

export default function LinksPage() {
  const [shareStatus, setShareStatus] = useState('');
  const [showShareLink, setShowShareLink] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const gel = PRODUCTS.find((product) => product.slug === 'aloe-vera-gel');
  const peaches = PRODUCTS.find((product) => product.slug === 'aloe-peaches');
  const gelly = PRODUCTS.find((product) => product.slug === 'aloe-vera-gelly');

  async function copyLink() {
    setShowShareLink(true);
    try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setShareStatus('Link copiado. Agora é só compartilhar.'); }
    catch { setCopied(false); setShareStatus('Selecione e copie o endereço abaixo para compartilhar.'); }
  }
  async function sharePage() {
    if (sharing) return;
    setSharing(true); setShareStatus('');
    try {
      if (typeof navigator.share === 'function') {
        try { await navigator.share({ title: 'Alfa Aloe', text: 'Catálogo Forever e atendimento da Alfa Aloe.', url: shareUrl }); return; }
        catch (error) { if (error instanceof Error && error.name === 'AbortError') return; }
      }
      await copyLink();
    } finally { setSharing(false); }
  }
  return (
    <div className="aa-site aa-biolink-page">
      <a className="aa-skip" href="#main">Pular para os links</a>
      <div className="aa-biolink-background" aria-hidden="true"><span /><span /></div>
      <div className="aa-biolink-shell">
        <header className="aa-biolink-topbar"><a href="/" aria-label="Alfa Aloe, início"><BrandMark compact /></a><button type="button" className="aa-biolink-share" onClick={sharePage} disabled={sharing} aria-label="Compartilhar os links da Alfa Aloe"><Share2 size={17} aria-hidden="true" /><span>Compartilhar</span></button></header>
          <div className="aa-biolink-share-feedback"><p role="status" aria-live="polite">{shareStatus}</p>{showShareLink && <div className="aa-biolink-copy"><label className="aa-sr-only" htmlFor="biolink-share-url">Endereço para compartilhar</label><input id="biolink-share-url" value={shareUrl} readOnly onFocus={(event) => event.currentTarget.select()} /><button type="button" onClick={copyLink} aria-label={copied ? 'Copiar link novamente' : 'Copiar link'}>{copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}</button></div>}</div>
        <main id="main">
          <section className="aa-biolink-intro" aria-labelledby="links-title" data-reveal>
            <div className="aa-biolink-art"><span className="aa-biolink-art-ring" aria-hidden="true" /><span className="aa-biolink-art-word" aria-hidden="true">aloe.</span>{peaches && <img className="aa-biolink-product aa-biolink-peaches" src={peaches.image} alt="" width="500" height="500" />}{gel && <img className="aa-biolink-product aa-biolink-gel" src={gel.image} alt="" width="500" height="500" fetchPriority="high" />}{gelly && <img className="aa-biolink-product aa-biolink-gelly" src={gelly.image} alt="" width="500" height="500" />}<span className="aa-biolink-art-caption">PEQUENOS CUIDADOS. MAIS VOCÊ.</span></div>
            <span className="aa-eyebrow">ALFA ALOE · FOREVER FBO INDEPENDENTE</span>
            <h1 id="links-title">Seu próximo cuidado<br /><span>começa aqui.</span></h1>
            <p>Explore, descubra e converse com a gente.<br />Escolha seu caminho.</p>
          </section>
          <nav className="aa-biolink-main-links" aria-label="Links principais" data-reveal>
            <a className="aa-biolink-link aa-biolink-link-primary" href={createWhatsAppLink('Olá! Vim pelo biolink da Alfa Aloe e gostaria de conhecer os produtos Forever.')} target="_blank" rel="noopener noreferrer" onClick={(event) => trackWhatsAppClick(event, 'biolink_whatsapp')}><span className="aa-biolink-link-icon"><MessageCircle size={23} strokeWidth={1.5} aria-hidden="true" /></span><span><strong>Vamos conversar</strong><small>Tire dúvidas e consulte valores no WhatsApp</small></span><ArrowUpRight className="aa-biolink-link-arrow" size={21} aria-hidden="true" /><span className="aa-sr-only"> (abre em uma nova aba)</span></a>
            <a className="aa-biolink-link aa-biolink-link-catalog" href="/catalogo"><span className="aa-biolink-link-icon"><ShoppingBag size={23} strokeWidth={1.5} aria-hidden="true" /></span><span><strong>Conheça o catálogo</strong><small>Produtos Forever para explorar no seu tempo</small></span><ArrowRight className="aa-biolink-link-arrow" size={21} aria-hidden="true" /></a>
          </nav>
          <section className="aa-biolink-categories" aria-labelledby="category-title" data-reveal><div className="aa-biolink-section-heading"><h2 id="category-title">Encontre sua categoria</h2><span>UM CUIDADO DE CADA VEZ</span></div><nav className="aa-biolink-category-grid" aria-label="Categorias de produtos">{CATEGORIES.map((category) => {
            const product = PRODUCTS.find((item) => item.slug === categoryProducts[category.id]);
            return <a className={`aa-biolink-category aa-biolink-category-${category.id}`} key={category.id} href={`/catalogo?categoria=${category.id}`}><span className="aa-biolink-category-label">{category.label}<ArrowUpRight size={16} aria-hidden="true" /></span>{product && <img src={product.image} alt="" width="500" height="500" loading="lazy" />}<span className="aa-biolink-category-caption">Explorar a linha</span></a>;
          })}</nav></section>
          <aside className="aa-biolink-note" data-reveal><span className="aa-biolink-note-icon"><MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" /></span><p>Uma escolha mais consciente.<br /><strong>Um cuidado mais próximo.</strong></p></aside>
        </main>
        <footer className="aa-biolink-footer"><a href="/">Conheça o site Alfa Aloe <ArrowUpRight size={13} aria-hidden="true" /></a><p>Distribuidor independente Forever Living.<br />Valores, disponibilidade e entrega a confirmar no atendimento.</p><div><span>© {new Date().getFullYear()} Alfa Aloe</span><span aria-hidden="true">·</span><a href="/privacidade">Privacidade</a></div></footer>
      </div>
    </div>
  );
}
