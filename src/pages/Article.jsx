import { SITE } from "../data/site.js";
import { SocialLinks } from "../components/Widgets.jsx";

const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function Article({ slug }) {
  const a = SITE.news.find((n) => n.slug === slug);
  if (!a) {
    return (
      <div className="legal">
        <h1>Story not found</h1>
        <p><a href="#news">Back to news</a></p>
      </div>
    );
  }
  return (
    <article>
      <div className="arthero" style={{ backgroundImage: `url(${a.image})`, backgroundPosition: a.focus || "center" }}>
        <div className="wrap">
          <a className="back" href="#news">← All news</a>
          <span className="ntag">{a.tag}</span>
          <h1>{a.title}</h1>
          <time>{fmt(a.date)}</time>
        </div>
      </div>
      <div className="artbody">
        {a.body.map((p, i) => (<p key={i}>{p}</p>))}
        {a.gallery && a.gallery.length > 0 && (
          <div className="gallery">
            {a.gallery.map((g) => (
              <figure key={g.src}>
                <img src={g.src} alt={g.caption || ""} loading="lazy" />
                {g.caption && <figcaption>{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
        {a.source && (
          <p className="src">Also reported by <a href={a.source.url} target="_blank" rel="noopener noreferrer">{a.source.name}</a>.</p>
        )}
                <div className="nfollow">
          <div>
            <h3>Follow us for daily updates</h3>
            <p>For daily updates, follow us on our social media pages.</p>
          </div>
          <div className="nsocial">
            {SITE.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>
        </div>
        <a className="btn" href="#news">More news</a>
      </div>
    </article>
  );
}