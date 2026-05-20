// ── Article feed ─────────────────────────────────────────────────────────────
export interface Article {
  id: number;
  category: string;
  title: string;
  artist?: string;
  date?: string;
  exhibition?: string;
  venue?: string;
  body: string;
  fullText?: string[];
  bg: string;
  accent: string;
  image?: any;
}

export const ARTICLES: Article[] = [
  {
    id: 0,
    category: 'Announcement',
    title: 'Belkis Ayón: Mythologies',
    artist: 'Bildmuseet, Umeå',
    date: 'April 29, 2025',
    exhibition: 'May 23 – November 23, 2025',
    body: "The first Nordic presentation of Belkis Ayón's work — monumental collographies drawn from Abakuá mythology.",
    fullText: [
      "Belkis Ayón (1967–1999) is one of Cuba's most prominent artists. In the first Nordic presentation of the artist's work, Bildmuseet presents creative highlights from her brief but intense career, from the mid-1980s to the late 1990s.",
      "The figures, symbols and rituals that feature in Belkis Ayón's monumental works are drawn from the Abakuá, a secretive Afro-Cuban brotherhood that she explored throughout her artistic career. Her interpretations of their myths speak of belonging, silence, power and resistance.",
      "By pushing the boundaries of collography — a graphic technique in which materials such as paper, cardboard, and sandpaper are glued onto cardboard to create the printing plates — she developed a deeply personal visual imagery.",
    ],
    bg: '#0d0d0d',
    accent: '#cdf12b',
    image: require('../assets/articles/1.jpg'),
  },
  {
    id: 1,
    category: 'Agenda',
    title: 'Issue 245: "Latinx"',
    artist: 'Aperture',
    date: 'December 8, 2021',
    body: 'Aperture magazine presents an issue celebrating the dynamic visions of Latinx photography throughout the United States.',
    bg: '#1a0a00',
    accent: '#f5c87a',
    image: require('../assets/articles/2.png'),
  },
  {
    id: 9,
    category: 'Announcement',
    title: 'The Condition of No',
    artist: 'Tania Bruguera',
    date: 'August 30, 2024',
    exhibition: 'September 5 – November 24, 2024',
    venue: 'Museum Villa Stuck, Munich',
    body: 'Cuban artist and activist Tania Bruguera conceives a project about censorship, propaganda, and free speech — shaped by personal experiences of suppression in Cuba and beyond.',
    bg: '#0f0a0a',
    accent: '#ff6b6b',
    image: require('../assets/articles/3.jpg'),
  },
  {
    id: 10,
    category: 'Exhibition',
    title: 'The Plantation Plot',
    artist: 'KADIST × ILHAM',
    date: 'April 20, 2025',
    exhibition: 'April 20 – September 21, 2025',
    body: 'KADIST and ILHAM present an exhibition exploring the legacies of plantations and their (non-) logics, curated by Lim Sheau Yun. ILHAM Gallery, Kuala Lumpur.',
    bg: '#040f0c',
    accent: '#7fffee',
    image: require('../assets/articles/4.jpg'),
  },
  {
    id: 2,
    category: 'Architecture',
    title: 'Infrastructures of Care',
    artist: 'Andrés Jaque',
    body: 'An investigation into the spatial politics of health, infrastructure, and collective life in the contemporary city.',
    bg: '#0d0d1a',
    accent: '#cdf12b',
  },
  {
    id: 3,
    category: 'Theory',
    title: 'On the Opacity of Things',
    artist: 'Hito Steyerl',
    body: 'How do objects resist interpretation? A philosophical inquiry into material culture, representation, and refusal.',
    bg: '#0A1F8F',
    accent: '#ffffff',
  },
  {
    id: 4,
    category: 'Exhibition',
    title: 'The World Interior of Capital',
    artist: 'Keller Easterling',
    body: 'Space as protocol. The hidden operating systems embedded in global architecture and urban design.',
    bg: '#111111',
    accent: '#cdf12b',
  },
  {
    id: 5,
    category: 'Performance',
    title: 'Scores for the Undone',
    artist: 'Trajal Harrell',
    body: 'Movement as inscription. A meditation on embodiment, memory, and the choreography of everyday resistance.',
    bg: '#1a0a2e',
    accent: '#e0c9ff',
  },
  {
    id: 6,
    category: 'Film',
    title: 'Images Against Time',
    artist: 'Laura Poitras',
    body: 'Documentary practice as political intervention. Surveillance, evidence, and the ethics of the moving image.',
    bg: '#0a1a0a',
    accent: '#cdf12b',
  },
  {
    id: 7,
    category: 'Writing',
    title: 'After the End of Art',
    artist: 'Saidiya Hartman',
    body: 'A speculative essay on narrative, erasure, and the labor of imagining what has been systematically unwritten.',
    bg: '#1a0e05',
    accent: '#f5c87a',
  },
  {
    id: 8,
    category: 'Philosophy',
    title: 'Cyclonopedia',
    artist: 'Reza Negarestani',
    body: 'Petroleum as an occult entity, the Middle East as a living fossil, and theory as an act of geological excavation.',
    bg: '#1a1200',
    accent: '#ffd966',
  },
  {
    id: 11,
    category: 'Politics',
    title: 'Queer Phenomenology',
    artist: 'Sara Ahmed',
    body: 'What does it mean to be oriented? On bodies, objects, desire, and the angles at which we approach the world.',
    bg: '#0a1a1a',
    accent: '#7fffee',
  },
];

// ── Left panel nav ────────────────────────────────────────────────────────────
export type NavSection = 'Index' | 'Projects' | 'Artists' | 'Articles' | 'Events' | 'Shop';
export const NAV_ITEMS: NavSection[] = ['Index', 'Projects', 'Artists', 'Articles', 'Events', 'Shop'];

export interface NavItem {
  id: string;
  title: string;
  meta: string;
  body: string;
  accent?: string;
}

export const NAV_CONTENT: Record<NavSection, { items: NavItem[] }> = {
  Index: {
    items: [
      { id: 'i1', title: 'Infrastructures of Care', meta: 'Architecture · Issue 142', body: 'An investigation into the spatial politics of health, infrastructure, and collective life.' },
      { id: 'i2', title: 'On the Opacity of Things', meta: 'Theory · Issue 141', body: 'How do objects resist interpretation? A philosophical inquiry into material culture.' },
      { id: 'i3', title: 'The World Interior of Capital', meta: 'Exhibition · Issue 140', body: 'Space as protocol — the hidden operating systems embedded in global architecture.' },
      { id: 'i4', title: 'Scores for the Undone', meta: 'Performance · Issue 139', body: 'Movement as inscription. A meditation on embodiment, memory, and choreography.' },
      { id: 'i5', title: 'Images Against Time', meta: 'Film · Issue 138', body: 'Documentary practice as political intervention. Surveillance, evidence, and ethics.' },
    ],
  },
  Projects: {
    items: [
      { id: 'p1', title: 'Territorial Spirits', meta: '2026 · Group Exhibition', body: 'Land, memory, and ancestral claim in contested geographies.', accent: '#7fffee' },
      { id: 'p2', title: 'After the Archive', meta: '2025 · Research Programme', body: 'Institutional memory, its failures, and what survives erasure.', accent: '#cdf12b' },
      { id: 'p3', title: 'Unfinished Sentences', meta: '2025 · Film + Performance', body: 'Fragmentation, incomplete language, and the pauses between.', accent: '#f5c87a' },
      { id: 'p4', title: 'Common Ground', meta: '2024 · Public Commission', body: 'A series of spatial interventions in sites of collective use.', accent: '#e0c9ff' },
    ],
  },
  Artists: {
    items: [
      { id: 'ar1', title: 'Hito Steyerl', meta: 'Film / Theory', body: 'Works at the intersection of documentary, theory, and digital culture.' },
      { id: 'ar2', title: 'Andrés Jaque', meta: 'Architecture', body: 'Founder of Office for Political Innovation. Explores politics of domesticity.' },
      { id: 'ar3', title: 'Keller Easterling', meta: 'Architecture / Writing', body: 'Author of Extrastatecraft. Studies global infrastructure as medium.' },
      { id: 'ar4', title: 'Trajal Harrell', meta: 'Choreography', body: 'Refracts voguing, Judson Church, and Japanese butoh into new forms.' },
      { id: 'ar5', title: 'Sara Ahmed', meta: 'Philosophy', body: 'Phenomenologist of race, gender, and institutional culture.' },
      { id: 'ar6', title: 'Laura Poitras', meta: 'Film', body: 'Documentary filmmaker. Academy Award winner. Co-founder of The Intercept.' },
    ],
  },
  Articles: {
    items: [
      { id: 'at0', title: 'Belkis Ayón: Mythologies', meta: 'Announcement · Bildmuseet', body: "Belkis Ayón (1967–1999) pushed the boundaries of collography to create a deeply personal visual imagery drawn from Abakuá myth.", accent: '#cdf12b' },
      { id: 'at0b', title: 'Issue 245: "Latinx"', meta: 'Agenda · Aperture · Dec 8, 2021', body: "Aperture magazine celebrates the dynamic visions of Latinx photography throughout the United States.", accent: '#f5c87a' },
      { id: 'at0c', title: 'The Condition of No', meta: 'Announcement · Museum Villa Stuck · Aug 30, 2024', body: "Tania Bruguera conceives a three-part program on censorship, propaganda, and free speech.", accent: '#ff6b6b' },
      { id: 'at1', title: 'Queer Phenomenology', meta: 'Sara Ahmed · Essay', body: 'What does it mean to be oriented? On bodies, objects, desire, and angle of approach.' },
      { id: 'at2', title: 'Cyclonopedia', meta: 'Reza Negarestani · Theory', body: 'Petroleum as occult entity, the Middle East as living fossil, theory as excavation.' },
      { id: 'at3', title: 'After the End of Art', meta: 'Saidiya Hartman · Essay', body: 'Narrative, erasure, and the labor of imagining what has been systematically unwritten.' },
    ],
  },
  Events: {
    items: [
      { id: 'ev0', title: 'Belkis Ayón: Mythologies', meta: 'May 23 – Nov 23, 2025 · Bildmuseet, Umeå', body: "First Nordic presentation of Ayón's work. Monumental collographies drawn from Abakuá mythology.", accent: '#cdf12b' },
      { id: 'ev1', title: 'Territorial Spirits', meta: 'May 8 – June 14, 2026', body: 'A group exhibition exploring land, memory, and ancestral claim.' },
      { id: 'ev2', title: 'Reading Group: Queer Ecologies', meta: 'Every Thursday, May 2026', body: 'A five-week series on queerness, ecology, and entanglement.' },
      { id: 'ev3', title: 'Symposium: After the Archive', meta: 'June 3–4, 2026 · Berlin', body: 'Panels, performances, and discussions on institutional memory.' },
      { id: 'ev4', title: 'Film Screening: Unfinished Sentences', meta: 'May 29, 2026 · New York', body: 'Short films on fragmentation, incomplete language, and pauses between.' },
    ],
  },
  Shop: {
    items: [
      { id: 'sh1', title: 'e-flux journal #142', meta: 'Print · €18', body: 'Spring 2026 issue. Essays on infrastructure, care, and collective space.' },
      { id: 'sh2', title: 'Extrastatecraft', meta: 'Book · Keller Easterling · €26', body: 'The power of infrastructure space. Verso Books.' },
      { id: 'sh3', title: 'e-flux tote bag', meta: 'Object · €22', body: 'Heavy canvas, screenprinted. Yellow on navy.' },
      { id: 'sh4', title: 'Cyclonopedia', meta: 'Book · Reza Negarestani · €24', body: 'Re:press, 2008. Theory-fiction on petroleum and the Middle East.' },
    ],
  },
};

// ── Right panel: contributors ─────────────────────────────────────────────────
export const CONTRIBUTORS = [
  { name: 'Hito Steyerl', role: 'Contributing Artist' },
  { name: 'Keller Easterling', role: 'Architecture Theory' },
  { name: 'Saidiya Hartman', role: 'Critical Essays' },
  { name: 'Metahaven', role: 'Visual Identity' },
  { name: 'Paul B. Preciado', role: 'Theory & Politics' },
  { name: 'Reza Negarestani', role: 'Philosophy' },
];

// ── Bottom panel: social + events ─────────────────────────────────────────────
export const SOCIAL = [
  { name: 'Instagram', handle: '@e.flux', href: 'https://instagram.com' },
  { name: 'X / Twitter', handle: '@eflux', href: 'https://x.com' },
  { name: 'Facebook', handle: 'e-flux', href: 'https://facebook.com' },
  { name: 'Are.na', handle: 'e-flux', href: 'https://are.na' },
  { name: 'RSS', handle: 'Feed', href: '#' },
];

export const EVENTS = [
  {
    title: 'Territorial Spirits',
    date: 'May 8 – June 14, 2026',
    desc: 'A group exhibition exploring land, memory, and ancestral claim in contested geographies.',
  },
  {
    title: 'Reading Group: Queer Ecologies',
    date: 'Every Thursday, May 2026',
    desc: 'A five-week reading group around selected texts on queerness, ecology, and entanglement.',
  },
  {
    title: 'Symposium: After the Archive',
    date: 'June 3–4, 2026 · Berlin',
    desc: 'Two days of panels, performances, and discussions on institutional memory and its failures.',
  },
  {
    title: 'Film Screening: Unfinished Sentences',
    date: 'May 29, 2026 · New York',
    desc: 'A programme of short films on fragmentation, incomplete language, and the pauses between.',
  },
];
