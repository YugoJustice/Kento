import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal.js";
import { parts, materials, lab } from "../data/content.js";

function Waves() {
  const [s, setS] = useState(85);
  const strength = useRef(s); strength.current = s;
  const a = useRef(), b = useRef(), r = useRef();
  useEffect(() => {
    let t = 0, id; const W = 600, H = 70;
    const d = (fn) => { let p = ""; for (let x = 0; x <= W; x += 6) p += (x ? "L" : "M") + x + " " + (H + fn(x)).toFixed(1); return p; };
    const n = (x) => 30 * Math.sin(x / 38 + t) + 14 * Math.sin(x / 17 - t * 1.6);
    const draw = () => { a.current.setAttribute("d", d(n)); b.current.setAttribute("d", d((x) => -n(x))); r.current.setAttribute("d", d((x) => n(x) * (1 - strength.current / 100))); };
    const loop = () => { t += 0.04; draw(); id = requestAnimationFrame(loop); };
    matchMedia("(prefers-reduced-motion: reduce)").matches ? draw() : loop();
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className="card wavecard" data-reveal>
      <svg viewBox="0 0 600 140" className="waves"><path ref={a} className="w1" /><path ref={b} className="w2" /><path ref={r} className="w3" /></svg>
      <div className="legend"><span><i className="w1" />Outside noise</span><span><i className="w2" />Anti-noise</span><span><i className="w3" />What you hear</span></div>
      <label className="slide">Cancelling strength <b>{s}%</b><input type="range" min="0" max="100" value={s} onChange={(e) => setS(+e.target.value)} /></label>
    </div>
  );
}

function Battery() {
  const [vol, setVol] = useState(60), [anc, setAnc] = useState(true);
  const hrs = Math.round((anc ? 45 : 60) * (1.3 - vol / 150));
  return (
    <div className="card calc" data-reveal>
      <div className="calc-out"><strong>{hrs}</strong><span>hours of playback</span></div>
      <div className="pbar"><b style={{ width: Math.min(100, (hrs / 70) * 100) + "%" }} /></div>
      <label className="slide">Volume <b>{vol}%</b><input type="range" min="10" max="100" value={vol} onChange={(e) => setVol(+e.target.value)} /></label>
      <div className="tabs"><button className={anc ? "on" : ""} onClick={() => setAnc(true)}>ANC on</button><button className={!anc ? "on" : ""} onClick={() => setAnc(false)}>ANC off</button></div>
    </div>
  );
}

export default function DeepDive() {
  const ref = useReveal();
  const [sel, setSel] = useState(parts[3]);
  const radii = { shell: 135, cushion: 112, battery: 88, driver: 62 };
  return (
    <div ref={ref}>
      <section className="section page-hero">
        <span className="hero-badge">Deep dive</span>
        <h1>How Kento <span className="grad">works</span></h1>
        <p className="sub">The engineering behind the sound. Poke at everything.</p>
      </section>

      <section className="section split">
        <div className="anatomy" data-reveal>
          <svg viewBox="0 0 300 300">
            {Object.entries(radii).map(([id, rad]) => <circle key={id} cx="150" cy="150" r={rad} className={"part" + (sel.id === id ? " on" : "")} />)}
            {[0, 120, 240].map((deg) => <circle key={deg} cx={150 + 100 * Math.cos((deg * Math.PI) / 180)} cy={150 + 100 * Math.sin((deg * Math.PI) / 180)} r="9" className={"part mic" + (sel.id === "mics" ? " on" : "")} />)}
          </svg>
        </div>
        <div>
          <h2 data-reveal style={{ textAlign: "left" }}>Inside one <span className="grad">ear cup</span></h2>
          <div className="partlist">{parts.map((p) => <button key={p.id} className={sel.id === p.id ? "on" : ""} onClick={() => setSel(p)} data-reveal>{p.name}</button>)}</div>
          <p className="partinfo">{sel.text}</p>
        </div>
      </section>

      <section className="section narrow">
        <h2 data-reveal>Noise, <span className="grad">cancelled</span></h2>
        <p className="sub" data-reveal>Kento plays the exact opposite of the noise around you. Slide to see the waves cancel.</p>
        <Waves />
      </section>

      <section className="section narrow">
        <h2 data-reveal>Battery <span className="grad">calculator</span></h2>
        <p className="sub" data-reveal>See how volume and noise cancelling change your listening time.</p>
        <Battery />
      </section>

      <section className="section">
        <h2 data-reveal>Lab <span className="grad">numbers</span></h2>
        <div className="labgrid">{lab.map(([v, l]) => <div className="card" data-reveal key={l}><strong className="grad">{v}</strong><span>{l}</span></div>)}</div>
      </section>

      <section className="section">
        <h2 data-reveal>Built to <span className="grad">last</span></h2>
        <div className="labgrid" style={{ marginTop: 50 }}>{materials.map((m) => <article className="card" data-reveal key={m.title}><div className="icon">{m.icon}</div><h3>{m.title}</h3><p>{m.text}</p></article>)}</div>
      </section>
    </div>
  );
}
