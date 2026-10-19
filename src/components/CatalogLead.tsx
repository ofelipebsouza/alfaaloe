import { useState } from 'react';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '../lib/utils';
import { trackWhatsAppClick } from '../lib/tracking';
export default function CatalogLead() {
  const [interest, setInterest] = useState('Quero conhecer os produtos');
  const choices = ['Quero conhecer os produtos', 'Já sei o que quero', 'Quero ser FBO'];
  return <section className="aa-lead-wrap" id="atendimento"><div className="aa-container aa-lead"><div><span className="aa-eyebrow">ATENDIMENTO DE VERDADE, DE PESSOA PARA PESSOA</span><h2>Vamos encontrar o<br/>seu próximo cuidado?</h2><p>Conte o que você procura. A gente te ajuda a conhecer as opções e confirma valores, disponibilidade e entrega.</p><div className="aa-lead-note"><MessageCircle size={19}/><span>Uma conversa. Sem compromisso.</span></div></div><div className="aa-lead-panel"><span className="aa-eyebrow">COMO PODEMOS AJUDAR?</span><div className="aa-interest-options" role="group" aria-label="Seu interesse">{choices.map(choice => <button key={choice} aria-pressed={interest === choice} onClick={() => setInterest(choice)}>{choice}<span>{interest === choice && <Check size={13}/>}</span></button>)}</div><a className="aa-button aa-button-dark" href={createWhatsAppLink(`Olá! Vim pelo site da Alfa Aloe. ${interest}. Podemos conversar?`)} target="_blank" rel="noopener noreferrer" onClick={e => trackWhatsAppClick(e, 'catalog_consultation')}>Conversar no WhatsApp <ArrowUpRight size={18}/></a><p>Você será direcionado ao WhatsApp da Alfa Aloe. A mensagem só é enviada quando você confirmar no aplicativo.</p></div></div></section>;
}
