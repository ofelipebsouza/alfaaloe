// Product names, descriptions and images verified against Forever Living Brasil on 2026-10-19.
// Catalog inclusion does not imply stock or a commercial offer. See docs/catalog-sources.md.
export interface Product { slug: string; name: string; category: string; description: string; image: string; source: string; verifiedAt: string; details?: string; }
export const CATEGORIES = [
  {
    "id": "bebidas",
    "label": "Bebidas"
  },
  {
    "id": "beleza",
    "label": "Beleza"
  },
  {
    "id": "cuidados-pessoais",
    "label": "Cuidados pessoais"
  },
  {
    "id": "nutricao",
    "label": "Nutrição"
  }
] as const;
export const PRODUCTS: Product[] = [
  {
    "slug": "aloe-vera-gel",
    "name": "Aloe Vera Gel",
    "category": "bebidas",
    "description": "Bebida de aloe vera elaborada com o gel da parte interna da folha.",
    "image": "/images/catalogo/aloe-vera-gel.webp",
    "source": "https://www.foreverliving.com.br/produtos/bebidas/aloe-vera-gel",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-peaches",
    "name": "Aloe Peaches",
    "category": "bebidas",
    "description": "Bebida de aloe vera combinada com purê de pêssego.",
    "image": "/images/catalogo/aloe-peaches.webp",
    "source": "https://www.foreverliving.com.br/produtos/bebidas/aloe-peaches",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-vera-gelly",
    "name": "Aloe Vera Gelly",
    "category": "beleza",
    "description": "Gel de uso tópico com aloe vera para hidratar e condicionar a pele.",
    "image": "/images/catalogo/aloe-vera-gelly.webp",
    "source": "https://www.foreverliving.com.br/produtos/beleza/aloe-vera-gelly",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "bright-toothgel",
    "name": "Forever Bright Toothgel",
    "category": "cuidados-pessoais",
    "description": "Gel dental com aloe vera, própolis e sabor de hortelã. Fórmula sem flúor.",
    "image": "/images/catalogo/bright-toothgel.webp",
    "source": "https://www.foreverliving.com.br/produtos/cuidados-pessoais/bright-toothgel",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-propolis-creme",
    "name": "Aloe Propolis Creme",
    "category": "beleza",
    "description": "Creme hidratante para a pele com aloe vera, própolis e camomila.",
    "image": "/images/catalogo/aloe-propolis-creme.webp",
    "source": "https://www.foreverliving.com.br/produtos/beleza/aloe-propolis-creme",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "arctic-sea",
    "name": "Forever Arctic Sea",
    "category": "nutricao",
    "description": "Suplemento em cápsulas com ômega-3 de óleo de peixe, óleo de oliva e vitamina E.",
    "image": "/images/catalogo/arctic-sea.webp",
    "source": "https://www.foreverliving.com.br/produtos/nutricao/arctic-sea",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-berry-nectar",
    "name": "Aloe Berry Nectar",
    "category": "bebidas",
    "description": "Bebida de aloe vera com concentrados de cranberry e maçã.",
    "image": "/images/catalogo/aloe-berry-nectar.webp",
    "source": "https://www.foreverliving.com.br/produtos/bebidas/aloe-berry-nectar",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-ever-shield-deodorant",
    "name": "Aloe Ever Shield Deodorant",
    "category": "cuidados-pessoais",
    "description": "Desodorante em bastão à base de aloe vera, sem sais de alumínio.",
    "image": "/images/catalogo/aloe-ever-shield-deodorant.webp",
    "source": "https://www.foreverliving.com.br/produtos/cuidados-pessoais/aloe-ever-shield-deodorant",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "forever-aloe-mango",
    "name": "Aloe Mango",
    "category": "bebidas",
    "description": "Bebida de aloe vera combinada com purê de manga.",
    "image": "/images/catalogo/forever-aloe-mango.webp",
    "source": "https://www.foreverliving.com.br/produtos/bebidas/forever-aloe-mango",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "forever-active-boost",
    "name": "Forever Active Boost",
    "category": "bebidas",
    "description": "Bebida gaseificada com cafeína, extratos de frutas e vitaminas do complexo B.",
    "image": "/images/catalogo/forever-active-boost.webp",
    "source": "https://www.foreverliving.com.br/produtos/bebidas/forever-active-boost",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-activator",
    "name": "Aloe Activator",
    "category": "beleza",
    "description": "Hidratante líquido com aloe vera e alantoína para a rotina de cuidados da pele.",
    "image": "/images/catalogo/aloe-activator.webp",
    "source": "https://www.foreverliving.com.br/produtos/beleza/aloe-activator",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-heat-lotion",
    "name": "Aloe Heat Lotion",
    "category": "beleza",
    "description": "Loção corporal com aloe vera, mentol e eucalipto, indicada para massagem.",
    "image": "/images/catalogo/aloe-heat-lotion.webp",
    "source": "https://www.foreverliving.com.br/produtos/beleza/aloe-heat-lotion",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-moisturizing-lotion",
    "name": "Aloe Moisturizing Lotion",
    "category": "beleza",
    "description": "Loção hidratante com aloe vera para rosto, mãos e corpo.",
    "image": "/images/catalogo/aloe-moisturizing-lotion.webp",
    "source": "https://www.foreverliving.com.br/produtos/beleza/aloe-moisturizing-lotion",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-avocado-face-body-soap",
    "name": "Aloe Avocado Face & Body Soap",
    "category": "cuidados-pessoais",
    "description": "Sabonete em barra para rosto e corpo com aloe vera e óleo de abacate.",
    "image": "/images/catalogo/aloe-avocado-face-body-soap.webp",
    "source": "https://www.foreverliving.com.br/produtos/cuidados-pessoais/aloe-avocado-face-body-soap",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-first",
    "name": "Aloe First",
    "category": "cuidados-pessoais",
    "description": "Spray com aloe vera, própolis e extratos vegetais para hidratar a pele.",
    "image": "/images/catalogo/aloe-first.webp",
    "source": "https://www.foreverliving.com.br/produtos/cuidados-pessoais/aloe-first",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-liquid-soap",
    "name": "Aloe Liquid Soap",
    "category": "cuidados-pessoais",
    "description": "Sabonete líquido com aloe vera, óleo de argan e extrato de pepino.",
    "image": "/images/catalogo/aloe-liquid-soap.webp",
    "source": "https://www.foreverliving.com.br/produtos/cuidados-pessoais/aloe-liquid-soap",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-jojoba-conditioner",
    "name": "Aloe-Jojoba Conditioner",
    "category": "cuidados-pessoais",
    "description": "Condicionador com aloe vera e óleos de jojoba, argan e rosa-mosqueta.",
    "image": "/images/catalogo/aloe-jojoba-conditioner.webp",
    "source": "https://www.foreverliving.com.br/produtos/cuidados-pessoais/aloe-jojoba-conditioner",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-jojoba-shampoo",
    "name": "Aloe-Jojoba Shampoo",
    "category": "cuidados-pessoais",
    "description": "Shampoo com aloe vera e óleo de jojoba para a limpeza dos cabelos.",
    "image": "/images/catalogo/aloe-jojoba-shampoo.webp",
    "source": "https://www.foreverliving.com.br/produtos/cuidados-pessoais/aloe-jojoba-shampoo",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-lips",
    "name": "Aloe Lips",
    "category": "cuidados-pessoais",
    "description": "Hidratante labial com aloe vera, jojoba e cera de abelha. Sem proteção solar.",
    "image": "/images/catalogo/aloe-lips.webp",
    "source": "https://www.foreverliving.com.br/produtos/cuidados-pessoais/aloe-lips",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "aloe-sunscreen",
    "name": "Aloe Sunscreen",
    "category": "cuidados-pessoais",
    "description": "Protetor solar com aloe vera, FPS 30 e proteção UVA e UVB.",
    "image": "/images/catalogo/Aloe-Sunscreen.webp",
    "source": "https://www.foreverliving.com.br/produtos/cuidados-pessoais/Aloe-Sunscreen",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "gentlemans-pride",
    "name": "Gentleman's Pride",
    "category": "cuidados-pessoais",
    "description": "Loção pós-barba com aloe vera e fragrância suave, formulada sem álcool.",
    "image": "/images/catalogo/gentlemans-pride.webp",
    "source": "https://www.foreverliving.com.br/produtos/cuidados-pessoais/gentlemans-pride",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "forever-fiber",
    "name": "Forever Fiber",
    "category": "nutricao",
    "description": "Suplemento de fibras em envelopes individuais para misturar em bebidas.",
    "image": "/images/catalogo/forever-fiber.webp",
    "source": "https://www.foreverliving.com.br/produtos/nutricao/forever-fiber",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "forever-immune-gummy",
    "name": "Forever Immune Gummy",
    "category": "nutricao",
    "description": "Suplemento alimentar em gomas sabor manga, com dez vitaminas e zinco.",
    "image": "/images/catalogo/forever-immune-gummy.webp",
    "source": "https://www.foreverliving.com.br/produtos/nutricao/forever-immune-gummy",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "forever-move",
    "name": "Forever Move",
    "category": "nutricao",
    "description": "Suplemento em cápsulas com membrana da casca de ovo e extrato de cúrcuma.",
    "image": "/images/catalogo/forever-move.webp",
    "source": "https://www.foreverliving.com.br/produtos/nutricao/forever-move",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "forever-argi",
    "name": "Forever Argi+",
    "category": "nutricao",
    "description": "Suplemento alimentar com L-arginina e vitaminas, em pó para diluição.",
    "image": "/images/catalogo/forever-argi.webp",
    "source": "https://www.foreverliving.com.br/produtos/nutricao/forever-argi",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "forever-bio-active",
    "name": "Forever Bio Active",
    "category": "nutricao",
    "description": "Suplemento alimentar com colágeno Verisol e vitamina C.",
    "image": "/images/catalogo/forever-bio-active.webp",
    "source": "https://www.foreverliving.com.br/produtos/nutricao/forever-bio-active",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "forever-immublend",
    "name": "Forever ImmuBlend",
    "category": "nutricao",
    "description": "Suplemento em cápsulas com vitaminas C e D, zinco, selênio, lisina e curcumina.",
    "image": "/images/catalogo/forever-immublend.webp",
    "source": "https://www.foreverliving.com.br/produtos/nutricao/forever-immublend/",
    "verifiedAt": "2026-10-19"
  },
  {
    "slug": "forever-ivision",
    "name": "Forever iVision",
    "category": "nutricao",
    "description": "Suplemento em cápsulas com vitaminas, minerais, luteína e zeaxantina.",
    "image": "/images/catalogo/forever-ivision.webp",
    "source": "https://www.foreverliving.com.br/produtos/nutricao/forever-ivision",
    "verifiedAt": "2026-10-19"
  }
];
export const categoryLabel = (id: string) => CATEGORIES.find(category => category.id === id)?.label || id;
export const normalizeSearch = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
