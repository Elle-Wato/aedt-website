import { useEffect, useState } from "react";
import { feature } from "topojson-client";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import world from "world-atlas/countries-110m.json";
import { SITE } from "../data/site.js";
import { Count, useSeen, Wave } from "./Widgets.jsx";

const W = 960;
const H = 500;
const CYCLE_MS = 3500;   // time between countries, in milliseconds
const CYCLE_COUNT = 10;  // how many top countries to loop through

const projection = geoNaturalEarth1().fitExtent([[10, 10], [W - 10, H - 10]], { type: "Sphere" });
const toPath = geoPath(projection);
const LAND = feature(world, world.objects.countries).features
  .filter((f) => Number(f.id) !== 10)
  .map((f) => ({ id: Number(f.id), d: toPath(f) }))
  .filter((l) => l.d);

const arc = (a, b) => {
  const dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const cx = (a[0] + b[0]) / 2;
  const cy = (a[1] + b[1]) / 2 - dist * 0.28;
  return `M${a[0]},${a[1]} Q${cx},${cy} ${b[0]},${b[1]}`;
};

export default function WorldReach() {
  const [ref, seen] = useSeen();
  const [active, setActive] = useState("Kenya");
  const [paused, setPaused] = useState(false);
  const list = [...(SITE.countries || [])].sort((a, b) => b.beneficiaries - a.beneficiaries);

  // Auto-cycle through the top countries. Must stay above the early return below.
  useEffect(() => {
    if (!seen || paused || list.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pool = list.slice(0, CYCLE_COUNT);
    const t = setTimeout(() => {
      const i = pool.findIndex((c) => c.name === active);
      setActive(pool[(i + 1) % pool.length].name);
    }, CYCLE_MS);
    return () => clearTimeout(t);
  }, [seen, paused, active, list.length]);

  if (!list.length) return null;

  const home = list.find((c) => c.name === "Kenya") || list[0];
  const pts = list.map((c) => ({ ...c, xy: projection(c.pin) }));
  const served = new Set(list.flatMap((c) => c.codes || []));
  const totalB = list.reduce((s, c) => s + c.beneficiaries, 0);
  const totalU = list.reduce((s, c) => s + c.universities, 0);
  const max = list[0].beneficiaries;
  const cur = pts.find((p) => p.name === active) || pts[0];
  const hxy = projection(home.pin);
  const top = list.slice(0, 8);
  const rest = list.slice(8);

  return (
    <section className="reach" id="reach" ref={ref}>
      <Wave color="#0B2545" />
      <div className="reachbg" aria-hidden="true"><i /><i /></div>
      <div className="wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <h2>Our reach across the world</h2>
        <p className="lead">AEDT beneficiaries study at universities in {list.length} countries, from East Africa to Asia, Europe and the Americas.</p>

        <div className="rstats">
          <div className="rs"><b><Count value={list.length} /></b><span>countries</span></div>
          <div className="rs"><b><Count value={totalU} /></b><span>universities</span></div>
          <div className="rs"><b><Count value={totalB} /></b><span>beneficiaries</span></div>
        </div>

        <div className="mapbox">
          <div className="rinfo" key={cur.name}>
            <h3>{cur.name}</h3>
            <div>
              <p><b>{cur.beneficiaries.toLocaleString()}</b><span>{cur.beneficiaries === 1 ? "beneficiary" : "beneficiaries"}</span></p>
              <p><b>{cur.universities}</b><span>{cur.universities === 1 ? "university" : "universities"}</span></p>
            </div>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className={"wmap" + (seen ? " go" : "")} role="img" aria-label="World map of the countries where AEDT beneficiaries study">
            <g>
              {LAND.map((l) => (<path key={l.id} d={l.d} className={served.has(l.id) ? "land on" : "land"} />))}
            </g>
            <g>
              {pts.filter((p) => p.name !== home.name).map((p, i) => (
                <path key={p.name} d={arc(hxy, p.xy)} pathLength="1" className="arc" style={{ animationDelay: 0.5 + i * 0.07 + "s" }} />
              ))}
            </g>
            <g>
              {pts.map((p, i) => {
                const r = 3.5 + Math.min(9, Math.sqrt(p.beneficiaries) / 7);
                return (
                  <g
                    key={p.name}
                    transform={`translate(${p.xy[0]},${p.xy[1]})`}
                    className={"pin" + (p.name === active ? " active" : "")}
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.name}: ${p.beneficiaries} beneficiaries`}
                    onMouseEnter={() => setActive(p.name)}
                    onFocus={() => setActive(p.name)}
                    onClick={() => setActive(p.name)}
                  >
                    <g className="pinin" style={{ animationDelay: 0.2 + i * 0.09 + "s" }}>
                      <circle r={r + 10} fill="transparent" />
                      <circle className="pulse" r={r} style={{ animationDelay: 1 + i * 0.09 + "s" }} />
                      <circle className="dot" r={r} />
                      {p.name === home.name && <text className="klabel" x={r + 5} y={-r}>{p.name}</text>}
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="rlists">
          <div className="rcard">
            <h3>Where our beneficiaries study</h3>
            {top.map((c) => (
              <button key={c.name} className={"rrow" + (c.name === active ? " on" : "")} onClick={() => setActive(c.name)} onMouseEnter={() => setActive(c.name)}>
                <span>{c.name}</span>
                <span className="rtrack"><i style={{ width: seen ? Math.max(3, Math.sqrt(c.beneficiaries / max) * 100) + "%" : 0 }} /></span>
                <b>{c.beneficiaries.toLocaleString()}</b>
              </button>
            ))}
            <small className="rnote">Bars are scaled for readability. Figures show the exact numbers.</small>
          </div>
          <div className="rcard">
            <h3>And {rest.length} more countries</h3>
            <div className="cchips">
              {rest.map((c) => (
                <button key={c.name} className={"cchip" + (c.name === active ? " on" : "")} onClick={() => setActive(c.name)} onMouseEnter={() => setActive(c.name)}>
                  {c.name} <b>{c.beneficiaries}</b>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}