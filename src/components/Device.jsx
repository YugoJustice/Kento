// Pure SVG headphone driven by two colours (no image files needed).
export default function Device({ c1 = "#8b6cff", c2 = "#22d3ee" }) {
  return (
    <div className="device" aria-hidden="true" style={{ "--a": c1, "--b": c2 }}>
      <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
      <svg viewBox="0 0 320 320" className="phones">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style={{ stopColor: c1 }} /><stop offset="1" style={{ stopColor: c2 }} /></linearGradient>
          <linearGradient id="m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a2f4a" /><stop offset="1" stopColor="#0f1224" /></linearGradient>
        </defs>
        <path d="M60 190 C60 60 260 60 260 190" fill="none" stroke="url(#g)" strokeWidth="14" strokeLinecap="round" />
        <rect x="34" y="165" width="64" height="110" rx="30" fill="url(#m)" stroke="url(#g)" strokeWidth="2" />
        <rect x="222" y="165" width="64" height="110" rx="30" fill="url(#m)" stroke="url(#g)" strokeWidth="2" />
        <circle cx="66" cy="220" r="14" fill="url(#g)" opacity=".85" /><circle cx="254" cy="220" r="14" fill="url(#g)" opacity=".85" />
      </svg>
    </div>
  );
}
