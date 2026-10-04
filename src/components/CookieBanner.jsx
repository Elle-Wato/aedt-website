import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { setShow(!localStorage.getItem("cookie-choice")); } catch { setShow(true); }
  }, []);
  const choose = (v) => {
    try { localStorage.setItem("cookie-choice", v); } catch { /* ignore */ }
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Cookie notice">
      <p>We use essential cookies, and optional analytics cookies only if you agree. See our <a href="#/cookies">Cookie policy</a>.</p>
      <button className="btn ghost" onClick={() => choose("essential")}>Essential only</button>
      <button className="btn" onClick={() => choose("all")}>Accept all</button>
    </div>
  );
}