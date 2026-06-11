export interface SignatureFont {
  id: string;
  name: string;
  family: string;
  weight: number;
  description: string;
  tags: string[];
}

export interface PenType {
  id: string;
  label: string;
  color: string;
  filter: string;          // CSS filter for ink simulation
  description: string;
  category: 'ballpoint' | 'ink' | 'gel';
}

export const SIGNATURE_FONTS: SignatureFont[] = [
  {
    id: 'great-vibes',
    name: 'Elegant Script',
    family: 'Great Vibes',
    weight: 400,
    description: 'Flowing, formal elegance — ideal for wedding & official use',
    tags: ['formal', 'wedding', 'classic'],
  },
  {
    id: 'pinyon-script',
    name: 'Calligraphy',
    family: 'Pinyon Script',
    weight: 400,
    description: 'Timeless calligraphic strokes — professional & authoritative',
    tags: ['formal', 'professional', 'calligraphy'],
  },
  {
    id: 'alex-brush',
    name: 'Refined',
    family: 'Alex Brush',
    weight: 400,
    description: 'Clean, balanced letterforms — great for business signatures',
    tags: ['professional', 'business', 'clean'],
  },
  {
    id: 'dancing-script',
    name: 'Natural',
    family: 'Dancing Script',
    weight: 700,
    description: 'Organic hand-written feel — casual and approachable',
    tags: ['casual', 'friendly', 'natural'],
  },
  {
    id: 'allura',
    name: 'Graceful',
    family: 'Allura',
    weight: 400,
    description: 'Graceful thin strokes — delicate and feminine',
    tags: ['elegant', 'feminine', 'wedding'],
  },
  {
    id: 'pacifico',
    name: 'Bold',
    family: 'Pacifico',
    weight: 400,
    description: 'Strong, confident presence — stands out on any document',
    tags: ['bold', 'casual', 'fun'],
  },
  {
    id: 'sacramento',
    name: 'Delicate',
    family: 'Sacramento',
    weight: 400,
    description: 'Ultra-thin delicate strokes — artistic and refined',
    tags: ['delicate', 'thin', 'artistic'],
  },
  {
    id: 'mr-dafoe',
    name: 'Expressive',
    family: 'Mr Dafoe',
    weight: 400,
    description: 'Expressive brush lettering — bold personality',
    tags: ['artistic', 'brush', 'expressive'],
  },
  {
    id: 'cookie',
    name: 'Friendly',
    family: 'Cookie',
    weight: 400,
    description: 'Warm and approachable — perfect for everyday signing',
    tags: ['casual', 'warm', 'friendly'],
  },
  {
    id: 'yellowtail',
    name: 'Retro',
    family: 'Yellowtail',
    weight: 400,
    description: 'Lively retro flair — creative and energetic',
    tags: ['retro', 'fun', 'vibrant'],
  },
];

export const PEN_TYPES: PenType[] = [
  {
    id: 'blue-ballpoint',
    label: 'Blue Ballpoint',
    color: '#1a3a7a',
    filter: 'none',
    description: 'Classic everyday blue pen — slightly muted, consistent stroke',
    category: 'ballpoint',
  },
  {
    id: 'black-ballpoint',
    label: 'Black Ballpoint',
    color: '#1a1a1a',
    filter: 'none',
    description: 'Standard black ballpoint — clean, professional',
    category: 'ballpoint',
  },
  {
    id: 'blue-ink',
    label: 'Blue Ink Pen',
    color: '#1b2f8a',
    filter: 'blur(0.4px) opacity(0.92)',
    description: 'Rich fountain pen ink — deep colour with soft feathering',
    category: 'ink',
  },
  {
    id: 'black-ink',
    label: 'Black Ink Pen',
    color: '#050505',
    filter: 'blur(0.35px) opacity(0.95)',
    description: 'Deep fountain pen ink — intense, classic document black',
    category: 'ink',
  },
  {
    id: 'blue-gel',
    label: 'Blue Gel Pen',
    color: '#1565c0',
    filter: 'drop-shadow(0 0 0.5px rgba(21,101,192,0.4))',
    description: 'Vivid smooth gel pen — bold, vibrant blue',
    category: 'gel',
  },
  {
    id: 'black-gel',
    label: 'Black Gel Pen',
    color: '#000000',
    filter: 'drop-shadow(0 0 0.4px rgba(0,0,0,0.3))',
    description: 'Smooth black gel — ultra-dark, rich finish',
    category: 'gel',
  },
  {
    id: 'red-ink',
    label: 'Red Ink',
    color: '#7f0000',
    filter: 'blur(0.3px) opacity(0.93)',
    description: 'Deep red fountain pen ink — striking and authoritative',
    category: 'ink',
  },
  {
    id: 'purple-gel',
    label: 'Purple Gel',
    color: '#4a148c',
    filter: 'drop-shadow(0 0 0.5px rgba(74,20,140,0.35))',
    description: 'Rich purple gel pen — distinctive and creative',
    category: 'gel',
  },
  {
    id: 'teal-ink',
    label: 'Teal Ink',
    color: '#00433a',
    filter: 'blur(0.3px) opacity(0.94)',
    description: 'Deep teal fountain ink — unique, memorable signature',
    category: 'ink',
  },
  {
    id: 'sepia-ink',
    label: 'Sepia Ink',
    color: '#5c2e00',
    filter: 'blur(0.4px) opacity(0.90)',
    description: 'Vintage sepia brown — old-world elegance',
    category: 'ink',
  },
];

export const PAPER_TYPES = [
  { id: 'white',  label: 'White Paper',  bg: '#ffffff', rule: 'rgba(200,200,220,0.35)' },
  { id: 'cream',  label: 'Cream Paper',  bg: '#fefaf3', rule: 'rgba(180,160,100,0.25)' },
  { id: 'lined',  label: 'Lined Paper',  bg: '#f8faff', rule: 'rgba(100,140,255,0.22)' },
  { id: 'none',   label: 'No Paper',     bg: 'transparent', rule: 'transparent' },
];

export const FONT_SIZES = [36, 44, 52, 60, 72];

export const FONT_CLASS_MAP: Record<string, string> = {
  'Great Vibes':    'font-great-vibes',
  'Pinyon Script':  'font-pinyon-script',
  'Alex Brush':     'font-alex-brush',
  'Dancing Script': 'font-dancing-script',
  'Allura':         'font-allura',
  'Pacifico':       'font-pacifico',
  'Sacramento':     'font-sacramento',
  'Mr Dafoe':       'font-mr-dafoe',
  'Cookie':         'font-cookie',
  'Yellowtail':     'font-yellowtail',
};
