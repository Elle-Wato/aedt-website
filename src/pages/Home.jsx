import { useEffect, useRef, useState } from "react";
import { SITE } from "../data/site.js";
import { Count, Icon, ICONS, Wave, Bars, Donut, Ladder, COLORS, useSeen } from "../components/Widgets.jsx";

const SUPPORT_IMG = ["mentorship", "skills", "volunteer", "workstudy"];
const FACES = ["50% 70%", "25% 35%", "55% 40%"];

const CI = {
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  box: "M22 12h-6l-2 3h-4l-2-3H2 M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M22 6l-10 7L2 6",
};

function Contact() {
  const q = encodeURIComponent(SITE.mapQuery);
  const tel = (p) => "tel:" + p.replace(/\s/g, "").replace(/^0/, "+254");
  return (
    <section className="soft contact" id="contact">
      <Wave color="#E8F5EE" />
      <div className="wrap">
        <h2>Contact us</h2>
        <p className="lead">Questions about our loans or partnerships? Call, write, or visit our office.</p>
        <div className="cbox">
          <div className="cinfo">
            <ul>
              <li><span className="cico"><Glyph d={CI.pin} /></span><div><b>Visit us</b><p>{SITE.address}</p></div></li>
              <li><span className="cico"><Glyph d={CI.box} /></span><div><b>Postal address</b><p>{SITE.postal}</p></div></li>
              <li><span className="cico"><Glyph d={CI.phone} /></span><div><b>Call us</b>{SITE.phones.map((p) => (<p key={p}><a href={tel(p)}>{p}</a></p>))}</div></li>
              <li><span className="cico"><Glyph d={CI.mail} /></span><div><b>Email us</b><p><a href={"mailto:" + SITE.email}>{SITE.email}</a></p></div></li>
            </ul>
            <div className="csocial">
              {SITE.socials.map((s) => (<a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>))}
            </div>
            <a className="btn dirbtn" href={"https://www.google.com/maps/search/?api=1&query=" + q} target="_blank" rel="noopener noreferrer">Get directions</a>
          </div>
          <div className="cmap">
            <iframe
              title="Map showing the AEDT office location"
              src={"https://www.google.com/maps?q=" + q + "&output=embed"}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const initialsOf = (s) => s.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

function Voices() {
  const list = SITE.testimonials;
  const track = useRef(null);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (i) => {
    const el = track.current;
    if (!el || !el.children.length) return;
    const n = (i + list.length) % list.length;
    el.scrollTo({ left: el.children[n].offsetLeft - el.children[0].offsetLeft, behavior: "smooth" });
    setIdx(n);
  };

  const onScroll = () => {
    const el = track.current;
    if (!el || el.children.length < 2) return;
    const step = el.children[1].offsetLeft - el.children[0].offsetLeft;
    setIdx(Math.min(list.length - 1, Math.round(el.scrollLeft / step)));
  };

  useEffect(() => {
    if (paused || list.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(idx + 1), 5500);
    return () => clearTimeout(t);
  }, [idx, paused]);

  return (
    <section id="stories" className="voices">
      <Wave color="#F7FBF9" />
      <span className="bigq" aria-hidden="true">“</span>
      <div className="wrap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <h2>Voices of beneficiaries</h2>
        <p className="lead">Behind every statistic is a student who kept studying.</p>
        <div className="vtrack" ref={track} onScroll={onScroll}>
          {list.map((t, i) => {
            const photo = t.photo ?? (i < 3 ? `/images/t${i + 1}.jpg` : null);
            return (
              <figure key={t.who + i} className={"vcard" + (i % 2 === 0 ? " dark" : "")}>
                <blockquote><p>{t.quote}</p></blockquote>
                <figcaption>
                  {photo ? (
                    <img className="av" src={photo} alt="" style={{ objectPosition: t.pos ?? FACES[i] ?? "50% 40%" }} />
                  ) : (
                    <span className="av init">{initialsOf(t.who)}</span>
                  )}
                  <div><b>{t.who}</b><span>AEDT beneficiary</span></div>
                </figcaption>
              </figure>
            );
          })}
        </div>
        {list.length > 1 && (
          <div className="vctl">
            <div className="vdots">
              {list.map((_, i) => (
                <button key={i} className={i === idx ? "on" : ""} onClick={() => go(i)} aria-label={`Show testimonial ${i + 1}`} />
              ))}
            </div>
            <div className="varrows">
              <button onClick={() => go(idx - 1)} aria-label="Previous testimonial">‹</button>
              <button onClick={() => go(idx + 1)} aria-label="Next testimonial">›</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


function PartnerLogo({ p }) {
  const [bad, setBad] = useState(!p.logo);
  const initials = p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="pitem">
        <span className={"plogo" + (p.dark ? " dark" : "")}>
        {bad ? <span className="pinit">{initials}</span> : <img src={p.logo} alt="" onError={() => setBad(true)} />}
      </span>
      <span className="pname">{p.name}</span>
    </div>
  );
}

function Partners() {
  const list = SITE.partners;
  if (!list.length) return null;
  const base = Array.from({ length: Math.ceil(8 / list.length) }, () => list).flat();
  const row = [...base, ...base];
  const row2 = [...base].reverse().concat([...base].reverse());
  return (
    <section className="partners" id="partners">
      <Wave color="#0B2545" />
      <div className="orb-a" aria-hidden="true" />
      <div className="orb-b" aria-hidden="true" />
      <div className="wrap">
        <h2>Our partners</h2>
        <p className="lead">Together with these institutions and organisations, we put more students through university.</p>
      </div>
      <div className="marquee" aria-label="Our partners">
        <div className="mtrack">{row.map((p, i) => (<PartnerLogo key={i} p={p} />))}</div>
        <div className="mtrack rev">{row2.map((p, i) => (<PartnerLogo key={i} p={p} />))}</div>
      </div>
    </section>
  );
}

const Glyph = ({ d }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
);
const G = {
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  flask: "M9 3h6 M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3",
  growth: "M3 17l6-6 4 4 8-8 M15 7h6v6",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z",
};
const STORY = [
  [G.flask, "It began as a pilot", "We tested a new idea: interest-free study loans run on a revolving fund."],
  [G.growth, "A model that lasts", "Repayments fund the next student, fixing the sustainability gap of one-off bursaries."],
  [G.globe, "Built to be replicated", "Our goal is to take the model to other regions and countries."],
];

const PROG_IMG = ["impact", "hero", "outreach", "loan", "mentorship"];
const PROG_ICON = [2, 0, 3, 1, 4];

const TAGS = ["Apply on our portal", "Panel interview", "Guarantors sign", "Paid via RTGS", "Repaid during study"];

function Step({ t, d, i }) {
  const [ref, seen] = useSeen();
  return (
    <li ref={ref} className={"tstep" + (i % 2 ? " right" : "") + (seen ? " in" : "")}>
      <div className="tcard">
        <span className="ghost-n">{i + 1}</span>
        <h3>{t}</h3>
        <p>{d}</p>
        <span className="ttag">{TAGS[i]}</span>
      </div>
      <div className="orb"><Icon i={i} /><span className="n">{i + 1}</span></div>
    </li>
  );
}

function Cycle() {
  const nodes = [
    [3, "Loan paid to the university", { left: 123, top: 15 }],
    [0, "Student graduates and repays", { left: 217, top: 177 }],
    [4, "Fund helps the next student", { left: 30, top: 177 }],
  ];
  return (
    <div className="cycle-wrap">
      <div className="cycle" role="img" aria-label="Repayments fund the next student's loan">
        <svg className="ringsvg" viewBox="0 0 200 200" aria-hidden="true"><circle className="ring" cx="100" cy="100" r="72" /></svg>
        <div className="core"><b>Revolving fund</b></div>
        {nodes.map(([ic, label, pos], k) => (
          <span className="cnode" key={label} style={pos} title={label}><Icon i={ic} /><em>{k + 1}</em></span>
        ))}
      </div>
      <ol className="clegend">
        {nodes.map(([, label]) => (<li key={label}>{label}</li>))}
      </ol>
    </div>
  );
}

function Program({ p, i }) {
  const [ref, seen] = useSeen();
  const pct = p.graduates ? Math.round((p.graduates / p.beneficiaries) * 100) : 0;
  return (
    <div className="pcard" ref={ref}>
      <div className="pimg" style={{ backgroundImage: `url(/images/${PROG_IMG[i]}.jpg)` }}>
        <span className="chip" style={{ background: COLORS[i] }}><Icon i={PROG_ICON[i]} /></span>
      </div>
      <div className="pbody">
        <h3>{p.title}</h3>
        <p>{p.text}</p>
        <div className="pnum"><b><Count value={p.beneficiaries} /></b><span>beneficiaries</span></div>
        {p.graduates ? (
          <div className="pgrad">
            <div className="meter"><i style={{ width: seen ? pct + "%" : 0 }} /></div>
            <small>{p.graduates} of {p.beneficiaries} have graduated</small>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Home() {
  const h = SITE.headline;
  const stat = (node, label) => (<div className="stat"><b>{node}</b><small>{label}</small></div>);
  const apply = { href: SITE.applyUrl, target: "_blank", rel: "noopener noreferrer" };
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <h1>"...Empowering Communities Through Education Financing ..."</h1>
          <p>Our revolving fund turns every repaid shilling into a new student's tuition. Thousands of learners have studied without the weight of interest.</p>
          <div className="row">
            <a className="btn" {...apply}>Apply for a study loan</a>
            <a className="btn ghost" href="#loan-process">See how it works</a>
          </div>
        </div>
        <div className="badge" aria-hidden="true"><b>0%</b><span>interest</span></div>
      </div>

      <div className="impact" id="impact">
        <Wave color="#0B2545" />
        <div className="wrap">
          <h2>Our impact as at {SITE.asOf}</h2>
          <div className="stats">
            {stat(<Count value={h.beneficiaries} />, "Beneficiaries supported")}
            {stat(<Count value={h.graduates} />, "Graduates")}
            {stat(<Count value={h.portfolioMillions} prefix="KES " suffix="M" />, "Loan portfolio")}
            {stat(<Count value={h.repayment} suffix="%" />, "Repayment compliance rate")}
          </div>
          <Bars />
        </div>
      </div>

           <section id="about">
        <div className="wrap">
          <div className="about">
            <div className="collage">
              <img className="big" src="/images/outreach.jpg" alt="AEDT team addressing students at an outreach event" />
              <img className="small" src="/images/mentorship.jpg" alt="Students at an AEDT mentorship forum" />
              <div className="tag"><b><Count value={SITE.headline.beneficiaries} /></b><span>students supported</span></div>
            </div>
            <div>
              <h2>About us</h2>
              <p className="lead">AEDT is a non-profit Trust registered in Kenya. Our goal is to empower communities through education financing.</p>
              <ol className="story">
                {STORY.map(([d, t, text]) => (
                  <li key={t}>
                    <span className="sico"><Glyph d={d} /></span>
                    <div><h3>{t}</h3><p>{text}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="vmcards">
            <div className="vmcard vision">
              <span className="vmico"><Glyph d={G.eye} /></span>
              <h3>Our vision</h3>
              <p>A premier soft loan provider in Africa.</p>
              <svg className="mark" viewBox="0 0 24 24" aria-hidden="true"><path d={G.eye} /></svg>
            </div>
            <div className="vmcard mission">
              <span className="vmico"><Glyph d={G.target} /></span>
              <h3>Our mission</h3>
              <p>To provide soft loans to the most deserving members of society through prudent use of resources, for socio-economic empowerment.</p>
              <svg className="mark" viewBox="0 0 24 24" aria-hidden="true"><path d={G.target} /></svg>
            </div>
          </div>
        </div>
      </section>

            <section className="soft" id="programs">
        <Wave color="#E8F5EE" />
        <div className="wrap">
          <h2>Financing programmes</h2>
          <p className="lead">Five loan programmes, each backed by personal guarantees and a commitment to repay so the fund can help the next student.</p>
          <div className="infographic">
            <div><h3>Who we have supported</h3><Donut /></div>
            <div><h3>Every level of study</h3><Ladder /></div>
          </div>
          <div className="grid pgrid">
            {SITE.programs.map((p, i) => (<Program key={p.title} p={p} i={i} />))}
          </div>
        </div>
      </section>

            <section id="loan-process" className="process">
        <Wave color="#0B2545" />
        <div className="wrap">
          <h2>How the study loan works</h2>
          <p className="lead">Five clear steps from application to repayment. Check the eligibility criteria on the portal before you apply.</p>
          <ol className="timeline">
            {SITE.steps.map(([t, d], i) => (<Step key={t} t={t} d={d} i={i} />))}
          </ol>
          <div className="loopband">
            <div>
              <h3>Your repayment is someone's tuition</h3>
              <p>Every shilling repaid goes back into the fund, so the next student can study without interest.</p>
              <a className="btn" {...apply}>Start your application</a>
            </div>
            <Cycle />
          </div>
        </div>
      </section>

      <section className="soft" id="support">
        <Wave color="#E8F5EE" />
        <div className="wrap">
          <h2>Beyond the loan</h2>
          <p className="lead">We prepare students for their careers and their communities, not just their fees.</p>
          <div className="grid pics">
            {SITE.support.map(([t, d], i) => (
              <div className="pic" key={t} style={{ backgroundImage: `url(/images/${SUPPORT_IMG[i]}.jpg)` }}>
                <div><h3>{t}</h3><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

              <Voices />

            < Partners />

      <section className="news soft" id="news">
        <Wave color="#E8F5EE" />
        <div className="wrap">
          <h2>News and updates</h2>
          {SITE.news.length === 0 && <p className="lead">No updates yet. Follow us on social media for the latest.</p>}
          {SITE.news.map((n) => (
            <article key={n.title}>
              <time>{new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="careers">
        <div className="wrap">
          <h2>Careers</h2>
          {SITE.careers.length === 0 ? (
            <p className="lead">There are no open roles right now. Check back soon.</p>
          ) : (
            SITE.careers.map((c) => (<p key={c.title}><a href={c.link}><b>{c.title}</b></a>, {c.location}</p>))
          )}
        </div>
      </section>

            <Contact />
    </>
  );
}