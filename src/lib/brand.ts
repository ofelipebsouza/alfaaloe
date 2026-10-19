/** One replacement point for the official logo when the owner supplies it.
 * Place the approved file in public/brand/, then set logo.src below.
 * Keep width/height proportional; do not use a product/Forever mark as Alfa Aloe's logo.
 */
export interface BrandLogo { src: string; alt: string; width: number; height: number; }
export const BRAND: { name: string; descriptor: string; logo: BrandLogo | null } = {
  name: 'Alfa Aloe',
  descriptor: 'FOREVER · FBO INDEPENDENTE',
  logo: null,
};

export const COLOR_TOKENS = [
  { name: 'Floresta', token: '--aa-ink', hex: '#20372a', usage: 'Texto principal e ações primárias', lightText: true },
  { name: 'Aloe', token: '--aa-green', hex: '#8fcf65', usage: 'Destaques com texto floresta', lightText: false },
  { name: 'Névoa', token: '--aa-soft', hex: '#eff4e9', usage: 'Superfícies suaves e respiro', lightText: false },
  { name: 'Papel', token: '--aa-paper', hex: '#fdfdf9', usage: 'Fundo principal da experiência', lightText: false },
  { name: 'Sálvia', token: '--aa-muted', hex: '#68736a', usage: 'Texto de apoio sobre papel', lightText: true },
  { name: 'Linha', token: '--aa-line', hex: '#dfe6dc', usage: 'Divisórias decorativas', lightText: false },
] as const;

export const SPACE_TOKENS = [4, 8, 12, 16, 24, 32, 48, 64] as const;
