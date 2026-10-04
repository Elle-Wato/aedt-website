import { useEffect, useRef, useState } from "react";
import { SITE } from "../data/site.js";

export function useCountUp(target, run) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(target);
    let start;
    const tick = (t) => {
      start ??= t;
      const p = Math.min((t - start) / 1600, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [run, target]);
  return n;
}

export function useSeen() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

export function Count({ value, prefix = "", suffix = "" }) {
  const [ref, seen] = useSeen();
  const n = useCountUp(value, seen);
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
}

export const ICONS = [
  "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5 M9 13h6 M9 17h6",
  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8 9h8 M8 13h5",
  "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  "M3 10l9-6 9 6 M5 10v8 M9 10v8 M15 10v8 M19 10v8 M3 21h18",
  "M21 12a9 9 0 0 0-15-6.7L3 8 M3 3v5h5 M3 12a9 9 0 0 0 15 6.7l3-2.7 M16 16h5v5",
];

export const Icon = ({ i }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[i]} /></svg>
);

export const Wave = ({ color }) => (
  <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 45C240 95 480 0 720 30S1200 95 1440 35V80H0Z" fill={color} />
  </svg>
);

export function Bars() {
  const [ref, seen] = useSeen();
  const max = Math.max(...SITE.programs.map((p) => p.beneficiaries));
  return (
    <div className="bars" ref={ref}>
      <div className="legend"><span className="a">Beneficiaries</span><span className="g">Graduates</span></div>
      {SITE.programs.map((p) => (
        <div className="bar-row" key={p.title}>
          <span>{p.title}</span>
          <div>
            <div className="track"><i className="fill a" style={{ width: seen ? (p.beneficiaries / max) * 100 + "%" : 0 }} /></div>
            {p.graduates ? <div className="track"><i className="fill g" style={{ width: seen ? (p.graduates / max) * 100 + "%" : 0 }} /></div> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
export const COLORS = ["#0B2545", "#1E9E5A", "#2F80C8", "#7ac143", "#2A9D8F"];

export function Donut() {
  const [ref, seen] = useSeen();
  const total = SITE.programs.reduce((s, p) => s + p.beneficiaries, 0);
  const R = 70;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="donut" ref={ref}>
      <svg viewBox="0 0 200 200" role="img" aria-label="Share of beneficiaries by programme">
        <circle cx="100" cy="100" r={R} fill="none" stroke="#EEF2F5" strokeWidth="26" />
        {SITE.programs.map((p, i) => {
          const len = (p.beneficiaries / total) * C;
          const el = (
            <circle
              key={p.title}
              cx="100" cy="100" r={R} fill="none"
              stroke={COLORS[i]} strokeWidth="26"
              strokeDasharray={`${seen ? Math.max(len - 2, 0) : 0} ${C}`}
              strokeDashoffset={-acc}
              transform="rotate(-90 100 100)"
              style={{ transition: "stroke-dasharray 1.2s ease" }}
            />
          );
          acc += len;
          return el;
        })}
        <text x="100" y="98" textAnchor="middle" className="dn">{total.toLocaleString()}</text>
        <text x="100" y="118" textAnchor="middle" className="dl">beneficiaries</text>
      </svg>
      <ul>
        {SITE.programs.map((p, i) => (
          <li key={p.title}>
            <i style={{ background: COLORS[i] }} />
            {p.title}

          </li>
        ))}
      </ul>
    </div>
  );
}

export function Ladder() {
  const [ref, seen] = useSeen();
  const max = Math.max(...SITE.levels.map(([, n]) => n));
  return (
    <div className="ladder" ref={ref}>
      {SITE.levels.map(([name, n]) => (
        <div
          className={"rung" + (name.startsWith("Umma") ? " umma" : "")}
          key={name}
          style={{ height: seen ? 90 + (n / max) * 170 : 30 }}
        >
          <b><Count value={n} /></b>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

const SOCIAL_ICONS = {
  Facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  X: "M18 6L6 18 M6 6l12 12",
  LinkedIn: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  Instagram: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z M16 11.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2z M17.5 6.5h.01",
};
const LINK_ICON = "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1";

export function SocialLinks() {
  return (
    <div className="sbtns">
      {SITE.socials.map((s) => (
        <a className="sbtn" key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={SOCIAL_ICONS[s.label] || LINK_ICON} /></svg>
          {s.label}
        </a>
      ))}
    </div>
  );
}