import { useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Phone from "../components/Phone.jsx";
import Device from "../components/Device.jsx";
import useReveal from "../hooks/useReveal.js";
import { appTabs, platforms, privacy, changelog } from "../data/content.js";

const bands = ["60", "250", "1k", "4k", "12k"];

export default function AppShowcase() {
  const ref = useReveal(() => gsap.to(".phone", { y: -14, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true }));
  const [tab, setTab] = useState(appTabs[0]);
  const [eq, setEq] = useState([60, 50, 40, 55, 65]);
  const [anc, setAnc] = useState(80);
  const [ping, setPing] = useState(false);
  const [upd, setUpd] = useState(0);
  const mode = anc > 66 ? "Noise cancelling" : anc > 33 ? "Adaptive" : "Transparency";
  const runUpdate = () => { const o = { v: 0 }; setUpd(1); gsap.to(o, { v: 100, duration: 2.5, ease: "power1.inOut", onUpdate: () => setUpd(Math.max(1, Math.round(o.v))) }); };

  return (
    <div ref={ref}>
      <section className="section page-hero split">
        <div>
          <span className="hero-badge">Companion app</span>
          <h1>Your Kento, <span className="grad">in your pocket</span></h1>
          <p className="hero-text">Shape the sound, control the noise and find your headphones. Free for iOS and Android.</p>
          <div className="hero-cta"><a href="#" className="btn">App Store</a><a href="#" className="btn btn-ghost">Google Play</a></div>
        </div>
        <div className="phone-wrap">
          <Phone>
            <div className="app-top"><b>Kento</b><span className="live">● Connected</span></div>
            {tab.id === "eq" && <div className="app-eq">{bands.map((b, i) => (
              <label key={b}><input type="range" min="0" max="100" value={eq[i]} onChange={(e) => setEq(eq.map((v, j) => (j === i ? +e.target.value : v)))} /><span>{b}</span></label>
            ))}</div>}
            {tab.id === "anc" && <div className="app-anc"><div className="orb" style={{ transform: `scale(${0.7 + anc / 200})` }}>{anc}%</div><h4>{mode}</h4><input type="range" min="0" max="100" value={anc} onChange={(e) => setAnc(+e.target.value)} /></div>}
            {tab.id === "find" && <div className="app-find"><div className={"radar" + (ping ? " on" : "")}><i /><i /><i /><b>◐</b></div><p>Last seen: just now</p><button className="btn btn-sm" onClick={() => setPing(!ping)}>{ping ? "Stop sound" : "Play sound"}</button></div>}
            {tab.id === "update" && <div className="app-upd"><h4>{upd === 100 ? "Up to date" : "Update 2.0 ready"}</h4><div className="pbar"><b style={{ width: upd + "%" }} /></div><p>{upd === 0 ? "Adds shareable presets and a sleep timer." : upd === 100 ? "Kento is running v2.0." : `Installing… ${upd}%`}</p>{upd === 0 && <button className="btn btn-sm" onClick={runUpdate}>Update now</button>}</div>}
          </Phone>
        </div>
      </section>

      <section className="section">
        <h2 data-reveal>Try it <span className="grad">right here</span></h2>
        <p className="sub" data-reveal>Pick a feature. The phone above is fully interactive.</p>
        <div className="grid g2 apptabs">
          {appTabs.map((t) => (
            <button key={t.id} className={"card tabcard" + (tab.id === t.id ? " sel" : "")} onClick={() => { setTab(t); window.scrollTo({ top: 120, behavior: "smooth" }); }} data-reveal>
              <h3>{t.label}</h3><p>{t.text}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 data-reveal>Works with <span className="grad">everything</span></h2>
        <div className="boxgrid plat">{platforms.map((p) => <div className="chip" data-reveal key={p}>✓ {p}</div>)}</div>
      </section>

      <section className="section">
        <h2 data-reveal>Private <span className="grad">by default</span></h2>
        <div className="grid" style={{ marginTop: 50 }}>{privacy.map((p) => <article className="card" data-reveal key={p.title}><div className="icon">{p.icon}</div><h3>{p.title}</h3><p>{p.text}</p></article>)}</div>
      </section>

      <section className="section split">
        <div><h2 data-reveal>What's <span className="grad">new</span></h2><p className="sub left" data-reveal>Your Kento keeps getting better after you buy it.</p></div>
        <div>{changelog.map((c) => <div className="card log" data-reveal key={c.v}><b className="grad">v{c.v}</b><small>{c.date}</small><ul>{c.items.map((i) => <li key={i}>✓ {i}</li>)}</ul></div>)}</div>
      </section>

      <section className="section cta" data-reveal>
        <div className="qr" aria-hidden="true">{Array.from({ length: 49 }, (_, i) => <i key={i} style={{ opacity: (i * 7 + (i % 5)) % 3 ? 1 : 0.1 }} />)}</div>
        <h2>Scan to download</h2>
        <p className="sub">Placeholder QR. Link it to your store listing at launch.</p>
        <Link to="/reserve" className="btn">Reserve Kento</Link>
      </section>
    </div>
  );
}
