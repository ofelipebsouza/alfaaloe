import { ArrowUpRight, Leaf } from 'lucide-react';
import { createWhatsAppLink } from '../lib/utils';
export default function Footer() {
  return <footer className="aa-footer"><div className="aa-container">
    <div className="aa-footer-top"><div><a href="/" className="aa-logo"><span className="aa-logo-icon"><Leaf size={25}/></span><span>alfa<span className="aa-logo-light">aloe</span><small>FOREVER · FBO INDEPENDENTE</small></span></a><p>Uma escolha mais consciente.<br/>Um cuidado mais próximo.</p></div><div><span className="aa-eyebrow">EXPLORE</span><a href="/catalogo">Catálogo Forever</a><a href="/seja-fbo">Conheça a oportunidade FBO</a><a href="/blog">Conteúdos e novidades</a></div><div><span className="aa-eyebrow">VAMOS CONVERSAR</span><a href={createWhatsAppLink('Olá! Gostaria de falar com a Alfa Aloe.')} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={16}/></a><span>+55 (13) 99643-2357</span><a href="/privacidade">Privacidade</a></div></div>
    <div className="aa-footer-bottom"><p>© {new Date().getFullYear()} Alfa Aloe. Distribuidor independente Forever Living.</p><p>Este é um site independente, sem vínculo de representação institucional com a Forever. Imagens e marcas pertencem aos seus respectivos titulares. Informações e disponibilidade devem ser confirmadas no atendimento. Produtos não substituem acompanhamento profissional de saúde.</p></div>
  </div></footer>;
}
