// CSS phone frame. Pass screen content as children.
export default function Phone({ children }) {
  return <div className="phone"><div className="notch" /><div className="screen">{children}</div></div>;
}
