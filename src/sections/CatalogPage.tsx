import { ArrowUpRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CatalogExplorer from '../components/CatalogExplorer';
import CatalogLead from '../components/CatalogLead';
import CatalogFAQ from '../components/CatalogFAQ';
import { createWhatsAppLink } from '../lib/utils';
export default function CatalogPage() { return <div className="aa-site"><Header/><main id="main"><section className="aa-catalog-intro"><div className="aa-container"><div className="aa-breadcrumb"><a href="/">Início</a><span>/</span><span>Catálogo Forever</span></div><span className="aa-eyebrow">CONHEÇA. ESCOLHA. CUIDE-SE.</span><h1>Um universo de cuidados.<br/><span>O seu jeito de viver.</span></h1><div><p>Explore a seleção de produtos Forever Living. Busque pelo nome, escolha uma categoria e fale com a Alfa Aloe para saber mais.</p><a className="aa-button aa-button-dark" href={createWhatsAppLink('Olá! Estou explorando o catálogo Forever da Alfa Aloe e gostaria de orientação.')} target="_blank" rel="noopener noreferrer">Preciso de uma orientação <ArrowUpRight size={17}/></a></div></div></section><CatalogExplorer full/><CatalogLead/><CatalogFAQ/></main><Footer/></div>; }
