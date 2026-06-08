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
  @keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

  :root {
    --ink:       #0d0d0d;
    --ink-55:    rgba(13,13,13,0.55);
    --ink-20:    rgba(13,13,13,0.18);
    --ink-10:    rgba(13,13,13,0.07);
    --ink-06:    rgba(13,13,13,0.04);
    --white:     #ffffff;
    --off:       #f5f5f2;
    --red:       #d63a2f;
    --green:     #2a7a4a;
    --border:    rgba(13,13,13,0.09);
    --border-md: rgba(13,13,13,0.13);
  }

  .db-root {
    min-height: 100%;
    background: var(--off);
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow-x: hidden;
    padding: 28px 32px 56px;
  }

  /* Blobs */
  .db-blobs { position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden; }
  .db-blob  { position:absolute;border-radius:50%;filter:blur(80px);opacity:0.48;animation:drift var(--d,12s) ease-in-out infinite;animation-delay:var(--dl,0s); }
  .b1 { width:540px;height:540px;top:-160px;left:-80px; background:radial-gradient(circle,#d6e8ff 0%,transparent 68%);--d:15s; }
  .b2 { width:400px;height:400px;bottom:-100px;right:8%; background:radial-gradient(circle,#ffe5d6 0%,transparent 68%);--d:12s;--dl:-5s; }
  .b3 { width:320px;height:320px;top:35%;right:-60px;   background:radial-gradient(circle,#dff4e8 0%,transparent 68%);--d:17s;--dl:-8s; }

  .db-inner { position:relative;z-index:2;width:100%;margin:0 auto; }

  /* ── Welcome header ── */
  .db-hero { margin-bottom:28px; animation:fadeUp 0.45s ease both; }
  .db-tag  { display:inline-flex;align-items:center;gap:7px;font-size:10.5px;font-weight:500;letter-spacing:0.13em;text-transform:uppercase;color:var(--ink-55);margin-bottom:10px; }
  .db-tag-dot  { width:5px;height:5px;border-radius:50%;background:var(--red);animation:pulse 2.5s ease-in-out infinite; }
  .db-tag-dash { width:22px;height:1px;background:var(--red); }
  .db-h1 { font-family:'Syne',sans-serif;font-size:clamp(28px,3.2vw,42px);font-weight:800;line-height:0.96;letter-spacing:-0.03em;color:var(--ink);margin-bottom:8px; }
  .db-h1 .hollow { -webkit-text-stroke:1.5px var(--ink);color:transparent; }
  .db-sub { font-size:14px;color:var(--ink-55);font-weight:300; }
  .db-rule { width:100%;height:1px;background:var(--border-md);margin:22px 0;transform-origin:left;animation:lineGrow 0.6s 0.2s ease both; }

  /* ── Stats row ── */
  .db-stats { display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:22px; }
  .db-stat  {
    background:rgba(255,255,255,0.72);backdrop-filter:blur(14px);
    border:1px solid var(--border-md);border-radius:14px;
    padding:18px 20px;
    transition:box-shadow 0.18s,transform 0.18s;
    animation:countUp 0.45s ease both;
  }
  .db-stat:hover { box-shadow:0 8px 24px rgba(13,13,13,0.08);transform:translateY(-2px); }
  .db-stat-num   { font-family:'Syne',sans-serif;font-size:30px;font-weight:800;color:var(--ink);letter-spacing:-0.02em;line-height:1;margin-bottom:5px; }
  .db-stat-label { font-size:12px;color:var(--ink-55);font-weight:300; }
  .db-stat-badge { margin-top:6px;font-size:11px;font-weight:500; }
  .up   { color:var(--green); }
  .dim  { color:var(--ink-55); }

  /* ── Section heading ── */
  .db-sec-hd {
    display:flex;align-items:center;justify-content:space-between;
    margin-bottom:14px;
  }
  .db-sec-title { font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--ink);letter-spacing:0.01em; }
  .db-sec-link  { font-size:12px;color:var(--ink-55);font-weight:400;background:none;border:none;cursor:pointer;transition:color 0.15s;padding:0;font-family:'Outfit',sans-serif; }
  .db-sec-link:hover { color:var(--ink); }

  /* ── Promo row ── */
  .db-promo { display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:22px; }
  .db-promo-card {
    border-radius:14px;padding:20px 22px;
    display:flex;align-items:center;justify-content:space-between;gap:16px;
    border:1px solid var(--border-md);
    position:relative;overflow:hidden;
    transition:transform 0.15s,box-shadow 0.15s;
  }
  .db-promo-card:hover { transform:translateY(-2px);box-shadow:0 8px 28px rgba(13,13,13,0.1); }
  .db-promo-free { background:rgba(255,255,255,0.72);backdrop-filter:blur(12px); }
  .db-promo-pro  { background:var(--ink);border-color:transparent; }
  .db-promo-pro::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#4f8ef7,#a78bfa,#f7a24f,#4f8ef7);background-size:200% 100%;animation:shimmer 3s linear infinite; }
  .db-promo-badge { font-size:9.5px;font-weight:600;letter-spacing:0.11em;text-transform:uppercase;padding:2px 8px;border-radius:5px;display:inline-block;margin-bottom:6px; }
  .badge-free { background:var(--ink-10);color:var(--ink-55); }
  .badge-pro  { background:rgba(255,255,255,0.14);color:rgba(255,255,255,0.6); }
  .db-promo-title { font-family:'Syne',sans-serif;font-size:15px;font-weight:700;letter-spacing:-0.01em; }
  .db-promo-desc  { font-size:12.5px;font-weight:300;margin-top:3px; }

  /* ── Action grid ── */
  .db-actions { display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:22px; }
  .db-action-card {
    background:rgba(255,255,255,0.72);backdrop-filter:blur(14px);
    border:1px solid var(--border-md);border-radius:14px;
    padding:20px;cursor:pointer;
    display:flex;align-items:flex-start;gap:14px;
    transition:transform 0.15s,box-shadow 0.15s,border-color 0.15s;
    animation:fadeUp 0.45s ease both;
  }
  .db-action-card:hover { transform:translateY(-2px);box-shadow:0 10px 28px rgba(13,13,13,0.1);border-color:var(--ink-20); }
  .db-action-icon {
    width:42px;height:42px;border-radius:11px;
    display:flex;align-items:center;justify-content:center;
    font-size:20px;flex-shrink:0;
    background:var(--ink-06);
    transition:background 0.15s;
  }
  .db-action-card:hover .db-action-icon { background:var(--ink-10); }
  .db-action-title { font-family:'Syne',sans-serif;font-size:13.5px;font-weight:700;color:var(--ink);margin-bottom:3px; }
  .db-action-desc  { font-size:12px;color:var(--ink-55);font-weight:300;line-height:1.5; }
  .db-action-arrow { margin-left:auto;color:var(--ink-55);flex-shrink:0;opacity:0;transition:opacity 0.15s,transform 0.15s; }
  .db-action-card:hover .db-action-arrow { opacity:1;transform:translateX(3px); }

  /* ── Get started card ── */
  .db-start-card {
    background:rgba(255,255,255,0.72);backdrop-filter:blur(14px);
    border:1px solid var(--border-md);border-radius:14px;
    padding:26px 28px;margin-bottom:22px;
    position:relative;overflow:hidden;
    animation:fadeUp 0.45s 0.12s ease both;
    transition:box-shadow 0.18s;
  }
  .db-start-card:hover { box-shadow:0 10px 32px rgba(13,13,13,0.09); }
  .db-start-card::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--ink);border-radius:14px 14px 0 0; }
  .db-start-inner { display:flex;align-items:flex-start;justify-content:space-between;gap:24px; }
  .db-start-body  { flex:1;min-width:0; }
  .db-start-title { font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:var(--ink);letter-spacing:-0.01em;margin-bottom:6px; }
  .db-start-desc  { font-size:13.5px;color:var(--ink-55);font-weight:300;line-height:1.7;margin-bottom:20px;max-width:500px; }

  /* Steps */
  .db-steps { display:flex;gap:0;border:1px solid var(--border-md);border-radius:11px;overflow:hidden;margin-bottom:20px; }
  .db-step  { flex:1;padding:13px 15px;border-right:1px solid var(--border-md);background:rgba(255,255,255,0.5);display:flex;align-items:flex-start;gap:9px; }
  .db-step:last-child { border-right:none; }
  .db-step-num { font-family:'Syne',sans-serif;font-size:11px;font-weight:700;color:#fff;background:var(--ink);width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px; }
  .db-step strong { display:block;font-size:12px;font-weight:600;color:var(--ink);margin-bottom:2px; }
  .db-step span   { font-size:11.5px;color:var(--ink-55);font-weight:300; }

  /* Coming soon */
  .db-coming { display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:22px; }
  .db-coming-card {
    background:rgba(255,255,255,0.55);backdrop-filter:blur(10px);
    border:1px dashed var(--border-md);border-radius:14px;
    padding:18px 18px;
    animation:fadeUp 0.45s ease both;
    position:relative;overflow:hidden;
  }
  .db-coming-tag  { font-size:9px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink-55);padding:2px 7px;background:var(--ink-06);border-radius:4px;display:inline-block;margin-bottom:10px; }
  .db-coming-title{ font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--ink);margin-bottom:4px; }
  .db-coming-desc { font-size:12px;color:var(--ink-55);font-weight:300;line-height:1.5; }
  .db-coming-icon { position:absolute;top:14px;right:14px;font-size:18px;opacity:0.25; }

  /* Bottom divider */
  .db-divider { display:flex;align-items:center;gap:12px;margin:6px 0 20px; }
  .db-divider-line { flex:1;height:1px;background:var(--border); }
  .db-divider-txt  { font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-55);white-space:nowrap;font-weight:500; }

  /* Buttons */
  .btn { height:42px;padding:0 20px;border-radius:9px;border:none;font-family:'Syne',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background 0.15s,transform 0.12s,box-shadow 0.15s; }
  .btn-dark  { background:var(--ink);color:#fff; }
  .btn-dark:hover  { background:#1e1e1e;transform:translateY(-1px);box-shadow:0 6px 18px rgba(13,13,13,0.2); }
  .btn-ghost { background:rgba(255,255,255,0.75);color:var(--ink);border:1px solid var(--border-md); }
  .btn-ghost:hover { background:#fff;box-shadow:0 3px 10px rgba(13,13,13,0.07); }
  .btn-sm  { height:34px;padding:0 14px;font-size:11px; }
  .btn-ring { width:18px;height:18px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center; }

  /* Mobile */
  @media (max-width:900px) {
    .db-stats   { grid-template-columns:1fr 1fr; }
    .db-actions { grid-template-columns:1fr 1fr; }
    .db-coming  { grid-template-columns:1fr 1fr; }
    .db-start-inner { flex-direction:column; }
  }
  @media (max-width:600px) {
    .db-root    { padding:20px 16px 48px; }
    .db-stats   { grid-template-columns:1fr 1fr; }
    .db-promo   { grid-template-columns:1fr; }
    .db-actions { grid-template-columns:1fr; }
    .db-coming  { grid-template-columns:1fr 1fr; }
    .db-steps   { flex-direction:column; }
    .db-step    { border-right:none;border-bottom:1px solid var(--border-md); }
    .db-step:last-child { border-bottom:none; }
    .db-h1      { font-size:28px; }
    .b3 { display:none; }
  }
  @media (max-width:420px) {
    .db-stats  { grid-template-columns:1fr; }
    .db-coming { grid-template-columns:1fr; }
  }
`;

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const BtnArrow = () => (
  <div className="btn-ring">
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5h6M5 2l3 3-3 3"/>
    </svg>
  </div>
);

const ACTIONS = [
  { emoji:"🗂️", title:"Create Portfolio",         desc:"Start from a curated template",              path:"/select-template" },
  { emoji:"📁", title:"My Portfolios",             desc:"View and manage your saved work",            path:"/my-portfolios" },
  { emoji:"📝", title:"Build Résumé",              desc:"Craft a résumé to pair with your portfolio", path:"/resume-builder" },
  { emoji:"🖼️", title:"Modern Templates",          desc:"Clean, contemporary starter layouts",        path:"/modern" },
  { emoji:"💼", title:"Professional Templates",    desc:"Formal, structured, client-ready designs",   path:"/professional" },
  { emoji:"⚡", title:"Quick Actions",             desc:"Shortcuts to your most-used tools",          path:"/actions" },
  { emoji:"📊", title:"Portfolio Analytics",       desc:"See who's viewing your portfolio",           path:"/analytics" },
  { emoji:"🔗", title:"Share Portfolio",           desc:"Copy your public link to share anywhere",    path:"/share" },
  { emoji:"⚙️", title:"Account Settings",          desc:"Profile, billing, and preferences",          path:"/settings" },
];

const COMING = [
  { emoji:"🤖", title:"AI Portfolio Assistant",    desc:"Let AI write your project descriptions and bio" },
  { emoji:"📄", title:"Resume Upload & Autofill",  desc:"Upload a PDF — we'll fill your portfolio automatically" },
  { emoji:"📈", title:"Portfolio Analytics",       desc:"Detailed traffic, click-through, and viewer stats" },
  { emoji:"🎨", title:"More Templates",            desc:"Expanding the library with new modern and professional styles" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <>
      <style>{css}</style>
      <div className="db-root">

        {/* Blobs */}
        <div className="db-blobs" aria-hidden="true">
          <div className="db-blob b1"/><div className="db-blob b2"/><div className="db-blob b3"/>
        </div>

        <div className="db-inner">

          {/* ── Hero ── */}
          <div className="db-hero">
            <div className="db-tag">
              <span className="db-tag-dot"/>
              <span className="db-tag-dash"/>
              Dashboard
            </div>
            <h1 className="db-h1">
              Welcome back, <span className="hollow">{firstName}.</span>
            </h1>
            <p className="db-sub">Your portfolio workspace — manage, build, and publish your work.</p>
          </div>

          <div className="db-rule"/>

          {/* ── Stats ── */}
          <div className="db-stats">
            {[
              { num:"3",    label:"Portfolios",    badge:"↑ +1 this month",    cls:"up" },
              { num:"1.2K", label:"Profile Views", badge:"↑ +18% vs last month",cls:"up" },
              { num:"24",   label:"Template Uses",  badge:"All time",           cls:"dim" },
              { num:"Pro",  label:"Current Plan",   badge:"Renews Aug 12",      cls:"dim" },
            ].map((s,i)=>(
              <div key={i} className="db-stat" style={{animationDelay:`${i*0.07}s`}}>
                <div className="db-stat-num">{s.num}</div>
                <div className="db-stat-label">{s.label}</div>
                <div className={`db-stat-badge ${s.cls}`}>{s.badge}</div>
              </div>
            ))}
          </div>

          {/* ── Promo ── */}
          <div className="db-promo" style={{animation:"fadeUp 0.45s 0.1s ease both"}}>
            <div className="db-promo-card db-promo-free">
              <div>
                <span className="db-promo-badge badge-free">Free</span>
                <div className="db-promo-title" style={{color:"var(--ink)"}}>Modern Templates</div>
                <div className="db-promo-desc" style={{color:"var(--ink-55)"}}>Curated designs, yours at no cost</div>
              </div>
              <button className="btn btn-dark btn-sm" onClick={()=>navigate("/modern")}>Browse</button>
            </div>
            <div className="db-promo-card db-promo-pro">
              <div>
                <span className="db-promo-badge badge-pro">Pro Access</span>
                <div className="db-promo-title" style={{color:"#fff"}}>✦ Premium Edition</div>
                <div className="db-promo-desc" style={{color:"rgba(255,255,255,0.45)"}}>Unlock the full template collection</div>
              </div>
              <button
                className="btn btn-sm"
                style={{background:"rgba(255,255,255,0.13)",color:"#fff",border:"1px solid rgba(255,255,255,0.18)",borderRadius:8,height:34,padding:"0 14px",fontFamily:"Syne",fontSize:11,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",cursor:"pointer",flexShrink:0}}
                onClick={()=>navigate("/subscription")}
              >Upgrade</button>
            </div>
          </div>

          {/* ── Get started card ── */}
          <div className="db-start-card">
            <div className="db-start-inner">
              <div className="db-start-body">
                <div style={{fontFamily:"Syne",fontSize:11,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--ink-55)",marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
                  <span style={{width:16,height:1,background:"var(--border-md)",display:"inline-block"}}/>
                  First Steps
                </div>
                <div className="db-start-title">Build your first portfolio</div>
                <p className="db-start-desc">Choose a template, fill in your details, and go live in minutes. No design experience needed.</p>
                <div className="db-steps">
                  {[{n:"01",t:"Select",d:"Pick a template"},{n:"02",t:"Compose",d:"Fill in your details"},{n:"03",t:"Publish",d:"Share with the world"}].map(s=>(
                    <div key={s.n} className="db-step">
                      <div className="db-step-num">{s.n}</div>
                      <div><strong>{s.t}</strong><span>{s.d}</span></div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-dark" onClick={()=>navigate("/select-template")}>
                  Start New Portfolio <BtnArrow/>
                </button>
              </div>
            </div>
          </div>

          {/* ── Quick actions ── */}
          <div className="db-sec-hd" style={{animation:"fadeUp 0.45s 0.14s ease both"}}>
            <div className="db-sec-title">Quick Actions</div>
            <button className="db-sec-link" onClick={()=>navigate("/actions")}>View all →</button>
          </div>

          <div className="db-actions">
            {ACTIONS.map((a,i)=>(
              <div
                key={i}
                className="db-action-card"
                style={{animationDelay:`${0.06*i}s`}}
                onClick={()=>navigate(a.path)}
              >
                <div className="db-action-icon">{a.emoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="db-action-title">{a.title}</div>
                  <div className="db-action-desc">{a.desc}</div>
                </div>
                <div className="db-action-arrow"><ArrowRight/></div>
              </div>
            ))}
          </div>

          {/* ── Coming soon ── */}
          <div className="db-divider">
            <div className="db-divider-line"/>
            <div className="db-divider-txt">Coming Soon 🚀</div>
            <div className="db-divider-line"/>
          </div>

          <div className="db-coming">
            {COMING.map((c,i)=>(
              <div key={i} className="db-coming-card" style={{animationDelay:`${0.07*i}s`}}>
                <div className="db-coming-icon">{c.emoji}</div>
                <div className="db-coming-tag">Soon</div>
                <div className="db-coming-title">{c.title}</div>
                <div className="db-coming-desc">{c.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}