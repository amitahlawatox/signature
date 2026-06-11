import { useState, useRef, useCallback } from 'react';
import { SIGNATURE_FONTS, PEN_TYPES, PAPER_TYPES, FONT_SIZES, FONT_CLASS_MAP } from '../lib/fonts';

interface Props { defaultName?: string; }

export default function SignatureGenerator({ defaultName = '' }: Props) {
  const [name, setName]         = useState(defaultName);
  const [selectedFont, setFont] = useState(SIGNATURE_FONTS[0]);
  const [pen, setPen]           = useState(PEN_TYPES[0]);   // blue-ballpoint
  const [paper, setPaper]       = useState(PAPER_TYPES[0]); // white
  const [fontSize, setFontSize] = useState(52);
  const [downloaded, setDl]     = useState(false);
  const [svgDl, setSvgDl]       = useState(false);

  const displayName = name.trim() || 'Your Name';

  const downloadPNG = useCallback(() => {
    const canvas = document.createElement('canvas');
    const scale  = 3;
    canvas.width  = 700 * scale;
    canvas.height = 220 * scale;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(scale, scale);
    // Paper background
    ctx.fillStyle = paper.id === 'none' ? '#ffffff' : paper.bg;
    ctx.fillRect(0, 0, 700, 220);
    // Ruled line for lined paper
    if (paper.id === 'lined') {
      ctx.strokeStyle = paper.rule;
      ctx.lineWidth = 0.8;
      for (let y = 30; y < 220; y += 28) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(700, y); ctx.stroke();
      }
    }
    // Signature baseline
    ctx.strokeStyle = paper.rule;
    ctx.lineWidth = 0.6;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(60, 158); ctx.lineTo(640, 158); ctx.stroke();
    ctx.setLineDash([]);
    // Text
    ctx.fillStyle = pen.color;
    ctx.font = `${selectedFont.weight} ${fontSize}px '${selectedFont.family}', cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(displayName, 350, 150);
    const link = document.createElement('a');
    link.download = `${displayName.toLowerCase().replace(/\s+/g, '-')}-signature.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDl(true); setTimeout(() => setDl(false), 2500);
  }, [name, selectedFont, pen, paper, fontSize, displayName]);

  const downloadSVG = useCallback(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="220" viewBox="0 0 700 220">
  <rect width="700" height="220" fill="${paper.id === 'none' ? '#ffffff' : paper.bg}"/>
  <line x1="60" y1="158" x2="640" y2="158" stroke="${paper.rule}" stroke-width="0.6" stroke-dasharray="4 4"/>
  <text x="350" y="150" text-anchor="middle" dominant-baseline="alphabetic"
    font-family="${selectedFont.family}, cursive"
    font-size="${fontSize}" font-weight="${selectedFont.weight}" fill="${pen.color}"
    filter="${pen.filter !== 'none' ? `url(#ink)` : ''}"
  >${displayName}</text>
  ${pen.filter !== 'none' ? `<defs><filter id="ink"><feGaussianBlur stdDeviation="0.3" result="blur"/><feBlend in="SourceGraphic" in2="blur" mode="normal"/></filter></defs>` : ''}
</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${displayName.toLowerCase().replace(/\s+/g, '-')}-signature.svg`;
    link.href = url; link.click();
    URL.revokeObjectURL(url);
    setSvgDl(true); setTimeout(() => setSvgDl(false), 2500);
  }, [name, selectedFont, pen, paper, fontSize, displayName]);

  // Group pens by category
  const ballpointPens = PEN_TYPES.filter(p => p.category === 'ballpoint');
  const inkPens       = PEN_TYPES.filter(p => p.category === 'ink');
  const gelPens       = PEN_TYPES.filter(p => p.category === 'gel');

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
          }}
          onFocus={e => { e.currentTarget.style.border = '1px solid rgba(167,139,250,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(167,139,250,0.08)'; }}
          onBlur={e  => { e.currentTarget.style.border = '1px solid rgba(167,139,250,0.25)'; e.currentTarget.style.boxShadow = 'none'; }}
          aria-label="Enter your name to generate a signature"
        />
        {name && (
          <button onClick={() => setName('')} aria-label="Clear"
            className="absolute right-5 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-text-muted)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── Live preview ── */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: paper.id === 'none' ? 'rgba(255,255,255,0.06)' : paper.bg,
          border: paper.id === 'none' ? '1px solid rgba(167,139,250,0.2)' : '1px solid rgba(0,0,0,0.08)',
          minHeight: '160px',
          padding: '40px 48px 48px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}
        aria-live="polite"
      >
        {/* Lined paper rules */}
        {paper.id === 'lined' && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {[30,58,86,114,142].map(y => (
              <div key={y} className="absolute left-0 right-0" style={{ top: `${y}px`, borderTop: `1px solid ${paper.rule}` }} />
            ))}
          </div>
        )}
        {/* Cream paper texture hint */}
        {paper.id === 'cream' && (
          <div className="absolute inset-0 pointer-events-none opacity-30"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Crect width=\'4\' height=\'4\' fill=\'%23f5e6c8\'/%3E%3Crect x=\'0\' y=\'0\' width=\'1\' height=\'1\' fill=\'%23e8d5a3\' opacity=\'0.4\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
        )}
        {/* Signature baseline */}
        <div className="absolute left-12 right-12 border-b border-dashed" style={{ bottom: '44px', borderColor: paper.rule }} />
        {/* Signature text */}
        <div className="relative flex items-end justify-center" style={{ minHeight: '100px' }}>
          <span
            className={`select-none leading-none ${FONT_CLASS_MAP[selectedFont.family]}`}
            style={{
              fontSize: `${fontSize}px`,
              color: pen.color,
              fontWeight: selectedFont.weight,
              filter: pen.filter,
              display: 'block',
              paddingBottom: '8px',
            }}
          >
            {displayName}
          </span>
        </div>
      </div>

      {/* ── Controls row ── */}
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

        {/* Paper */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Paper</p>
          <div className="flex gap-2 flex-wrap">
            {PAPER_TYPES.map(pt => (
              <button key={pt.id} onClick={() => setPaper(pt)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={paper.id === pt.id
                  ? { background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff' }
                  : { background: 'rgba(255,255,255,0.04)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }
                }>{pt.label}</button>
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
            {svgDl ? '✓ Downloaded!' : 'Download SVG'}
          </button>
        </div>
      </div>

      {/* ── Pen type selector ── */}
      <div className="rounded-2xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>Pen Type</p>
        <div className="space-y-4">
          {[
            { label: 'Ballpoint', pens: ballpointPens },
            { label: 'Ink Pen',   pens: inkPens },
            { label: 'Gel Pen',   pens: gelPens },
          ].map(group => (
            <div key={group.label}>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}>{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.pens.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPen(p)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={pen.id === p.id
                      ? { background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(167,139,250,0.5)', color: '#c4b5fd' }
                      : { background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }
                    }
                  >
                    {/* Ink dot */}
                    <span className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        background: p.color,
                        boxShadow: pen.id === p.id ? `0 0 6px ${p.color}80` : 'none',
                        border: p.color === '#ffffff' || p.color === '#f8faff' ? '1px solid rgba(0,0,0,0.2)' : 'none',
                      }} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Current pen description */}
        <p className="mt-3 text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.8 }}>
          {pen.description}
        </p>
      </div>

      {/* ── Style grid ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Signature Style — {SIGNATURE_FONTS.length} Available
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
              {/* Preview on paper */}
              <div className="rounded-lg overflow-hidden" style={{ background: '#fff', padding: '8px 16px 12px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="border-b border-dashed" style={{ borderColor: 'rgba(100,140,255,0.2)', paddingBottom: '6px' }}>
                  <div
                    className={`leading-none overflow-hidden text-ellipsis whitespace-nowrap ${FONT_CLASS_MAP[font.family]}`}
                    style={{ fontSize: '40px', color: pen.color, fontWeight: font.weight, filter: pen.filter }}
                    aria-hidden="true"
                  >{displayName}</div>
                </div>
              </div>
              <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>{font.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
