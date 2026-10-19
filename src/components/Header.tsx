import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import BrandMark from './BrandMark';
import { createWhatsAppLink } from '../lib/utils';

export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="aa-header">
    <a className="aa-skip" href="#main">Pular para o conteúdo</a>
    <div className="aa-container aa-nav">
      <a href="/" className="aa-brand-home" aria-label="Alfa Aloe, início"><BrandMark /></a>
      <nav className="aa-desktop-nav" aria-label="Navegação principal"><a href="/catalogo">Catálogo</a><a href="/#como-funciona">Como comprar</a><a href="/seja-fbo">Seja FBO <ArrowUpRight size={13}/></a></nav>
      <a className="aa-button aa-button-dark aa-nav-cta" href={createWhatsAppLink('Olá! Vim pelo site da Alfa Aloe e quero conhecer os produtos Forever.')} target="_blank" rel="noopener noreferrer">Vamos conversar <ArrowUpRight size={17}/></a>
      <button className="aa-menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav id="mobile-menu" className="aa-mobile-menu" aria-label="Navegação móvel"><a onClick={() => setOpen(false)} href="/catalogo">Catálogo de produtos</a><a onClick={() => setOpen(false)} href="/#como-funciona">Como comprar</a><a onClick={() => setOpen(false)} href="/seja-fbo">Seja FBO</a><a href={createWhatsAppLink('Olá! Quero conhecer os produtos Forever.')} target="_blank" rel="noopener noreferrer">Falar no WhatsApp ↗</a></nav>}
  </header>;
}
