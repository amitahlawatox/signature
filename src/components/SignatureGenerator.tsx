import { useState, useRef, useCallback } from 'react';
import { SIGNATURE_FONTS, FONT_COLORS, FONT_SIZES } from '../lib/fonts';

interface Props { defaultName?: string; }

const FONT_CLASS_MAP: Record<string, string> = {
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

export default function SignatureGenerator({ defaultName = '' }: Props) {
  const [name, setName]             = useState(defaultName);
  const [selectedFont, setFont]     = useState(SIGNATURE_FONTS[0]);
  const [color, setColor]           = useState('#c4b5fd');
  const [fontSize, setFontSize]     = useState(56);
  const [downloaded, setDownloaded] = useState(false);
  const [svgDownloaded, setSvgDl]   = useState(false);

  const displayName = name.trim() || 'Your Name';

  const downloadPNG = useCallback(() => {
    const canvas = document.createElement('canvas');
    const scale = 3;
    canvas.width  = 700 * scale;
    canvas.height = 200 * scale;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(scale, scale);
    ctx.fillStyle = '#0c0a18';
    ctx.fillRect(0, 0, 700, 200);
    ctx.fillStyle = color;
    ctx.font = `${selectedFont.weight} ${fontSize}px '${selectedFont.family}', cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayName, 350, 100);
    const link = document.createElement('a');
    link.download = `${displayName.toLowerCase().replace(/\s+/g,'-')}-signature.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  }, [name, selectedFont, color, fontSize, displayName]);

  const downloadSVG = useCallback(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="200" viewBox="0 0 700 200">
  <rect width="700" height="200" fill="#0c0a18"/>
  <text x="350" y="115" text-anchor="middle" dominant-baseline="middle"
    font-family="${selectedFont.family}, cursive"
    font-size="${fontSize}" font-weight="${selectedFont.weight}" fill="${color}">${displayName}</text>
</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${displayName.toLowerCase().replace(/\s+/g,'-')}-signature.svg`;
    link.href = url; link.click();
    URL.revokeObjectURL(url);
    setSvgDl(true);
    setTimeout(() => setSvgDl(false), 2500);
  }, [name, selectedFont, color, fontSize, displayName]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">

      {/* ── Name input ── */}
      <div className="relative">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type your name here…"
          maxLength={40}
          className="w-full rounded-2xl border px-6 py-5 text-xl font-medium outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(167,139,250,0.25)',
            color: 'var(--color-text)',
            boxShadow: 'inset 0 0 0 0 transparent',
          }}
          onFocus={e => { e.currentTarget.style.border = '1px solid rgba(167,139,250,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(167,139,250,0.08)'; }}
          onBlur={e  => { e.currentTarget.style.border = '1px solid rgba(167,139,250,0.25)'; e.currentTarget.style.boxShadow = 'none'; }}
          aria-label="Enter your name to generate a signature"
        />
        {name && (
          <button onClick={() => setName('')} aria-label="Clear"
            className="absolute right-5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100 opacity-50"
            style={{ color: 'var(--color-text-muted)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── Live preview ── */}
      <div
        className="relative rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg,rgba(124,58,237,0.08),rgba(168,85,247,0.05),rgba(236,72,153,0.05))',
          border: '1px solid rgba(167,139,250,0.2)',
          minHeight: '160px',
          padding: '32px 40px',
        }}
        aria-live="polite"
      >
        {/* Subtle ruled line */}
        <div className="absolute bottom-10 left-12 right-12 border-b border-dashed" style={{ borderColor: 'rgba(167,139,250,0.15)' }} />
        <span
          className={`relative z-10 select-none leading-none ${FONT_CLASS_MAP[selectedFont.family]}`}
          style={{ fontSize: `${fontSize}px`, color, fontWeight: selectedFont.weight }}
        >
          {displayName}
        </span>
      </div>

      {/* ── Controls ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Size */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Size</p>
          <div className="flex gap-2 flex-wrap">
            {FONT_SIZES.map(s => (
              <button key={s} onClick={() => setFontSize(s)}
                className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all"
                style={fontSize === s
                  ? { background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff' }
                  : { background: 'rgba(255,255,255,0.04)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }
                }>{s}</button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Color</p>
          <div className="flex gap-2.5 flex-wrap">
            {[
              { value: '#c4b5fd', label: 'Lavender' },
              { value: '#f9a8d4', label: 'Rose' },
              { value: '#ffffff', label: 'White' },
              { value: '#fbbf24', label: 'Gold' },
              { value: '#6ee7b7', label: 'Mint' },
              { value: '#93c5fd', label: 'Sky' },
              { value: '#0f172a', label: 'Ink' },
              { value: '#4c1d95', label: 'Deep Violet' },
              { value: '#be185d', label: 'Crimson' },
              { value: '#064e3b', label: 'Forest' },
            ].map(c => (
              <button key={c.value} onClick={() => setColor(c.value)} title={c.label}
                aria-label={c.label}
                className="w-7 h-7 rounded-full transition-all hover:scale-110"
                style={{
                  background: c.value,
                  border: color === c.value ? `2px solid rgba(255,255,255,0.8)` : '2px solid rgba(255,255,255,0.1)',
                  boxShadow: color === c.value ? `0 0 12px ${c.value}80` : 'none',
                  transform: color === c.value ? 'scale(1.15)' : 'scale(1)',
                }} />
            ))}
          </div>
        </div>

        {/* Download */}
        <div className="rounded-2xl p-4 flex flex-col gap-2.5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Download</p>
          <button onClick={downloadPNG}
            className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', boxShadow: '0 4px 16px rgba(124,58,237,0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {downloaded ? '✓ Downloaded!' : 'Download PNG'}
          </button>
          <button onClick={downloadSVG}
            className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all hover:opacity-80 active:scale-95"
            style={{ border: '1px solid rgba(167,139,250,0.35)', color: '#c4b5fd', background: 'rgba(167,139,250,0.06)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {svgDownloaded ? '✓ Downloaded!' : 'Download SVG'}
          </button>
        </div>
      </div>

      {/* ── Style grid ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Choose Style — {SIGNATURE_FONTS.length} Available
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SIGNATURE_FONTS.map(font => (
            <button key={font.id} onClick={() => setFont(font)}
              className="style-card group relative rounded-2xl p-5 text-left transition-all"
              style={selectedFont.id === font.id
                ? { background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(167,139,250,0.5)', boxShadow: '0 0 20px rgba(124,58,237,0.15)' }
                : { background: 'var(--color-surface)', border: '1px solid var(--color-border)' }
              }
              aria-pressed={selectedFont.id === font.id}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: selectedFont.id === font.id ? '#a78bfa' : 'var(--color-text-muted)' }}>
                  {font.name}
                </span>
                {selectedFont.id === font.id && (
                  <span style={{ color: '#a78bfa' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </span>
                )}
              </div>
              <div
                className={`leading-none overflow-hidden text-ellipsis whitespace-nowrap ${FONT_CLASS_MAP[font.family]}`}
                style={{ fontSize: '42px', color, fontWeight: font.weight }}
                aria-hidden="true"
              >{displayName}</div>
              <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>{font.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
