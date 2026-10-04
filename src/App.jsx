import { useEffect, useState } from "react";
import { SITE } from "./data/site.js";
import Home from "./pages/Home.jsx";
import { Privacy, Cookies } from "./pages/Legal.jsx";
import CookieBanner from "./components/CookieBanner.jsx";

export default function App() {
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => {
    const on = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const page = route === "#/privacy" ? <Privacy /> : route === "#/cookies" ? <Cookies /> : <Home />;

  return (
    <>
      <header>
        <nav className="wrap">
          <a className="brand" href="#/" onClick={() => window.scrollTo(0, 0)}>
  <img src="/logo.png" alt="Africa Education and Development Trust" />
  <span className="brandname">AEDT<i>.</i></span>
</a>
          <div className="links">
            <a className="hide" href="#/">Home</a>
            <a className="hide" href="#about">About</a>
            <a className="hide" href="#programs">Programmes</a>
            <a className="hide" href="#loan-process">How it works</a>
            <a className="hide" href="#stories">Stories</a>
            <a className="hide" href="#partners">Our Partners</a>
            <a className="hide" href="#news">News</a>
            <a className="hide" href="#careers">Careers</a>
            <a className="hide" href="#contact">Contact</a>
            <a className="btn" href={SITE.applyUrl} target="_blank" rel="noopener noreferrer">Apply now</a>
          </div>
        </nav>
      </header>
      <main>{page}</main>
      <footer className="site">
        <div className="wrap">
          <div className="cols">
            <div><b style={{ color: "#fff" }}>{SITE.name}</b><span>{SITE.email}</span></div>
            <div>
              <b style={{ color: "#fff" }}>Follow us</b>
              {SITE.socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
              ))}
            </div>
            <div>
              <b style={{ color: "#fff" }}>Legal</b>
              <a href="#/privacy">Privacy statement</a>
              <a href="#/cookies">Cookie policy</a>
            </div>
          </div>
          <small>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</small>
        </div>
      </footer>
      <CookieBanner />
    </>
  );
}