import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal.js";
import { reviews, ratings, posts } from "../data/content.js";

const Stars = ({ n }) => <span className="stars">{"★".repeat(n)}<s>{"★".repeat(5 - n)}</s></span>;

export default function Stories() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <section className="section page-hero">
        <span className="hero-badge">Stories</span>
        <h1>Heard it <span className="grad">first</span></h1>
        <p className="sub">What early listeners say, and how Kento came to life.</p>
      </section>

      <section className="section">
        <div className="rating card" data-reveal>
          <div className="big"><strong>4.8</strong><Stars n={5} /><span>from 1,200+ early listeners</span></div>
          <div className="bars">{ratings.map(([s, v]) => <div key={s}><span>{s}★</span><i><b style={{ width: v + "%" }} /></i><em>{v}%</em></div>)}</div>
        </div>
        <div className="grid" style={{ marginTop: 20 }}>
          {reviews.map((r) => (
            <figure className="card quote" data-reveal key={r.name}>
              <Stars n={r.stars} /><blockquote>“{r.quote}”</blockquote>
              <figcaption><i>{r.name[0]}</i><div><b>{r.name}</b><span>{r.role}</span></div></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 data-reveal>From the <span className="grad">journal</span></h2>
        <div className="grid" style={{ marginTop: 50 }}>
          {posts.slice(0, 3).map((x, i) => (
            <article className="card post" data-reveal key={x.title}>
              <div className="thumb" style={{ filter: `hue-rotate(${i * 60}deg)` }} />
              <small>{x.tag}</small><h3>{x.title}</h3><p>{x.text}</p><Link to={"/blog/" + x.slug}>Read more →</Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
