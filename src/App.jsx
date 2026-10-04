import { useEffect, useState } from "react";
import { Wave } from "./components/Widgets.jsx";
import { SITE } from "./data/site.js";
import Home from "./pages/Home.jsx";
import { Privacy, Cookies } from "./pages/Legal.jsx";
import CookieBanner from "./components/CookieBanner.jsx";

const NAV = [
  ["About", "#about"],
  ["Programmes", "#programs"],
  ["How it works", "#loan-process"],
  ["Stories", "#stories"],
  ["Partners", "#partners"],
  ["News", "#news"],
  ["Contact", "#contact"],
];
export default function App() {
  const [route, setRoute] = useState(window.location.hash);
    const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const page = route === "#/privacy" ? <Privacy /> : route === "#/cookies" ? <Cookies /> : <Home />;

  return (
    <>
            <header>
        <nav className="wrap nav">
          <a className="brand" href="#/" onClick={() => { window.scrollTo(0, 0); setOpen(false); }}>
            <img src="/logo.png" alt="Africa Education and Development Trust" />
          </a>
          <div className={"links" + (open ? " open" : "")}>
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </div>
          <div className="actions">
            <a className="btn" href={SITE.applyUrl} target="_blank" rel="noopener noreferrer">Apply now</a>
            <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </header>
      <main>{page}</main>
            <footer className="site foot">
        <Wave color="#0B2545" />
        <div className="wrap">
          <div className="fcta">
            <div>
              <h3>Ready to start your studies?</h3>
              <p>Apply for an interest-free study loan on our portal today.</p>
            </div>
            <a className="btn" href={SITE.applyUrl} target="_blank" rel="noopener noreferrer">Apply now</a>
          </div>

          <div className="fgrid">
            <div className="fbrand">
              <span className="flogo"><img src="/logo.png" alt={SITE.name} /></span>
              <p>Empowering communities through education financing.</p>
              <div className="fsocial">
                {SITE.socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                ))}
              </div>
            </div>
            <div className="fcol">
              <h4>Explore</h4>
              <a href="#about">About us</a>
              <a href="#programs">Programmes</a>
              <a href="#loan-process">How it works</a>
              <a href="#stories">Stories</a>
              <a href="#partners">Partners</a>
              <a href="#news">News</a>
              <a href="#careers">Careers</a>
            </div>
            <div className="fcol">
              <h4>Contact</h4>
              <p>{SITE.address}</p>
              <p>{SITE.postal}</p>
              {SITE.phones.map((p) => (
                <a key={p} href={"tel:" + p.replace(/\s/g, "").replace(/^0/, "+254")}>{p}</a>
              ))}
              <a href={"mailto:" + SITE.email}>{SITE.email}</a>
            </div>
            <div className="fcol">
              <h4>Legal</h4>
              <a href="#/privacy">Privacy statement</a>
              <a href="#/cookies">Cookie policy</a>
            </div>
          </div>

          <div className="fbottom">
            <small>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</small>
            <button className="totop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </>
  );
}