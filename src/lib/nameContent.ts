// Per-name editorial content for the curated /signature/[name] pages.
// Each entry is real, name-specific data (etymology + meaning) so every page
// carries unique, non-templated content. The signature-character note is
// derived from the actual letters of the name, so it differs per name too.

export interface NameContent {
  origin: string;          // language / cultural origin
  meaning: string;         // established meaning
  styles: [string, string, string]; // recommended SIGNATURE_FONTS ids
}

// Curated keep-list — every name here has demonstrated real search demand
// in Google Search Console (5+ impressions, or earned clicks).
export const NAME_CONTENT: Record<string, NameContent> = {
  // — Indian / Sanskrit —
  priya:   { origin: 'Sanskrit', meaning: 'beloved, dear one', styles: ['allura', 'sacramento', 'great-vibes'] },
  anjali:  { origin: 'Sanskrit', meaning: 'offering; the gesture of folded hands in reverence', styles: ['allura', 'great-vibes', 'sacramento'] },
  neha:    { origin: 'Hindi / Sanskrit', meaning: 'love and affection; gentle rain', styles: ['allura', 'sacramento', 'dancing-script'] },
  pooja:   { origin: 'Sanskrit', meaning: 'worship; an act of reverence', styles: ['allura', 'great-vibes', 'sacramento'] },
  rahul:   { origin: 'Sanskrit', meaning: 'conqueror of all miseries', styles: ['great-vibes', 'alex-brush', 'dancing-script'] },
  vikram:  { origin: 'Sanskrit', meaning: 'valour, heroism, stride of power', styles: ['pinyon-script', 'mr-dafoe', 'alex-brush'] },

  // — Arabic —
  ahmed:   { origin: 'Arabic', meaning: 'most praiseworthy, highly praised', styles: ['pinyon-script', 'great-vibes', 'mr-dafoe'] },
  omar:    { origin: 'Arabic', meaning: 'flourishing, long-lived, thriving', styles: ['alex-brush', 'pinyon-script', 'mr-dafoe'] },
  hassan:  { origin: 'Arabic', meaning: 'handsome; doer of good', styles: ['great-vibes', 'alex-brush', 'pinyon-script'] },
  zainab:  { origin: 'Arabic', meaning: 'a fragrant flowering plant', styles: ['allura', 'great-vibes', 'sacramento'] },
  fatima:  { origin: 'Arabic', meaning: 'captivating; one who abstains', styles: ['allura', 'great-vibes', 'sacramento'] },

  // — Hebrew / Biblical —
  david:    { origin: 'Hebrew', meaning: 'beloved', styles: ['great-vibes', 'pinyon-script', 'alex-brush'] },
  john:     { origin: 'Hebrew', meaning: 'God is gracious', styles: ['pinyon-script', 'alex-brush', 'great-vibes'] },
  joshua:   { origin: 'Hebrew', meaning: 'the Lord is salvation', styles: ['great-vibes', 'alex-brush', 'dancing-script'] },
  matthew:  { origin: 'Hebrew', meaning: 'gift of God', styles: ['alex-brush', 'great-vibes', 'pinyon-script'] },
  noah:     { origin: 'Hebrew', meaning: 'rest, comfort', styles: ['dancing-script', 'cookie', 'great-vibes'] },
  james:    { origin: 'Hebrew', meaning: 'one who follows; supplanter', styles: ['pinyon-script', 'alex-brush', 'great-vibes'] },
  benjamin: { origin: 'Hebrew', meaning: 'son of the right hand', styles: ['great-vibes', 'alex-brush', 'dancing-script'] },
  ethan:    { origin: 'Hebrew', meaning: 'strong, firm, enduring', styles: ['alex-brush', 'dancing-script', 'great-vibes'] },
  anna:     { origin: 'Hebrew', meaning: 'grace, favour', styles: ['allura', 'great-vibes', 'sacramento'] },
  rebecca:  { origin: 'Hebrew', meaning: 'to bind; captivating', styles: ['allura', 'great-vibes', 'sacramento'] },
  jessica:  { origin: 'Hebrew', meaning: 'God beholds; foresight', styles: ['allura', 'dancing-script', 'sacramento'] },
  lisa:     { origin: 'Hebrew (from Elizabeth)', meaning: 'God is my oath', styles: ['allura', 'sacramento', 'great-vibes'] },

  // — Greek —
  george:    { origin: 'Greek', meaning: 'farmer, worker of the earth', styles: ['pinyon-script', 'great-vibes', 'alex-brush'] },
  steven:    { origin: 'Greek', meaning: 'crown, garland', styles: ['great-vibes', 'alex-brush', 'dancing-script'] },
  andrew:    { origin: 'Greek', meaning: 'manly, brave', styles: ['alex-brush', 'pinyon-script', 'mr-dafoe'] },
  jason:     { origin: 'Greek', meaning: 'healer', styles: ['dancing-script', 'alex-brush', 'pacifico'] },
  sandra:    { origin: 'Greek (from Alexandra)', meaning: 'defender of the people', styles: ['great-vibes', 'allura', 'alex-brush'] },
  stephanie: { origin: 'Greek', meaning: 'crown, garland', styles: ['allura', 'great-vibes', 'sacramento'] },
  dorothy:   { origin: 'Greek', meaning: 'gift of God', styles: ['great-vibes', 'allura', 'sacramento'] },

  // — Latin —
  paul:     { origin: 'Latin', meaning: 'small, humble', styles: ['great-vibes', 'alex-brush', 'dancing-script'] },
  mark:     { origin: 'Latin', meaning: 'dedicated to Mars; warlike', styles: ['alex-brush', 'dancing-script', 'pacifico'] },
  lucas:    { origin: 'Latin', meaning: 'bringer of light', styles: ['dancing-script', 'great-vibes', 'alex-brush'] },
  oliver:   { origin: 'Latin / Norman', meaning: 'olive tree, a symbol of peace', styles: ['great-vibes', 'allura', 'dancing-script'] },
  justin:   { origin: 'Latin', meaning: 'just, fair, righteous', styles: ['alex-brush', 'dancing-script', 'great-vibes'] },
  anthony:  { origin: 'Latin', meaning: 'priceless, of inestimable worth', styles: ['pinyon-script', 'great-vibes', 'mr-dafoe'] },
  olivia:   { origin: 'Latin', meaning: 'olive tree', styles: ['allura', 'great-vibes', 'sacramento'] },
  ava:      { origin: 'Latin', meaning: 'life; like a bird', styles: ['sacramento', 'allura', 'dancing-script'] },
  emily:    { origin: 'Latin', meaning: 'industrious, striving', styles: ['allura', 'sacramento', 'dancing-script'] },
  amy:      { origin: 'Latin / French', meaning: 'beloved', styles: ['sacramento', 'allura', 'cookie'] },
  laura:    { origin: 'Latin', meaning: 'laurel; victory and honour', styles: ['allura', 'great-vibes', 'sacramento'] },
  patricia: { origin: 'Latin', meaning: 'noble, of patrician rank', styles: ['great-vibes', 'allura', 'pinyon-script'] },

  // — Germanic / Norse —
  robert:  { origin: 'Germanic', meaning: 'bright fame', styles: ['pinyon-script', 'alex-brush', 'great-vibes'] },
  richard: { origin: 'Germanic', meaning: 'brave, strong ruler', styles: ['alex-brush', 'pinyon-script', 'mr-dafoe'] },
  edward:  { origin: 'Old English', meaning: 'wealthy guardian', styles: ['pinyon-script', 'great-vibes', 'alex-brush'] },
  jeffrey: { origin: 'Germanic', meaning: 'peace of God', styles: ['great-vibes', 'alex-brush', 'dancing-script'] },
  eric:    { origin: 'Old Norse', meaning: 'eternal ruler, ever powerful', styles: ['alex-brush', 'mr-dafoe', 'pacifico'] },
  emma:    { origin: 'Germanic', meaning: 'whole, universal', styles: ['great-vibes', 'allura', 'dancing-script'] },

  // — Celtic / Welsh / Irish / Gaelic —
  kenneth: { origin: 'Scottish Gaelic', meaning: 'handsome; born of fire', styles: ['pinyon-script', 'alex-brush', 'mr-dafoe'] },
  liam:    { origin: 'Irish (from William)', meaning: 'strong-willed protector', styles: ['alex-brush', 'dancing-script', 'pacifico'] },
  kevin:   { origin: 'Irish', meaning: 'handsome, gentle, kind', styles: ['dancing-script', 'cookie', 'alex-brush'] },
  ryan:    { origin: 'Irish', meaning: 'little king', styles: ['dancing-script', 'alex-brush', 'pacifico'] },
  owen:    { origin: 'Welsh', meaning: 'young warrior; noble-born', styles: ['alex-brush', 'dancing-script', 'great-vibes'] },

  // — Aramaic —
  thomas:  { origin: 'Aramaic', meaning: 'twin', styles: ['great-vibes', 'pinyon-script', 'alex-brush'] },
};

export const KEPT_NAME_SLUGS = Object.keys(NAME_CONTENT);

const ASCENDERS = new Set(['b', 'd', 'f', 'h', 'k', 'l', 't']);
const DESCENDERS = new Set(['g', 'j', 'p', 'q', 'y', 'z']);

// Build a genuinely name-specific note about signing this name.
export function signatureNote(cap: string): string {
  const lower = cap.toLowerCase();
  const letters = lower.split('');
  const asc = [...new Set(letters.filter(c => ASCENDERS.has(c)))];
  const desc = [...new Set(letters.filter(c => DESCENDERS.has(c)))];
  const initial = cap.charAt(0);

  const parts: string[] = [];
  parts.push(`The capital ${initial} sets the tone of a ${cap} signature — give it a confident opening loop and the rest of the name flows from it.`);

  if (desc.length) {
    const d = desc.join(', ').toUpperCase();
    parts.push(`The descending letter${desc.length > 1 ? 's' : ''} (${d}) drop${desc.length > 1 ? '' : 's'} below the line, giving you a natural place to sweep an underline back beneath the name.`);
  } else if (asc.length) {
    const a = asc.join(', ').toUpperCase();
    parts.push(`The tall letter${asc.length > 1 ? 's' : ''} (${a}) rise above the line — exaggerate their height slightly for an elegant, unmistakable mark.`);
  } else {
    parts.push(`With no ascenders or descenders to anchor it, ${cap} reads cleanest in a flowing script where the connecting strokes do the work.`);
  }

  if (letters.length <= 4) {
    parts.push(`Because ${cap} is short, a single unbroken stroke keeps it looking deliberate rather than rushed.`);
  } else {
    parts.push(`At ${letters.length} letters, ${cap} has room for a longer trailing flourish off the final letter.`);
  }
  return parts.join(' ');
}

export function getNameMeta(name: string) {
  const cap = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const c = NAME_CONTENT[name.toLowerCase()];
  if (c) {
    return {
      title: `${cap} Signature — ${c.meaning.split(';')[0].replace(/,.*/, '')} | Free Signature Generator`,
      description: `Create a free handwritten signature for the name ${cap} (${c.origin}, meaning "${c.meaning}"). Pick a style, customise the pen, download PNG or SVG.`.slice(0, 160),
      h1: `${cap} Signature Generator`,
      intro: `${cap} is a name of ${c.origin} origin meaning "${c.meaning}". Create a beautiful handwritten ${cap} signature below — choose a style, customise the colour and pen, then download it free as a PNG or SVG.`,
    };
  }
  return {
    title: `${cap} Signature — Free Signature Generator`,
    description: `Generate a free handwritten signature for the name ${cap}. Choose a style, customise the pen, and download as PNG or SVG.`,
    h1: `${cap} Signature Generator`,
    intro: `Create a handwritten signature for the name "${cap}" below — choose a style, customise the colour, then download free as a PNG or SVG.`,
  };
}
