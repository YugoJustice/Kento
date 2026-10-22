import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import { brand, nav } from "../data/content.js";

export default function Layout() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const main = useRef(null);

  // Page transition + scroll to top on every route change
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
    gsap.fromTo(
      main.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "transform",
      },
    );
  }, [pathname]);

  // Scroll progress bar + cursor glow
  useEffect(() => {
    const bar = document.querySelector(".progress"),
      glow = document.querySelector(".glow");
    const gx = gsap.quickTo(glow, "x", { duration: 0.6 }),
      gy = gsap.quickTo(glow, "y", { duration: 0.6 });
    const move = (e) => {
      gx(e.clientX);
      gy(e.clientY);
    };
    const scroll = () => {
      bar.style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight || 1)})`;
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <>
      <div className="progress" />
      <div className="glow" aria-hidden="true" />
      <div className="bg" aria-hidden="true">
        <i className="blob b1" />
        <i className="blob b2" />
        <i className="blob b3" />
        <i className="grain" />
      </div>

      <header className={"nav" + (menu ? " nav-open" : "")}>
        <Link to="/" className="logo">
          <b>◐</b> {brand.name}
        </Link>
        <nav>
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/reserve" className="btn btn-sm">
          Reserve
        </Link>
        <button
          className="burger"
          aria-label="Menu"
          onClick={() => setMenu(!menu)}
        >
          <i />
          <i />
        </button>
      </header>

      <main ref={main}>
        <Outlet />
      </main>

      <footer>
        <div className="foot-grid">
          <div>
            <Link to="/" className="logo">
              <b>◐</b> {brand.name}
            </Link>
            <p>{brand.tagline} Launching December 15.</p>
          </div>
          <div>
            <h4>Explore</h4>
            {nav.map((n) => (
              <Link key={n.to} to={n.to}>
                {n.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Follow</h4>
            <a href="#">Instagram</a>
            <a href="#">X / Twitter</a>
            <a href="#">YouTube</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="mailto:hello@kento.com">hello@kento.com</a>
            <a href="#">Support</a>
          </div>
        </div>
        <span className="copy">
          © {new Date().getFullYear()} Kento. All rights reserved. | Yugo
          Justice
        </span>
      </footer>
    </>
  );
}
