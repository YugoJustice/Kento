import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal.js";
import { posts } from "../data/content.js";

const tags = ["All", ...new Set(posts.map((p) => p.tag))];

export default function Blog() {
  const ref = useReveal();
  const [tag, setTag] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => posts.filter((p) => (tag === "All" || p.tag === tag) && (p.title + p.text).toLowerCase().includes(q.toLowerCase())), [tag, q]);
  const [first, ...rest] = list;

  return (
    <div ref={ref}>
      <section className="section page-hero">
        <span className="hero-badge">Blog</span>
        <h1>The Kento <span className="grad">journal</span></h1>
        <p className="sub">Design notes, sound science and behind-the-scenes stories.</p>
      </section>

      <section className="section">
        <div className="blogbar" data-reveal>
          <div className="tabs">{tags.map((t) => <button key={t} className={t === tag ? "on" : ""} onClick={() => setTag(t)}>{t}</button>)}</div>
          <input type="search" placeholder="Search posts…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {!list.length && <p className="sub">No posts match. Try another search.</p>}
        {first && (
          <Link to={"/blog/" + first.slug} className="card feat" data-reveal>
            <div className="thumb big" />
            <div><small>{first.tag} · {first.date} · {first.read} min read</small><h2>{first.title}</h2><p>{first.text}</p><span className="more">Read article →</span></div>
          </Link>
        )}
        <div className="grid" style={{ marginTop: 20 }}>
          {rest.map((x, i) => (
            <Link to={"/blog/" + x.slug} className="card post" key={x.slug}>
              <div className="thumb" style={{ filter: `hue-rotate(${i * 55 + 40}deg)` }} />
              <small>{x.tag} · {x.read} min read</small><h3>{x.title}</h3><p>{x.text}</p><span className="more">Read more →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
