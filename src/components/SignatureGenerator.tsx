import { useState, useRef, useEffect, useCallback } from 'react';
import { SIGNATURE_FONTS, FONT_COLORS, FONT_SIZES } from '../lib/fonts';

interface Props {
  defaultName?: string;
}

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
  const [name, setName]           = useState(defaultName);
  const [selectedFont, setFont]   = useState(SIGNATURE_FONTS[0]);
  const [color, setColor]         = useState(FONT_COLORS[0].value);
  const [fontSize, setFontSize]   = useState(56);
  const [copied, setCopied]       = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const previewRef                = useRef<HTMLDivElement>(null);

  const displayName = name.trim() || 'Your Name';

  const downloadPNG = useCallback(() => {
    const canvas = document.createElement('canvas');
    const scale  = 3;
    canvas.width  = 600 * scale;
    canvas.height = 180 * scale;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(scale, scale);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 600, 180);
    ctx.fillStyle = color;
    ctx.font      = `${selectedFont.weight} ${fontSize}px '${selectedFont.family}', cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayName, 300, 90);

    const link = document.createElement('a');
    link.download = `${displayName.toLowerCase().replace(/\s+/g,'-')}-signature.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }, [name, selectedFont, color, fontSize, displayName]);

  const downloadSVG = useCallback(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="180" viewBox="0 0 600 180">
  <text x="300" y="105" text-anchor="middle" font-family="${selectedFont.family}, cursive"
    font-size="${fontSize}" font-weight="${selectedFont.weight}" fill="${color}">${displayName}</text>
</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${displayName.toLowerCase().replace(/\s+/g,'-')}-signature.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, [name, selectedFont, color, fontSize, displayName]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">

      {/* Name input */}
      <div className="relative">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type your name here…"
          maxLength={40}
          className="w-full rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5 text-xl font-medium text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all"
          aria-label="Enter your name to generate a signature"
        />
        {name && (
          <button
            onClick={() => setName('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Clear name"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        )}
      </div>

      {/* Live preview — selected style */}
      <div
        ref={previewRef}
        className="relative rounded-2xl border border-[var(--color-border)] bg-white dark:bg-[#1a1030] p-8 flex items-center justify-center min-h-[140px] overflow-hidden shadow-sm"
        aria-live="polite"
        aria-label={`Signature preview: ${displayName} in ${selectedFont.name} style`}
      >
        {/* Ruled line */}
        <div className="absolute bottom-10 left-8 right-8 border-b border-dashed border-gray-200 dark:border-gray-700" />
        <span
          className={`relative z-10 leading-none select-none ${FONT_CLASS_MAP[selectedFont.family]}`}
          style={{ fontSize: `${fontSize}px`, color, fontWeight: selectedFont.weight }}
        >
          {displayName}
        </span>
      </div>

      {/* Controls row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Font size */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
            Size
          </label>
          <div className="flex gap-2 flex-wrap">
            {FONT_SIZES.map(s => (
              <button
                key={s}
                onClick={() => setFontSize(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  fontSize === s
                    ? 'bg-violet-600 text-white'
                    : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
            Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {FONT_COLORS.map(c => (
              <button
                key={c.id}
                title={c.label}
                onClick={() => setColor(c.value)}
                className={`w-7 h-7 rounded-full transition-all hover:scale-110 ${
                  color === c.value ? 'ring-2 ring-offset-2 ring-violet-500 scale-110' : ''
                }`}
                style={{ background: c.value }}
                aria-label={c.label}
              />
            ))}
          </div>
        </div>

        {/* Download */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex flex-col gap-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
            Download
          </label>
          <button
            onClick={downloadPNG}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-all active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {downloaded ? 'Downloaded!' : 'PNG'}
          </button>
          <button
            onClick={downloadSVG}
            className="flex items-center justify-center gap-2 rounded-xl border border-violet-300 dark:border-violet-700 px-4 py-2.5 text-sm font-bold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            SVG
          </button>
        </div>
      </div>

      {/* Style grid — all 10 fonts */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Choose Style
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SIGNATURE_FONTS.map(font => (
            <button
              key={font.id}
              onClick={() => setFont(font)}
              className={`group relative rounded-2xl border-2 p-5 text-left transition-all hover:shadow-md ${
                selectedFont.id === font.id
                  ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 shadow-md'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-violet-300'
              }`}
              aria-pressed={selectedFont.id === font.id}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-widest ${selectedFont.id === font.id ? 'text-violet-600 dark:text-violet-400' : 'text-[var(--color-text-muted)]'}`}>
                  {font.name}
                </span>
                {selectedFont.id === font.id && (
                  <span className="text-violet-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </span>
                )}
              </div>
              <div
                className={`leading-none overflow-hidden text-ellipsis whitespace-nowrap ${FONT_CLASS_MAP[font.family]}`}
                style={{ fontSize: '40px', color, fontWeight: font.weight }}
                aria-hidden="true"
              >
                {displayName}
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-muted)]">{font.description}</p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
