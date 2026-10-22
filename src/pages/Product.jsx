import { useState } from "react";
import { Link } from "react-router-dom";
import Device from "../components/Device.jsx";
import Eq from "../components/Eq.jsx";
import useReveal from "../hooks/useReveal.js";
import {
  colors,
  features,
  profiles,
  specs,
  compare,
  box,
} from "../data/content.js";

export default function Product() {
  const ref = useReveal();
  const [c, setC] = useState(colors[0]);
  const [p, setP] = useState(profiles[0]);
  return (
    <div ref={ref} style={{ "--a": c.c1, "--b": c.c2 }}>
      <section className="section page-hero split">
        <div>
          <span className="hero-badge">The product</span>
          <h1>
            Meet <span className="grad">Kento</span>
          </h1>
          <p className="hero-text">Pick your colour.</p>
          <div className="swatches">
            {colors.map((x) => (
              <button
                key={x.name}
                className={"sw" + (x.name === c.name ? " on" : "")}
                onClick={() => setC(x)}
                aria-label={x.name}
                style={{
                  background: `linear-gradient(135deg,${x.c1},${x.c2})`,
                }}
              />
            ))}
            <span>{c.name}</span>
          </div>
          <div className="hero-cta">
            <Link to="/reserve" className="btn">
              Reserve in {c.name}
            </Link>
          </div>
        </div>
        <Device c1={c.c1} c2={c.c2} />
      </section>

      <section className="section">
        <h2 data-reveal>
          Everything, <span className="grad">considered</span>
        </h2>
        <div className="grid" style={{ marginTop: 50 }}>
          {features.map((f) => (
            <article className="card" data-reveal key={f.title}>
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 data-reveal>
          Your sound, <span className="grad">your way</span>
        </h2>
        <p className="sub" data-reveal>
          Choose a profile and watch the sound reshape.
        </p>
        <div className="card eqcard" data-reveal>
          <div className="tabs">
            {profiles.map((x) => (
              <button
                key={x.name}
                className={x.name === p.name ? "on" : ""}
                onClick={() => setP(x)}
              >
                {x.name}
              </button>
            ))}
          </div>
          <Eq curve={p.curve} />
          <p className="eqtext">{p.text}</p>
        </div>
      </section>

      <section className="section split">
        <div>
          <h2 data-reveal>
            The numbers <span className="grad">behind it</span>
          </h2>
          <p className="sub left" data-reveal>
            Specs that hold up on paper and in your ears.
          </p>
        </div>
        <ul className="specs">
          {specs.map(([k, v]) => (
            <li data-reveal key={k}>
              <span>{k}</span>
              <b>{v}</b>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 data-reveal>
          Kento vs <span className="grad">the rest</span>
        </h2>
        <div className="table-wrap card" data-reveal>
          <table>
            <thead>
              <tr>
                <th />
                {compare.cols.map((x, i) => (
                  <th key={x} className={i ? "" : "hl"}>
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((x, i) =>
                    i === 0 ? (
                      <th key={i}>{x}</th>
                    ) : (
                      <td key={i} className={i === 1 ? "hl" : ""}>
                        {x}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section narrow">
        <h2 data-reveal>
          In the <span className="grad">box</span>
        </h2>
        <div className="boxgrid">
          {box.map((b) => (
            <div className="chip" data-reveal key={b}>
              ✓ {b}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
