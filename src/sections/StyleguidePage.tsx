import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Copy, Layers3, RotateCcw, Search, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrandMark from '../components/BrandMark';
import { COLOR_TOKENS, SPACE_TOKENS } from '../lib/brand';

const chapters = [['cores', '01', 'Cores'], ['tipografia', '02', 'Tipografia'], ['estrutura', '03', 'Estrutura'], ['componentes', '04', 'Componentes'], ['movimento', '05', 'Movimento']];
const sampleItems = ['Botão primário', 'Botão secundário', 'Campo de busca', 'Filtro de categoria'];

export default function StyleguidePage() {
  const [notice, setNotice] = useState('');
  const [selected, setSelected] = useState('Todos');
  const [query, setQuery] = useState('');
  const [replay, setReplay] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(''), 6000);
    return () => window.clearTimeout(timeout);
  }, [notice]);
  const copy = async (value: string, label: string) => {
    try { await navigator.clipboard.writeText(value); setNotice(`${label} copiado: ${value}`); }
    catch { setNotice(`Copie manualmente ${label}: ${value}`); }
  };
  const results = sampleItems.filter(item => item.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')));
  return <div className="aa-site aa-guide-site">
    <Header />
    <main id="main">
      <section className="aa-guide-hero aa-container">
        <div data-reveal><span className="aa-eyebrow"><Layers3 size={14} /> SISTEMA VISUAL · ALFA ALOE</span><h1>Consistência em<br /><span>cada detalhe.</span></h1><p>O guia vivo da experiência digital: as cores que você já conhece, tipografia com respiro e componentes que respondem ao toque.</p><a href="#cores" className="aa-button aa-button-dark">Explorar o sistema <ArrowDown size={17} /></a></div>
        <div className="aa-guide-cover" data-reveal aria-label="Amostra visual da identidade atual"><div className="aa-guide-cover-top"><BrandMark compact /><span>DESIGN SYSTEM / 01</span></div><div className="aa-guide-cover-type" aria-hidden="true">Aa<span>cuidar é simples.</span></div><div className="aa-guide-cover-bottom"><div>{COLOR_TOKENS.slice(0,4).map(color => <i key={color.token} style={{background:color.hex}} />)}</div><span>Natural. Próximo. Claro.</span></div></div>
      </section>
      <nav className="aa-guide-nav" aria-label="Seções do styleguide"><div className="aa-container">{chapters.map(([id, number, title]) => <a key={id} href={`#${id}`}><span>{number}</span>{title}</a>)}</div></nav>
      <div className="aa-container aa-guide-content">
        <section id="cores" className="aa-guide-section">
          <div className="aa-guide-heading" data-reveal><span className="aa-eyebrow">01 / PALETA PRESERVADA</span><h2>A natureza dá o tom.</h2><p>Seis tokens que já fazem parte do site. Clique em uma amostra para copiar o hexadecimal.</p></div>
          <div className="aa-swatch-grid">{COLOR_TOKENS.map(color => <button key={color.token} className="aa-swatch" onClick={() => copy(color.hex, color.name)} aria-label={`Copiar ${color.name}, ${color.hex}`} data-reveal><span className="aa-swatch-color" style={{background:color.hex,color:color.lightText?'#fdfdf9':'#20372a'}}><span>{color.hex.toUpperCase()}</span><Copy size={17}/></span><span className="aa-swatch-meta"><strong>{color.name}</strong><code>{color.token}</code><span>{color.usage}</span></span></button>)}</div>
          <div className="aa-guide-note"><Check size={19}/><p>Use floresta sobre papel ou aloe para conteúdo e ações. Aloe é uma cor de destaque, não um tom para texto pequeno sobre fundo claro. Divisórias não substituem bordas de foco.</p></div>
        </section>
        <section id="tipografia" className="aa-guide-section">
          <div className="aa-guide-heading" data-reveal><span className="aa-eyebrow">02 / TIPOGRAFIA</span><h2>Presença sem exagero.</h2><p>Montserrat nos títulos. Inter na leitura e na interface. A hierarquia vem da escala, do espaço e da clareza.</p></div>
          <div className="aa-type-grid"><article className="aa-type-card" data-reveal><span className="aa-eyebrow">MONTSERRAT · TÍTULOS</span><div className="aa-type-glyph">Aa</div><h3>Pequenos cuidados.<br/>Mais você.</h3><p>Peso 500 · entreletra −0,055em<br/>Título fluido: 44–66px · linha 1,13</p></article><article className="aa-type-card" data-reveal><span className="aa-eyebrow">INTER · TEXTO E INTERFACE</span><div className="aa-type-glyph aa-type-inter">Aa</div><p className="aa-type-body">Uma conversa simples pode ser o primeiro passo para encontrar o produto que combina com a sua rotina.</p><p>Pesos 400–600 · leitura com respiro<br/>Corpo editorial: 13–16px · linha 1,8</p></article></div>
          <div className="aa-type-scale"><div><span>Título de seção</span><p className="aa-sample-heading">Cuidado em cada escolha.</p><code>30–43px / 500 / 1.2</code></div><div><span>Texto de apoio</span><p className="aa-sample-body">Informação clara, antes da decisão.</p><code>Inter / 14px / 1.8</code></div><div><span>Eyebrow</span><p className="aa-eyebrow">DA NATUREZA PARA A SUA ROTINA</p><code>10px / 600 / 0.15em</code></div></div>
        </section>
        <section id="estrutura" className="aa-guide-section">
          <div className="aa-guide-heading" data-reveal><span className="aa-eyebrow">03 / ESTRUTURA</span><h2>Espaço para respirar.</h2><p>Uma escala de espaçamento compartilhada, superfícies suaves e cantos arredondados aproximam a experiência.</p></div>
          <div className="aa-structure-grid"><div className="aa-spacing-card" data-reveal>{SPACE_TOKENS.map(space => <div className="aa-spacing-row" key={space}><code>--aa-space-{space}</code><i style={{width:space}}/><span>{space}px</span></div>)}</div><div className="aa-geometry-card" data-reveal><div className="aa-geometry-shapes" aria-hidden="true"><span/><span/></div><h3>Forma que acolhe.</h3><p>Cards: 12px<br/>Botões: 99px, formato pílula<br/>Container: máximo de 1240px</p><p>O catálogo adapta a grade de quatro para duas colunas. Conteúdo editorial pode empilhar em uma coluna.</p></div></div>
        </section>
        <section id="componentes" className="aa-guide-section">
          <div className="aa-guide-heading" data-reveal><span className="aa-eyebrow">04 / COMPONENTES E ESTADOS</span><h2>Um convite à interação.</h2><p>Experimente com mouse, toque ou teclado. Estes exemplos são locais: não enviam dados nem iniciam um atendimento.</p></div>
          <div className="aa-demo-grid"><article className="aa-demo-card" data-reveal><h3>Ações</h3><p>Primária, secundária e indisponível. Use Tab para observar o foco.</p><div className="aa-demo-actions"><button className="aa-button aa-button-dark" aria-pressed={confirmed} onClick={()=>setConfirmed(!confirmed)}>{confirmed?'Selecionado':'Experimentar ação'}{confirmed?<Check size={16}/>:<ArrowUpRight size={16}/>}</button><button className="aa-button aa-button-outline" onClick={()=>{setConfirmed(false);setNotice('Exemplo de ação reiniciado.');}}>Reiniciar <RotateCcw size={16}/></button><button className="aa-button aa-button-dark" disabled>Indisponível</button></div></article>
          <article className="aa-demo-card" data-reveal><h3>Seleção</h3><p>O estado ativo combina cor e semântica, sem depender apenas de movimento.</p><div className="aa-filters aa-demo-filters" aria-label="Filtros de demonstração">{['Todos','Bebidas','Beleza'].map(item=><button key={item} aria-pressed={selected===item} onClick={()=>setSelected(item)}>{item}</button>)}</div><p className="aa-demo-feedback" role="status">Selecionado: {selected}</p></article>
          <article className="aa-demo-card" data-reveal><h3>Busca e resposta</h3><label className="aa-search"><Search size={16}/><span className="aa-sr-only">Buscar componentes de exemplo</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Busque por botão, campo…" /></label><div className="aa-demo-search-result" aria-live="polite">{results.length?<ul>{results.map(item=><li key={item}>{item}</li>)}</ul>:<p>Nenhum componente encontrado. Tente “botão”.</p>}</div></article>
          <article className="aa-demo-card" data-reveal><h3>Informação progressiva</h3><div className="aa-faq aa-demo-faq"><details><summary>Como o foco funciona?<span aria-hidden="true">+</span></summary><p>Um contorno visível acompanha a navegação por teclado. Enter ou Espaço ativam botões; os links mantêm seu comportamento nativo.</p></details><details><summary>E se eu preferir menos movimento?<span aria-hidden="true">+</span></summary><p>A preferência do sistema por movimento reduzido desativa animações e rolagem suave.</p></details></div></article></div>
        </section>
        <section id="movimento" className="aa-guide-section">
          <div className="aa-guide-heading" data-reveal><span className="aa-eyebrow">05 / MOVIMENTO</span><h2>Leve. Intencional. Opcional.</h2><p>Pequenas respostas confirmam ações. Entradas sutis ajudam a perceber os elementos sem interromper a leitura.</p></div>
          <div className="aa-motion-demo"><div key={replay} className="aa-motion-sample"><Sparkles size={27}/><strong>Menos ruído.<br/>Mais fluidez.</strong></div><div><h3>O conteúdo vem primeiro.</h3><p>Microinterações de 180ms. Entradas de até 480ms. Sem rolagem controlada, loops contínuos ou espera para clicar.</p><button className="aa-button aa-button-outline" onClick={()=>setReplay(value=>value+1)}>Rever exemplo <RotateCcw size={16}/></button><span className="aa-motion-hint">Respeita a preferência de movimento do seu dispositivo.</span></div></div>
        </section>
        <aside className="aa-guide-closing" data-reveal><div><span className="aa-eyebrow">IDENTIDADE EM EVOLUÇÃO</span><h2>A base está aqui.<br/><span>A logo oficial vem depois.</span></h2><p>A assinatura atual é provisória. A aplicação da marca foi centralizada para receber o arquivo oficial sem refazer estas páginas.</p></div><a href="/branding" className="aa-button aa-button-dark">Explorar o branding <ArrowUpRight size={17}/></a></aside>
      </div>
    </main>
    <div className="aa-guide-toast" role="status" aria-live="polite" aria-atomic="true">{notice && <span><Check size={16}/>{notice}</span>}</div>
    <Footer />
  </div>;
}
