import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import useReveal from "../hooks/useReveal.js";
import { heroImage, hero, marquee, features, timeline } from "../data/content.js";

export default function Home() {
  const ref = useReveal(() => {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".hero-badge", { y: 20, opacity: 0, duration: 0.6 })
      .from(".hero h1 span", { yPercent: 110, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.3")
      .from(".hero-text, .hero-cta", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6")
      .from(".device", { scale: 0.8, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=1")
      .from(".stat", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.6");
    gsap.utils.toArray(".stat strong").forEach((el) => {
      const o = { v: 0 };
      gsap.to(o, { v: +el.dataset.value, duration: 2, delay: 1, ease: "power2.out", onUpdate: () => (el.firstChild.nodeValue = Math.round(o.v)) });
    });
    const mx = gsap.quickTo(".device", "x", { duration: 0.8, ease: "power3" }), my = gsap.quickTo(".device", "y", { duration: 0.8, ease: "power3" });
    const move = (e) => { mx((e.clientX / innerWidth - 0.5) * 30); my((e.clientY / innerHeight - 0.5) * 30); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  });

  return (
    <div ref={ref}>
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-badge"><i /> {hero.badge}</span>
          <h1>{hero.title.map((l, i) => <div className="line" key={i}><span className={i ? "grad" : ""}>{l}</span></div>)}</h1>
          <p className="hero-text">{hero.text}</p>
          <div className="hero-cta"><Link to="/reserve" className="btn">Reserve yours</Link><Link to="/product" className="btn btn-ghost">Explore Kento →</Link></div>
          <div className="stats">{hero.stats.map((s) => <div className="stat" key={s.label}><div><strong data-value={s.value}>0</strong><em>{s.suffix}</em></div><span>{s.label}</span></div>)}</div>
        </div>
        <div className="device"><img className="hero-img" src={import.meta.env.BASE_URL + heroImage} alt="Kento headphones" /></div>
      </section>

      <div className="marquee" aria-hidden="true"><div className="track">{[...marquee, ...marquee, ...marquee].map((m, i) => <span key={i}>{m} <b>✦</b></span>)}</div></div>

      <section className="section">
        <h2 data-reveal>Engineered for <span className="grad">feeling</span></h2>
        <p className="sub" data-reveal>Every detail, tuned so the technology fades and only the music remains.</p>
        <div className="grid">{features.slice(0, 3).map((f) => <article className="card" data-reveal key={f.title}><div className="icon">{f.icon}</div><h3>{f.title}</h3><p>{f.text}</p></article>)}</div>
        <div className="center" data-reveal><Link to="/product" className="btn btn-ghost">See all features →</Link></div>
      </section>

      <section className="section">
        <h2 data-reveal>The road to <span className="grad">launch</span></h2>
        <p className="sub" data-reveal>Where we are and what comes next.</p>
        <div className="timeline">{timeline.map((t, i) => <div className="tl" data-reveal key={t.title}><span className="dot">{i + 1}</span><small>{t.date}</small><h3>{t.title}</h3><p>{t.text}</p></div>)}</div>
      </section>

      <section className="section cta" data-reveal>
        <h2>Ready to hear the difference?</h2>
        <p className="sub">Reserve your Kento today. Fully refundable until it ships.</p>
        <Link to="/reserve" className="btn">Reserve now</Link>
      </section>
    </div>
  );
}
