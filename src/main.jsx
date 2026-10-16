import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.jsx";
import { SITE } from "./data/site.js";

async function boot() {
  try {
    const r = await fetch("/api/content.php", { cache: "no-store" });
    if (r.ok) {
      const data = await r.json();
      if (data && typeof data === "object") Object.assign(SITE, data);
    }
  } catch {
    /* if the admin data is unavailable, the built-in content in site.js is used */
  }
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

boot();