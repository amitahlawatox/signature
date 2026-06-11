import { useState, useCallback, useRef, useEffect } from 'react';
import { SIGNATURE_FONTS, PEN_TYPES, PAPER_TYPES, FONT_SIZES, FONT_CLASS_MAP } from '../lib/fonts';

interface Props { defaultName?: string; }

type Tab = 'type' | 'draw';

export default function SignatureGenerator({ defaultName = '' }: Props) {
  const [tab, setTab]           = useState<Tab>('type');
  const [name, setName]         = useState(defaultName);
  const [selectedFont, setFont] = useState(SIGNATURE_FONTS[0]);
  const [pen, setPen]           = useState(PEN_TYPES[0]);
  const [paper, setPaper]       = useState(PAPER_TYPES[0]);
  const [fontSize, setFontSize] = useState(52);
  const [downloaded, setDl]     = useState(false);
  const [svgDl, setSvgDl]       = useState(false);

  // Draw tab state
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const isDrawing       = useRef(false);
  const lastPos         = useRef<{ x: number; y: number } | null>(null);
  const [hasStrokes, setHasStrokes] = useState(false);
  const [drawPen, setDrawPen]       = useState(PEN_TYPES[0]);
  const [drawPaper, setDrawPaper]   = useState(PAPER_TYPES[0]);
  const [brushSize, setBrushSize]   = useState(2);

  const displayName = name.trim() || 'Your Name';

  // ── Canvas draw helpers ──────────────────────────────────────────
  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: ((e as MouseEvent).clientX - rect.left) * scaleX, y: ((e as MouseEvent).clientY - rect.top) * scaleY };
  };

  const fillCanvasBg = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = drawPaper.id === 'none' ? '#ffffff' : drawPaper.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (drawPaper.id === 'lined') {
      ctx.strokeStyle = drawPaper.rule; ctx.lineWidth = 0.8;
      for (let y = 30; y < canvas.height; y += 28) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
    }
    ctx.strokeStyle = drawPaper.rule; ctx.lineWidth = 0.7;
    ctx.setLineDash([5, 5]);
    const baseY = canvas.height - 40;
    ctx.beginPath(); ctx.moveTo(30, baseY); ctx.lineTo(canvas.width - 30, baseY); ctx.stroke();
    ctx.setLineDash([]);
  }, [drawPaper]);

  useEffect(() => {
    if (tab !== 'draw') return;
    const canvas = canvasRef.current; if (!canvas) return;
    fillCanvasBg();
  }, [tab, drawPaper, fillCanvasBg]);

  const startDraw = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current; if (!canvas) return;
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current = getPos(e, canvas);
  }, []);

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current; if (!canvas) return;
    e.preventDefault();
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e, canvas);
    const last = lastPos.current || pos;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = drawPen.color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (drawPen.category === 'ink') ctx.globalAlpha = 0.88;
    else ctx.globalAlpha = 1;
    ctx.stroke();
    ctx.globalAlpha = 1;
    lastPos.current = pos;
    setHasStrokes(true);
  }, [drawPen, brushSize]);

  const endDraw = useCallback(() => {
    isDrawing.current = false;
    lastPos.current = null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.addEventListener('mousedown',  startDraw as any);
    canvas.addEventListener('mousemove',  draw as any);
    canvas.addEventListener('mouseup',    endDraw);
    canvas.addEventListener('mouseleave', endDraw);
    canvas.addEventListener('touchstart', startDraw as any, { passive: false });
    canvas.addEventListener('touchmove',  draw as any, { passive: false });
    canvas.addEventListener('touchend',   endDraw);
    return () => {
      canvas.removeEventListener('mousedown',  startDraw as any);
      canvas.removeEventListener('mousemove',  draw as any);
      canvas.removeEventListener('mouseup',    endDraw);
      canvas.removeEventListener('mouseleave', endDraw);
      canvas.removeEventListener('touchstart', startDraw as any);
      canvas.removeEventListener('touchmove',  draw as any);
      canvas.removeEventListener('touchend',   endDraw);
    };
  }, [startDraw, draw, endDraw]);

  const clearCanvas = useCallback(() => {
    fillCanvasBg(); setHasStrokes(false);
  }, [fillCanvasBg]);

  // ── Downloads ────────────────────────────────────────────────────
  const downloadTypePNG = useCallback(() => {
    const canvas = document.createElement('canvas');
    const scale  = 3;
    canvas.width = 700 * scale; canvas.height = 220 * scale;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(scale, scale);
    ctx.fillStyle = paper.id === 'none' ? '#ffffff' : paper.bg;
    ctx.fillRect(0, 0, 700, 220);
    if (paper.id === 'lined') {
      ctx.strokeStyle = paper.rule; ctx.lineWidth = 0.8;
      for (let y = 30; y < 220; y += 28) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(700, y); ctx.stroke(); }
    }
    ctx.strokeStyle = paper.rule; ctx.lineWidth = 0.6; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(60, 158); ctx.lineTo(640, 158); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = pen.color;
    ctx.font = `${selectedFont.weight} ${fontSize}px '${selectedFont.family}', cursive`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(displayName, 350, 150);
    const link = document.createElement('a');
    link.download = `${displayName.toLowerCase().replace(/\s+/g, '-')}-signature.png`;
    link.href = canvas.toDataURL('image/png'); link.click();
    setDl(true); setTimeout(() => setDl(false), 2500);
  }, [name, selectedFont, pen, paper, fontSize, displayName]);

  const downloadDrawPNG = useCallback(() => {
    const src = canvasRef.current; if (!src) return;
    const link = document.createElement('a');
    link.download = 'my-handwritten-signature.png';
    link.href = src.toDataURL('image/png'); link.click();
    setDl(true); setTimeout(() => setDl(false), 2500);
  }, []);

  const downloadTypeSVG = useCallback(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="220" viewBox="0 0 700 220">
  <rect width="700" height="220" fill="${paper.id === 'none' ? '#ffffff' : paper.bg}"/>
  <line x1="60" y1="158" x2="640" y2="158" stroke="${paper.rule}" stroke-width="0.6" stroke-dasharray="4 4"/>
  <text x="350" y="150" text-anchor="middle" dominant-baseline="alphabetic"
    font-family="${selectedFont.family}, cursive"
    font-size="${fontSize}" font-weight="${selectedFont.weight}" fill="${pen.color}"
  >${displayName}</text>
</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${displayName.toLowerCase().replace(/\s+/g, '-')}-signature.svg`;
    link.href = url; link.click(); URL.revokeObjectURL(url);
    setSvgDl(true); setTimeout(() => setSvgDl(false), 2500);
  }, [name, selectedFont, pen, paper, fontSize, displayName]);

  // ── Shared styling helpers ───────────────────────────────────────
  const ballpointPens = PEN_TYPES.filter(p => p.category === 'ballpoint');
  const inkPens       = PEN_TYPES.filter(p => p.category === 'ink');
  const gelPens       = PEN_TYPES.filter(p => p.category === 'gel');

  const accentGrad   = { background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-light))' };
  const accentCard   = { background: 'var(--color-accent-subtle)', border: '1px solid var(--color-accent-border)' };
  const accentTxt    = { color: 'var(--color-accent)' };

  const PenGroups = ({ activePen, onSelect }: { activePen: typeof PEN_TYPES[0]; onSelect: (p: typeof PEN_TYPES[0]) => void }) => (
    <div className="rounded-2xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>Pen Type</p>
      <div className="space-y-4">
        {[{ label: 'Ballpoint', pens: ballpointPens }, { label: 'Ink Pen', pens: inkPens }, { label: 'Gel Pen', pens: gelPens }].map(group => (
          <div key={group.label}>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-muted)', opacity: 0.65 }}>{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.pens.map(p => (
                <button key={p.id} onClick={() => onSelect(p)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={activePen.id === p.id ? { ...accentCard, ...accentTxt } : { background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <span className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: p.color, border: '1px solid rgba(0,0,0,0.12)', boxShadow: activePen.id === p.id ? `0 0 5px ${p.color}50` : 'none' }} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}>{activePen.description}</p>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 text-left">

      {/* ── Tabs ── */}
      <div className="flex gap-1 p-1 rounded-xl w-fit"
        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
        {([
          { id: 'type', label: '✦ Type a Name' },
          { id: 'draw', label: '✍ Draw by Hand' },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="rounded-lg px-5 py-2 text-sm font-bold transition-all"
            style={tab === t.id
              ? { ...accentGrad, color: '#fff', boxShadow: '0 2px 8px rgba(29,63,110,0.2)' }
              : { background: 'transparent', color: 'var(--color-text-muted)' }
            }>
            {t.label}
          </button>
        ))}
      </div>

      {/* ════════════════════ TYPE TAB ════════════════════ */}
      {tab === 'type' && (
        <>
          {/* Name input */}
          <div className="relative">
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Type your name here…" maxLength={40}
              className="w-full rounded-2xl px-6 py-5 text-xl font-medium outline-none transition-all"
              style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-subtle)'; }}
              onBlur={e  => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
              aria-label="Enter your name to generate a signature"
            />
            {name && (
              <button onClick={() => setName('')} aria-label="Clear"
                className="absolute right-5 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--color-text-muted)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Live preview */}
          <div className="relative rounded-2xl overflow-hidden"
            style={{ background: paper.id === 'none' ? 'var(--color-surface)' : paper.bg, border: '1px solid rgba(0,0,0,0.08)', minHeight: '160px', padding: '40px 48px 48px', boxShadow: '0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.7)' }}
            aria-live="polite">
            {paper.id === 'lined' && (
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {[30,58,86,114,142].map(y => (
                  <div key={y} className="absolute left-0 right-0" style={{ top: `${y}px`, borderTop: `1px solid ${paper.rule}` }} />
                ))}
              </div>
            )}
            <div className="absolute left-12 right-12 border-b border-dashed" style={{ bottom: '44px', borderColor: paper.rule }} />
            <div className="relative flex items-end justify-center" style={{ minHeight: '100px' }}>
              <span className={`select-none leading-none ${FONT_CLASS_MAP[selectedFont.family]}`}
                style={{ fontSize: `${fontSize}px`, color: pen.color, fontWeight: selectedFont.weight, filter: pen.filter, display: 'block', paddingBottom: '8px' }}>
                {displayName}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Size</p>
              <div className="flex gap-2 flex-wrap">
                {FONT_SIZES.map(s => (
                  <button key={s} onClick={() => setFontSize(s)}
                    className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all"
                    style={fontSize === s ? { ...accentGrad, color: '#fff' } : { background: 'var(--color-surface-2)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Paper</p>
              <div className="flex gap-2 flex-wrap">
                {PAPER_TYPES.map(pt => (
                  <button key={pt.id} onClick={() => setPaper(pt)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={paper.id === pt.id ? { ...accentGrad, color: '#fff' } : { background: 'var(--color-surface-2)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-4 flex flex-col gap-2.5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Download</p>
              <button onClick={downloadTypePNG}
                className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ ...accentGrad, boxShadow: '0 4px 16px rgba(29,63,110,0.2)' }}>
                <DownloadIcon /> {downloaded ? '✓ Downloaded!' : 'Download PNG'}
              </button>
              <button onClick={downloadTypeSVG}
                className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all hover:opacity-80 active:scale-95"
                style={{ border: '1.5px solid var(--color-accent-border)', ...accentTxt, background: 'var(--color-accent-subtle)' }}>
                <DownloadIcon /> {svgDl ? '✓ Downloaded!' : 'Download SVG'}
              </button>
            </div>
          </div>

          <PenGroups activePen={pen} onSelect={setPen} />

          {/* Style grid */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Signature Style — {SIGNATURE_FONTS.length} Available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SIGNATURE_FONTS.map(font => (
                <button key={font.id} onClick={() => setFont(font)}
                  className="style-card group relative rounded-2xl p-5 text-left transition-all"
                  style={selectedFont.id === font.id ? { ...accentCard } : { background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                  aria-pressed={selectedFont.id === font.id}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest"
                      style={selectedFont.id === font.id ? accentTxt : { color: 'var(--color-text-muted)' }}>
                      {font.name}
                    </span>
                    {selectedFont.id === font.id && (
                      <span style={accentTxt}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      </span>
                    )}
                  </div>
                  <div className="rounded-lg overflow-hidden" style={{ background: '#fff', padding: '8px 16px 12px', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="border-b border-dashed" style={{ borderColor: 'rgba(100,140,200,0.2)', paddingBottom: '6px' }}>
                      <div className={`leading-none overflow-hidden text-ellipsis whitespace-nowrap ${FONT_CLASS_MAP[font.family]}`}
                        style={{ fontSize: '40px', color: pen.color, fontWeight: font.weight, filter: pen.filter }}
                        aria-hidden="true">
                        {displayName}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>{font.description}</p>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ════════════════════ DRAW TAB ════════════════════ */}
      {tab === 'draw' && (
        <>
          {/* Canvas */}
          <div className="relative rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(0,0,0,0.10)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', lineHeight: 0 }}>
            <canvas
              ref={canvasRef}
              width={700}
              height={200}
              className="w-full block"
              style={{ cursor: 'crosshair', touchAction: 'none', maxHeight: '220px' }}
              aria-label="Draw your signature here"
            />
            <button onClick={clearCanvas}
              className="absolute top-3 right-3 rounded-lg px-3 py-1.5 text-xs font-bold transition-all hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
              Clear
            </button>
          </div>
          <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
            Draw with your mouse or finger. Your signature stays on your device.
          </p>

          {/* Draw controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Brush size */}
            <div className="rounded-2xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Nib Size</p>
              <div className="flex gap-2 flex-wrap">
                {[1.5, 2, 3, 4, 5].map(s => (
                  <button key={s} onClick={() => setBrushSize(s)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm transition-all"
                    style={brushSize === s ? { ...accentGrad, color: '#fff' } : { background: 'var(--color-surface-2)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                    <span className="rounded-full" style={{ width: `${Math.max(2, s * 2.5)}px`, height: `${Math.max(2, s * 2.5)}px`, background: 'currentColor' }} />
                  </button>
                ))}
              </div>
            </div>
            {/* Paper */}
            <div className="rounded-2xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>Paper</p>
              <div className="flex gap-2 flex-wrap">
                {PAPER_TYPES.map(pt => (
                  <button key={pt.id} onClick={() => setDrawPaper(pt)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={drawPaper.id === pt.id ? { ...accentGrad, color: '#fff' } : { background: 'var(--color-surface-2)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Download */}
            <div className="rounded-2xl p-4 flex flex-col gap-2.5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Download</p>
              <button onClick={downloadDrawPNG} disabled={!hasStrokes}
                className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ ...accentGrad, boxShadow: hasStrokes ? '0 4px 16px rgba(29,63,110,0.2)' : 'none' }}>
                <DownloadIcon /> {downloaded ? '✓ Downloaded!' : 'Download PNG'}
              </button>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {hasStrokes ? 'Ready to download' : 'Draw your signature first'}
              </p>
            </div>
          </div>

          <PenGroups activePen={drawPen} onSelect={setDrawPen} />
        </>
      )}
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}
