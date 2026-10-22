import { useEffect, useState } from "react";
const calc = (t) => { const d = Math.max(0, new Date(t) - Date.now()); return [["Days", Math.floor(d / 864e5)], ["Hours", Math.floor(d / 36e5) % 24], ["Min", Math.floor(d / 6e4) % 60], ["Sec", Math.floor(d / 1e3) % 60]]; };
export default function Countdown({ target }) {
  const [t, setT] = useState(() => calc(target));
  useEffect(() => { const id = setInterval(() => setT(calc(target)), 1000); return () => clearInterval(id); }, [target]);
  return <div className="countdown" data-reveal>{t.map(([l, v]) => <div className="count-box" key={l}><strong>{String(v).padStart(2, "0")}</strong><span>{l}</span></div>)}</div>;
}
