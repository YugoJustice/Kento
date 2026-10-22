import { useState } from "react";
import { faqs } from "../data/content.js";
export default function Faq() {
  const [open, setOpen] = useState(0);
  return faqs.map((f, i) => (
    <div className={"faq" + (open === i ? " open" : "")} data-reveal key={f.q}>
      <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>{f.q}<i>+</i></button>
      <div className="ans"><p>{f.a}</p></div>
    </div>
  ));
}
