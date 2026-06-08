import React from "react";
import { useNavigate } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes drift   { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(24px,-16px) scale(1.04)} 70%{transform:translate(-16px,12px) scale(0.97)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.2} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes lineGrow{ from{transform:scaleX(0)} to{transform:scaleX(1)} }

  html, body, #root { height:100%; overflow:hidden; }

  :root {
    --ink:       #0d0d0d;
    --ink-55:    rgba(13,13,13,0.55);
    --ink-10:    rgba(13,13,13,0.07);
    --ink-06:    rgba(13,13,13,0.04);
    --white:     #ffffff;
    --off:       #f5f5f2;
    --red:       #d63a2f;
    --border:    rgba(13,13,13,0.09);
    --border-md: rgba(13,13,13,0.13);
  }

  .ts-root {
    height: 100dvh;
    background: var(--off);
    font-family: 'Outfit', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* Blobs */
  .ts-blobs { position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden; }
  .ts-blob  { position:absolute;border-radius:50%;filter:blur(80px);opacity:0.48;animation:drift var(--d,12s) ease-in-out infinite;animation-delay:var(--dl,0s); }
  .b1 { width:520px;height:520px;top:-150px;left:-80px;  background:radial-gradient(circle,#d6e8ff 0%,transparent 68%);--d:15s; }
  .b2 { width:380px;height:380px;bottom:-100px;right:8%;  background:radial-gradient(circle,#ffe5d6 0%,transparent 68%);--d:12s;--dl:-5s; }
  .b3 { width:300px;height:300px;top:30%;right:-50px;    background:radial-gradient(circle,#dff4e8 0%,transparent 68%);--d:17s;--dl:-8s; }

  .ts-inner {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 900px;
    padding: 0 32px;
  }

  /* Header */
  .ts-header { text-align:center; margin-bottom:40px; animation:fadeUp 0.45s ease both; }
  .ts-tag {
    display: inline-flex; align-items:center; gap:7px;
    font-size:10.5px; font-weight:500; letter-spacing:0.13em; text-transform:uppercase;
    color:var(--ink-55); margin-bottom:14px;
  }
  .ts-dot  { width:5px;height:5px;border-radius:50%;background:var(--red);animation:pulse 2.5s ease-in-out infinite; }
  .ts-dash { width:22px;height:1px;background:var(--red); }

  .ts-h1 {
    font-family:'Syne',sans-serif;
    font-size:clamp(28px,4vw,46px);font-weight:800;
    line-height:0.96;letter-spacing:-0.03em;color:var(--ink);
    margin-bottom:12px;
  }
  .ts-h1 .hollow { -webkit-text-stroke:1.5px var(--ink);color:transparent; }

  .ts-sub {
    font-size:14.5px;color:var(--ink-55);font-weight:300;
    max-width:400px;margin:0 auto;line-height:1.65;
  }

  .ts-rule {
    width:60px;height:1px;background:var(--border-md);
    margin:20px auto 0;
    transform-origin:center;
    animation:lineGrow 0.6s 0.3s ease both;
  }

  /* Cards grid */
  .ts-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:16px;
    animation:fadeUp 0.45s 0.12s ease both;
  }

  /* Template card */
  .ts-card {
    position:relative;
    border-radius:18px;
    border:1px solid var(--border-md);
    overflow:hidden;
    cursor:pointer;
    transition:transform 0.2s,box-shadow 0.2s,border-color 0.2s;
    background:rgba(255,255,255,0.72);
    backdrop-filter:blur(16px);
  }
  .ts-card:hover {
    transform:translateY(-4px);
    box-shadow:0 16px 40px rgba(13,13,13,0.12);
    border-color:var(--ink);
  }

  /* Preview thumbnail */
  .ts-thumb {
    height:200px;
    display:flex;align-items:center;justify-content:center;
    position:relative;overflow:hidden;
    border-bottom:1px solid var(--border);
  }
  .ts-thumb-emoji { font-size:52px;position:relative;z-index:2; }

  /* Decorative mini-UI inside thumbnail */
  .ts-thumb-ui {
    position:absolute;inset:0;
    display:flex;flex-direction:column;
    padding:18px;gap:8px;
    opacity:0.18;
    transition:opacity 0.2s;
  }
  .ts-card:hover .ts-thumb-ui { opacity:0.28; }
  .ts-thumb-bar  { height:6px;border-radius:3px;background:var(--ink); }
  .ts-thumb-bar.w100 { width:100%; }
  .ts-thumb-bar.w70  { width:70%; }
  .ts-thumb-bar.w45  { width:45%; }
  .ts-thumb-row  { display:flex;gap:8px;flex:1; }
  .ts-thumb-block{ border-radius:6px;background:var(--ink); }

  /* Modern specific */
  .ts-card-modern .ts-thumb { background:linear-gradient(135deg,#f0f4ff 0%,#e8f0ff 100%); }
  /* Professional specific */
  .ts-card-pro .ts-thumb { background:linear-gradient(135deg,#f5f0ff 0%,#ede8ff 100%); }

  /* Pro shimmer line */
  .ts-card-pro::before {
    content:'';position:absolute;top:0;left:0;right:0;height:2px;z-index:5;
    background:linear-gradient(90deg,#4f8ef7,#a78bfa,#f7a24f,#4f8ef7);
    background-size:200% 100%;animation:shimmer 3s linear infinite;
  }

  /* Card body */
  .ts-card-body { padding:22px 22px 24px; }

  .ts-card-badge {
    font-size:9.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;
    padding:2px 9px;border-radius:5px;display:inline-block;margin-bottom:10px;
  }
  .ts-badge-free { background:var(--ink-10);color:var(--ink-55); }
  .ts-badge-pro  { background:rgba(79,142,247,0.1);color:#3a6fd4; }

  .ts-card-title {
    font-family:'Syne',sans-serif;
    font-size:20px;font-weight:800;
    color:var(--ink);letter-spacing:-0.02em;
    margin-bottom:6px;line-height:1;
  }
  .ts-card-desc {
    font-size:13.5px;color:var(--ink-55);
    font-weight:300;line-height:1.65;margin-bottom:18px;
  }

  /* Features list */
  .ts-features { display:flex;flex-direction:column;gap:5px;margin-bottom:20px; }
  .ts-feature  { display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ink-55);font-weight:300; }
  .ts-feature::before { content:'✓';color:var(--ink);font-weight:700;font-size:11px;flex-shrink:0; }

  /* CTA button */
  .ts-cta {
    width:100%;height:46px;
    border:none;border-radius:11px;
    font-family:'Syne',sans-serif;font-size:13px;font-weight:600;
    letter-spacing:0.06em;text-transform:uppercase;
    cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:10px;
    transition:background 0.15s,transform 0.12s,box-shadow 0.15s;
  }
  .ts-cta-dark { background:var(--ink);color:#fff; }
  .ts-cta-dark:hover { background:#1e1e1e;transform:translateY(-1px);box-shadow:0 6px 18px rgba(13,13,13,0.2); }
  .ts-cta-outline {
    background:transparent;color:var(--ink);
    border:1.5px solid var(--border-md);
  }
  .ts-cta-outline:hover { background:var(--ink-06);transform:translateY(-1px);box-shadow:0 4px 14px rgba(13,13,13,0.08); }
  .ts-cta:active { transform:translateY(0)!important;box-shadow:none!important; }

  .ts-cta-ring {
    width:20px;height:20px;border-radius:50%;
    border:1.5px solid rgba(255,255,255,0.28);
    display:flex;align-items:center;justify-content:center;
  }

  /* Back link */
  .ts-back {
    position:fixed;top:20px;left:24px;z-index:10;
    display:flex;align-items:center;gap:7px;
    font-size:12px;font-weight:500;color:var(--ink-55);
    background:rgba(255,255,255,0.7);border:1px solid var(--border-md);
    backdrop-filter:blur(8px);border-radius:8px;
    padding:7px 13px;cursor:pointer;
    transition:background 0.13s,color 0.13s;
    font-family:'Outfit',sans-serif;
    animation:fadeIn 0.4s 0.2s ease both;
  }
  .ts-back:hover { background:#fff;color:var(--ink); }

  /* Mobile */
  @media (max-width:640px) {
    html,body,#root { overflow:auto; }
    .ts-root { height:auto;min-height:100dvh;align-items:flex-start;padding:80px 0 48px; }
    .ts-inner { padding:0 18px; }
    .ts-grid  { grid-template-columns:1fr; }
    .ts-thumb { height:160px; }
    .b3 { display:none; }
  }
`;

const TEMPLATES = [
  {
    id:      "modern",
    path:    "/modern",
    cls:     "ts-card-modern",
    badge:   { label:"Free", cls:"ts-badge-free" },
    emoji:   "⚡",
    title:   "Modern Edition",
    desc:    "Clean, minimal, developer-focused layouts built for impact.",
    features:[
      "Bold typography & whitespace",
      "Project showcase section",
      "Skills & tools grid",
      "Mobile-first responsive",
    ],
    cta:     { label:"Browse Modern",    dark:true },
    thumbBars:[
      { cls:"w100", mt:0 },
      { cls:"w70",  mt:0 },
      { cls:"w45",  mt:0 },
    ],
  },
  {
    id:      "professional",
    path:    "/professional",
    cls:     "ts-card-pro",
    badge:   { label:"Premium", cls:"ts-badge-pro" },
    emoji:   "💼",
    title:   "Professional Edition",
    desc:    "Corporate, recruiter-friendly templates that command attention.",
    features:[
      "Executive layout & hierarchy",
      "Timeline experience section",
      "Achievements & certifications",
      "ATS-compatible structure",
    ],
    cta:     { label:"Browse Professional", dark:false },
    thumbBars:[
      { cls:"w100", mt:0 },
      { cls:"w70",  mt:0 },
      { cls:"w45",  mt:0 },
    ],
  },
];

const ArrowRight = () => (
  <svg width="9" height="9" viewBox="0 0 10 10" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 5h6M5 2l3 3-3 3"/>
  </svg>
);

export default function TemplateSelector() {
  const navigate = useNavigate();

  return (
    <>
      <style>{css}</style>
      <div className="ts-root">

        {/* Blobs */}
        <div className="ts-blobs" aria-hidden="true">
          <div className="ts-blob b1"/><div className="ts-blob b2"/><div className="ts-blob b3"/>
        </div>

        {/* Back button */}
        <button className="ts-back" onClick={() => navigate("/dashboard")}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Dashboard
        </button>

        <div className="ts-inner">

          {/* Header */}
          <div className="ts-header">
            <div className="ts-tag">
              <span className="ts-dot"/>
              <span className="ts-dash"/>
              Templates
            </div>
            <h1 className="ts-h1">
              Pick your <span className="hollow">template.</span>
            </h1>
            <p className="ts-sub">
              Choose a category to get started — you can switch templates any time from the builder.
            </p>
            <div className="ts-rule"/>
          </div>

          {/* Cards */}
          <div className="ts-grid">
            {TEMPLATES.map((t, i) => (
              <div
                key={t.id}
                className={`ts-card ${t.cls}`}
                style={{ animationDelay: `${0.08 * i}s` }}
                onClick={() => navigate(t.path)}
              >
                {/* Thumbnail */}
                <div className="ts-thumb">
                  {/* Decorative lines */}
                  <div className="ts-thumb-ui" aria-hidden="true">
                    <div className="ts-thumb-bar w100"/>
                    <div className="ts-thumb-bar w70"/>
                    <div className="ts-thumb-row">
                      <div className="ts-thumb-block" style={{flex:1}}/>
                      <div className="ts-thumb-block" style={{flex:2}}/>
                    </div>
                    <div className="ts-thumb-bar w45"/>
                    <div className="ts-thumb-row">
                      <div className="ts-thumb-block" style={{flex:1}}/>
                      <div className="ts-thumb-block" style={{flex:1}}/>
                      <div className="ts-thumb-block" style={{flex:1}}/>
                    </div>
                  </div>
                  <span className="ts-thumb-emoji">{t.emoji}</span>
                </div>

                {/* Body */}
                <div className="ts-card-body">
                  <span className={`ts-card-badge ${t.badge.cls}`}>{t.badge.label}</span>
                  <div className="ts-card-title">{t.title}</div>
                  <div className="ts-card-desc">{t.desc}</div>

                  <div className="ts-features">
                    {t.features.map((f, j) => (
                      <div key={j} className="ts-feature">{f}</div>
                    ))}
                  </div>

                  <button
                    className={`ts-cta ${t.cta.dark ? "ts-cta-dark" : "ts-cta-outline"}`}
                    onClick={e => { e.stopPropagation(); navigate(t.path); }}
                  >
                    {t.cta.label}
                    {t.cta.dark
                      ? <div className="ts-cta-ring" style={{borderColor:"rgba(255,255,255,0.28)"}}><ArrowRight/></div>
                      : <ArrowRight/>
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}