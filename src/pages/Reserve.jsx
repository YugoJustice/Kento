import { useState } from "react";
import Countdown from "../components/Countdown.jsx";
import Faq from "../components/Faq.jsx";
import useReveal from "../hooks/useReveal.js";
import { launchDate, plans, colors } from "../data/content.js";

export default function Reserve() {
  const ref = useReveal();
  const [plan, setPlan] = useState(plans[1]);
  const [color, setColor] = useState(colors[0]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div ref={ref} style={{ "--a": color.c1, "--b": color.c2 }}>
      <section className="section page-hero">
        <span className="hero-badge">Reserve</span>
        <h1>Reserve your <span className="grad">Kento</span></h1>
        <p className="sub">Fully refundable until it ships. Launching in</p>
        <Countdown target={launchDate} />
      </section>

      <section className="section">
        <div className="grid g2 plans">
          {plans.map((p) => (
            <article className={"card plan pick" + (p.featured ? " featured" : "") + (p.name === plan.name ? " sel" : "")} onClick={() => setPlan(p)} data-reveal key={p.name}>
              {p.featured && <span className="tag">Most popular</span>}
              <h3>{p.name}</h3><div className="price">₦{p.price.toLocaleString()}</div><small>{p.note}</small>
              <ul>{p.perks.map((x) => <li key={x}>✓ {x}</li>)}</ul>
            </article>
          ))}
        </div>

        <div className="card order" data-reveal>
          {done ? (
            <div className="done"><div className="icon">✓</div><h3>You're in, {form.name.split(" ")[0] || "friend"}!</h3><p>Your {color.name} Kento ({plan.name}) is reserved. We emailed {form.email} the details.</p></div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
              <h3>Your reservation</h3>
              <label>Colour<div className="swatches">{colors.map((x) => <button type="button" key={x.name} className={"sw" + (x.name === color.name ? " on" : "")} onClick={() => setColor(x)} aria-label={x.name} style={{ background: `linear-gradient(135deg,${x.c1},${x.c2})` }} />)}<span>{color.name}</span></div></label>
              <label>Full name<input required value={form.name} onChange={set("name")} placeholder="Ugo Justice" /></label>
              <label>Email<input required type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" /></label>
              <div className="total"><span>{plan.name} · {color.name}</span><b>₦{plan.price.toLocaleString()}</b></div>
              <button className="btn">Reserve now</button>
            </form>
          )}
        </div>
      </section>

      <section className="section narrow">
        <h2 data-reveal>Questions, <span className="grad">answered</span></h2>
        <div style={{ marginTop: 40 }}><Faq /></div>
      </section>
    </div>
  );
}
