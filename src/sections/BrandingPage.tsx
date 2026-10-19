import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, MessageCircle, MoveUpRight, Plus } from 'lucide-react';
import BrandMark from '../components/BrandMark';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PRODUCTS } from '../lib/catalog';
import { COLOR_TOKENS } from '../lib/brand';

const voiceExamples = [
  { id: 'apresentar', label: 'Apresentar', eyebrow: 'PRIMEIRO CONTATO', text: 'Pequenos cuidados. Mais você.', detail: 'Conheça os produtos Forever e encontre novas formas de cuidar de si, no seu tempo.', note: 'Uma abertura breve, humana e sem prometer resultados.' },
  { id: 'orientar', label: 'Orientar', eyebrow: 'NA HORA DE ESCOLHER', text: 'Vamos encontrar seu próximo cuidado?', detail: 'Explore as categorias, conheça os produtos e converse com a gente para tirar suas dúvidas.', note: 'Um convite para escolher com informação, sem pressão.' },
  { id: 'conversar', label: 'Conversar', eyebrow: 'ATENDIMENTO PRÓXIMO', text: 'Conte com a gente para começar.', detail: 'Fale com a Alfa Aloe pelo WhatsApp e consulte valores, disponibilidade e formas de compra.', note: 'Um próximo passo claro, com as condições a confirmar.' },
];

export default function BrandingPage() {
  const [voice, setVoice] = useState(voiceExamples[0]);
  const gel = PRODUCTS.find((product) => product.slug === 'aloe-vera-gel');
  const gelly = PRODUCTS.find((product) => product.slug === 'aloe-vera-gelly');
  return (
    <div className="aa-site aa-brand-page">
      <Header />
      <main id="main">
        <section className="aa-container aa-brand-hero" aria-labelledby="brand-title">
          <div className="aa-brand-hero-copy" data-reveal>
            <nav className="aa-breadcrumb" aria-label="Você está aqui"><a href="/">Início</a><span aria-hidden="true">/</span><span aria-current="page">Branding</span></nav>
            <span className="aa-eyebrow"><span className="aa-status-dot" /> O UNIVERSO ALFA ALOE</span>
            <h1 id="brand-title">Uma marca para<br />cuidar <span>de perto.</span></h1>
            <p>Natural na presença. Clara nas palavras. Próxima em cada conversa. Esta é a direção que dá forma à Alfa Aloe.</p>
            <a className="aa-text-link" href="#essencia">Conheça nossa direção <ArrowDown size={16} aria-hidden="true" /></a>
            <span className="aa-brand-version">Direção de marca · versão inicial</span>
          </div>
          <div className="aa-brand-cover" data-reveal>
            <span className="aa-brand-cover-ring" aria-hidden="true" />
            <div className="aa-brand-cover-top"><BrandMark /><span>BRAND<br />DIRECTION / 01</span></div>
            <p className="aa-brand-cover-line">O cuidado<br />começa<br /><em>no simples.</em></p>
            <div className="aa-brand-cover-bottom"><span>Uma escolha mais consciente.<br />Um cuidado mais próximo.</span><MoveUpRight size={24} strokeWidth={1} aria-hidden="true" /></div>
          </div>
        </section>
        <div className="aa-brand-nav-wrap"><nav className="aa-container aa-brand-section-nav" aria-label="Nesta página"><a href="#essencia"><span>01</span> Essência</a><a href="#identidade"><span>02</span> Identidade</a><a href="#voz"><span>03</span> Voz & linguagem</a><a href="#imagem"><span>04</span> Imagem</a></nav></div>
        <section id="essencia" className="aa-container aa-brand-section" aria-labelledby="essence-title" data-reveal>
          <div className="aa-brand-section-head"><span className="aa-eyebrow">01 / A ESSÊNCIA</span><div><h2 id="essence-title">O essencial tem<br /><span>espaço para florescer.</span></h2><p>A proposta da Alfa Aloe é tornar a descoberta dos produtos mais simples, com informação acessível e uma conversa de verdade.</p></div></div>
          <div className="aa-brand-principles"><article><span className="aa-brand-principle-number">01 /</span><h3>Clareza</h3><p>Explicar de forma simples. Dar contexto aos produtos e deixar cada próximo passo evidente.</p></article><article><span className="aa-brand-principle-number">02 /</span><h3>Proximidade</h3><p>Ouvir antes de orientar. Tratar cada conversa com atenção e respeitar o tempo de escolha.</p></article><article><span className="aa-brand-principle-number">03 /</span><h3>Leveza</h3><p>Dar espaço para respirar. Criar uma experiência tranquila, com poucos elementos e intenção.</p></article></div>
        </section>
        <section id="identidade" className="aa-brand-identity" aria-labelledby="identity-title"><div className="aa-container aa-brand-section">
          <div className="aa-brand-section-head" data-reveal><span className="aa-eyebrow">02 / IDENTIDADE VISUAL</span><div><h2 id="identity-title">Verdes que acolhem.<br /><span>Espaços que respiram.</span></h2><p>A paleta atual é a base da identidade: tons botânicos, fundos claros e contraste para dar foco ao que importa.</p></div></div>
          <div className="aa-brand-palette" aria-label="Paleta atual da Alfa Aloe" data-reveal>{COLOR_TOKENS.map((color) => <div key={color.token} className="aa-brand-swatch" style={{ background: `var(${color.token})`, color: color.lightText ? 'var(--aa-paper)' : 'var(--aa-ink)' }}><span>{color.usage}</span><div><h3>{color.name}</h3><p>{color.hex.toUpperCase()}</p></div></div>)}</div>
          <div className="aa-brand-mark-grid" data-reveal><div className="aa-brand-mark-sample"><span className="aa-eyebrow">ASSINATURA ATUAL</span><div className="aa-brand-safe-area"><BrandMark /></div><span className="aa-brand-caption">Símbolo provisório · logo oficial a incorporar</span></div><div className="aa-brand-mark-guidance"><span className="aa-eyebrow">UMA BASE PRONTA PARA EVOLUIR</span><h3>A identidade continua<br />com a sua logo.</h3><p>A assinatura exibida é provisória. A logo oficial será incorporada quando o arquivo for fornecido, preservando a paleta e a linguagem visual atuais.</p><ul><li><Check size={15} aria-hidden="true" /> Manter proporção e área de respiro</li><li><Check size={15} aria-hidden="true" /> Priorizar fundos simples e boa leitura</li><li><Check size={15} aria-hidden="true" /> Separar Alfa Aloe da marca Forever</li></ul></div></div>
          <details className="aa-brand-details"><summary>Orientações de aplicação <Plus size={18} aria-hidden="true" /></summary><div><p>Use a assinatura sem distorções, efeitos ou elementos sobrepostos. O espaço livre ao redor deve preservar sua leitura, especialmente em telas pequenas.</p><p>A identificação de distribuidor independente deve continuar visível. Marcas, embalagens e imagens da Forever pertencem aos seus respectivos titulares; não devem sugerir representação institucional.</p></div></details>
        </div></section>
        <section id="voz" className="aa-container aa-brand-section" aria-labelledby="voice-title" data-reveal>
          <div className="aa-brand-section-head"><span className="aa-eyebrow">03 / VOZ & LINGUAGEM</span><div><h2 id="voice-title">Como uma boa<br /><span>conversa começa.</span></h2><p>Um tom acolhedor, direto e tranquilo. A proposta é falar com as pessoas, valorizar suas escolhas e orientar com responsabilidade.</p></div></div>
          <div className="aa-brand-voice-grid"><div className="aa-brand-voice-controls"><span className="aa-eyebrow">EXPLORE OS EXEMPLOS</span><div className="aa-brand-voice-options" role="group" aria-label="Contexto do exemplo de linguagem">{voiceExamples.map((example, index) => <button type="button" key={example.id} aria-pressed={voice.id === example.id} onClick={() => setVoice(example)}><span><small>0{index + 1}</small>{example.label}</span><ArrowUpRight size={17} aria-hidden="true" /></button>)}</div><p>Frases curtas. Convites gentis.<br />Informação antes da promessa.</p></div><div className="aa-brand-voice-example" aria-live="polite" aria-atomic="true"><span className="aa-eyebrow"><MessageCircle size={14} aria-hidden="true" /> {voice.eyebrow}</span><h3 key={voice.id}>{voice.text}</h3><p>{voice.detail}</p><span className="aa-brand-voice-note">{voice.note}</span></div></div>
          <p className="aa-brand-responsibility">Uma comunicação responsável não promete cura, resultados garantidos ou ganhos financeiros. Informações de produto seguem as fontes oficiais e não substituem orientação profissional de saúde.</p>
        </section>
        <section id="imagem" className="aa-container aa-brand-section aa-brand-imagery" aria-labelledby="imagery-title" data-reveal>
          <div className="aa-brand-section-head"><span className="aa-eyebrow">04 / DIREÇÃO DE IMAGEM</span><div><h2 id="imagery-title">Presença natural.<br /><span>Produto em primeiro plano.</span></h2><p>Luz suave, tons da paleta e composições com espaço. Imagens que ajudam a conhecer o produto sem exageros ou ruído.</p></div></div>
          <div className="aa-brand-image-grid"><figure className="aa-brand-image-product"><div className="aa-brand-image-circle" aria-hidden="true" />{gel && <img src={gel.image} alt="Embalagem de Forever Aloe Vera Gel em composição clara" width="500" height="500" loading="lazy" />}<figcaption><span>01 / LUZ & RESPIRO</span><p>Fundos claros. Uma composição que deixa o produto falar.</p></figcaption></figure><figure className="aa-brand-image-detail"><span className="aa-brand-image-word" aria-hidden="true">cuidar.</span>{gelly && <img src={gelly.image} alt="Embalagem de Forever Aloe Vera Gelly em fundo verde suave" width="500" height="500" loading="lazy" />}<figcaption><span>02 / COERÊNCIA & FOCO</span><p>Embalagens preservadas. Texturas e cores em equilíbrio.</p></figcaption></figure></div>
        </section>
        <section className="aa-container aa-brand-next" aria-labelledby="brand-next-title" data-reveal><div><span className="aa-eyebrow">DA DIREÇÃO À EXPERIÊNCIA</span><h2 id="brand-next-title">A mesma essência.<br /><span>Em cada ponto de contato.</span></h2></div><div><a href="/styleguide" className="aa-button aa-button-dark">Explorar o styleguide <ArrowUpRight size={17} aria-hidden="true" /></a><a href="/links" className="aa-text-link">Conhecer o biolink <ArrowUpRight size={16} aria-hidden="true" /></a></div></section>
      </main>
      <Footer />
    </div>
  );
}
