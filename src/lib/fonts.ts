export interface SignatureFont {
  id: string;
  name: string;
  family: string;
  style: string;
  weight: number;
  description: string;
  tags: string[];
}

export const SIGNATURE_FONTS: SignatureFont[] = [
  {
    id: 'elegant',
    name: 'Elegant',
    family: 'Great Vibes',
    style: 'cursive',
    weight: 400,
    description: 'Flowing, formal elegance',
    tags: ['formal', 'wedding', 'classic'],
  },
  {
    id: 'classic',
    name: 'Classic',
    family: 'Pinyon Script',
    style: 'cursive',
    weight: 400,
    description: 'Timeless calligraphic style',
    tags: ['formal', 'professional', 'calligraphy'],
  },
  {
    id: 'refined',
    name: 'Refined',
    family: 'Alex Brush',
    style: 'cursive',
    weight: 400,
    description: 'Clean and professional',
    tags: ['professional', 'business', 'clean'],
  },
  {
    id: 'flowing',
    name: 'Flowing',
    family: 'Dancing Script',
    style: 'cursive',
    weight: 700,
    description: 'Natural hand-written feel',
    tags: ['casual', 'friendly', 'natural'],
  },
  {
    id: 'graceful',
    name: 'Graceful',
    family: 'Allura',
    style: 'cursive',
    weight: 400,
    description: 'Graceful and feminine',
    tags: ['elegant', 'feminine', 'wedding'],
  },
  {
    id: 'bold',
    name: 'Bold',
    family: 'Pacifico',
    style: 'cursive',
    weight: 400,
    description: 'Strong, confident presence',
    tags: ['bold', 'casual', 'fun'],
  },
  {
    id: 'delicate',
    name: 'Delicate',
    family: 'Sacramento',
    style: 'cursive',
    weight: 400,
    description: 'Thin, delicate strokes',
    tags: ['delicate', 'thin', 'artistic'],
  },
  {
    id: 'expressive',
    name: 'Expressive',
    family: 'Mr Dafoe',
    style: 'cursive',
    weight: 400,
    description: 'Expressive brush lettering',
    tags: ['artistic', 'brush', 'expressive'],
  },
  {
    id: 'sweet',
    name: 'Sweet',
    family: 'Cookie',
    style: 'cursive',
    weight: 400,
    description: 'Warm and approachable',
    tags: ['casual', 'warm', 'friendly'],
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    family: 'Yellowtail',
    style: 'cursive',
    weight: 400,
    description: 'Lively retro flair',
    tags: ['retro', 'fun', 'vibrant'],
  },
];

export const FONT_COLORS = [
  { id: 'midnight', label: 'Midnight', value: '#1e1b4b' },
  { id: 'navy', label: 'Navy', value: '#1e3a5f' },
  { id: 'black', label: 'Black', value: '#0f172a' },
  { id: 'royal', label: 'Royal', value: '#4338ca' },
  { id: 'violet', label: 'Violet', value: '#7c3aed' },
  { id: 'rose', label: 'Rose', value: '#be185d' },
  { id: 'forest', label: 'Forest', value: '#166534' },
  { id: 'gold', label: 'Gold', value: '#92400e' },
  { id: 'slate', label: 'Slate', value: '#475569' },
  { id: 'crimson', label: 'Crimson', value: '#991b1b' },
];

export const FONT_SIZES = [32, 40, 48, 56, 64, 72];
