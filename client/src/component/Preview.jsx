import templates from "../Templatedata/templates";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.2} }
  @keyframes spin    { to{transform:rotate(360deg)} }
  @keyframes tagPop  { 0%{transform:scale(0) rotate(-6deg);opacity:0} 70%{transform:scale(1.07) rotate(1deg);opacity:1} 100%{transform:scale(1) rotate(0)} }
  @keyframes drift   { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(20px,-14px) scale(1.04)} 70%{transform:translate(-14px,10px) scale(0.97)} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes slideIn { from{transform:translateX(-100%);opacity:0} to{transform:translateX(0);opacity:1} }

  html, body, #root { height:100%; overflow:hidden; }

  :root {
    --ink:       #0d0d0d;
    --ink-55:    rgba(13,13,13,0.55);
    --ink-20:    rgba(13,13,13,0.18);
    --ink-10:    rgba(13,13,13,0.07);
    --ink-06:    rgba(13,13,13,0.04);
    --white:     #ffffff;
    --off:       #f5f5f2;
    --red:       #d63a2f;
    --border:    rgba(13,13,13,0.09);
    --border-md: rgba(13,13,13,0.13);
    --panel-w:   380px;
  }

  /* Blobs — behind everything */
  .vb-blobs { position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden; }
  .vb-blob  { position:absolute;border-radius:50%;filter:blur(80px);opacity:0.45;animation:drift var(--d,12s) ease-in-out infinite;animation-delay:var(--dl,0s); }
  .bb1 { width:500px;height:500px;top:-140px;left:-60px; background:radial-gradient(circle,#d6e8ff 0%,transparent 68%);--d:15s; }
  .bb2 { width:360px;height:360px;bottom:-90px;right:10%; background:radial-gradient(circle,#ffe5d6 0%,transparent 68%);--d:12s;--dl:-5s; }
  .bb3 { width:300px;height:300px;top:30%;right:5%;      background:radial-gradient(circle,#dff4e8 0%,transparent 68%);--d:17s;--dl:-8s; }

  /* ══════════════════════════════
     RIGHT PANEL — PREVIEW
  ══════════════════════════════ */
  .vb-preview {
    flex: 1; min-width: 0;
    height: 100dvh;
    display: flex; flex-direction: column;
    position: relative; z-index: 2;
    overflow: hidden;
  }

  /* Preview topbar */
  .vb-prev-top {
    flex-shrink: 0; height: 54px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 22px;
    border-bottom: 1px solid var(--border);
    background: rgba(245,245,242,0.85);
    backdrop-filter: blur(12px);
  }
  .vb-prev-top-left { display: flex; align-items: center; gap: 10px; }
  .vb-prev-label {
    font-family: 'Syne', sans-serif; font-size: 12.5px; font-weight: 700;
    color: var(--ink); letter-spacing: 0.03em;
  }
  .vb-prev-badge {
    font-size: 9.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 2px 8px; border-radius: 5px;
    background: var(--ink-10); color: var(--ink-55);
  }
  .vb-prev-badge.live { background: rgba(42,122,74,0.12); color: #2a7a4a; }

  /* Template picker tabs */
  .vb-tmpl-tabs {
    display: flex; gap: 5px;
    background: rgba(255,255,255,0.7);
    border: 1px solid var(--border-md); border-radius: 10px; padding: 3px;
  }
  .vb-tmpl-tab {
    height: 28px; padding: 0 12px; border-radius: 7px;
    border: none; background: transparent;
    font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.04em; color: var(--ink-55); cursor: pointer;
    transition: background 0.12s, color 0.12s;
    white-space: nowrap;
  }
  .vb-tmpl-tab.active { background: var(--ink); color: #fff; }

  /* Preview frame */
  .vb-prev-frame {
    flex: 1; overflow-y: auto;
    background: rgba(245,245,242,0.5);
    width: 100%;
    padding: 0;
  }
  .vb-prev-frame::-webkit-scrollbar { width: 5px; }
  .vb-prev-frame::-webkit-scrollbar-thumb { background: var(--border-md); border-radius: 3px; }

  .vb-prev-inner {
    width: 100%; max-width:none;
    background: #fff;
    border-radius: 12px;
    border: 1px solid var(--border-md);
    box-shadow: 0 8px 40px rgba(13,13,13,0.1);
    overflow: hidden;
    min-height: 100%;
  }

  /* Empty preview state */
  .vb-prev-empty {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    height: 100%; min-height: 400px;
    color: var(--ink-55); text-align: center;
    gap: 14px;
  }
  .vb-prev-empty-icon { font-size: 40px; opacity: 0.3; }
  .vb-prev-empty-title { font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--ink-55); }
  .vb-prev-empty-desc  { font-size:13px;font-weight:300;max-width:260px;line-height:1.6; }

  /* Divider */
  .vb-rule { height:1px;background:var(--border);margin:14px 0; }

  .vb-template-badge {
  display: flex;gap: 12px;
  align-items: flex-end;
  }

  .vb-template-category {
    font-size: 10px;
    font-weight: 600;
    padding: 9px 10px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(13,13,13,0.45);
  }

  .vb-template-name {
    background: #0d0d0d;
    color: white;
    padding: 8px 14px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    margin-top: 3px;
  }
  /* Mobile */
  @media (max-width: 768px) {
    html,body,#root { overflow:auto; }
    .vb-root { flex-direction:column;height:auto;min-height:100dvh; }
    .vb-editor { width:100%!important;height:auto;border-right:none;border-bottom:1px solid var(--border-md); }
    .vb-editor.collapsed { width:100%!important;height:auto; }
    .vb-preview { height:auto;min-height:60vh; }
    .vb-prev-frame { padding:14px; }
    .vb-grid-2 { grid-template-columns:1fr; }
    .bb3 { display:none; }
  }
`;

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

templates

function Preview({
  template,
  setTemplate,
  livePreview,
  setLivePreview,
  title,
  description,
  location,
  skills,
  projects,
  contact,
  education,
  experience,
  achievements,
}) {
const currentTemplate = templates.find(t=>t.id === template);
const TemplateComponent = currentTemplate?.component;

const previewData = {
  name: title,
  description,
  location,
  skills,
  projects,
  contact,
  education,
  experience,
  achievements,
};
const hasData =
  title ||
  description ||
  projects?.length ||
  skills?.technical?.length;

  return (
    <>
      <style>{css}</style>
        {/* ══════════════════════════════
            RIGHT — PREVIEW
        ══════════════════════════════ */}
        <div className="vb-preview">

          {/* Preview topbar */}
          <div className="vb-prev-top">
            <div className="vb-prev-top-left">
              {/* Toggle editor */}
              <button
                className="vb-btn vb-btn-ghost"
                style={{height:32,padding:"0 10px",gap:6,fontSize:11}}
                onClick={()=>setLivePreview(p=>!p)}
              >
                {livePreview ? <><ChevronLeft/>Hide Editor</> : <><ChevronRight/>Show Editor</>}
              </button>
              <div className="vb-prev-label">Preview</div>
              <span className={`vb-prev-badge${hasData?" live":""}`}>{hasData?"Live":"Waiting for input"}</span>
            </div>

            {/* Template tabs */}
            <div className="vb-template-badge">
              <div className="vb-template-category">
                {currentTemplate?.category}
              </div>

              <div className="vb-template-name">
                {currentTemplate?.name}
              </div>
            </div>
          </div>

          {/* Preview frame */}
          <div className="vb-prev-frame">
            {hasData ? (
              <div className="vb-prev-inner">
                {TemplateComponent && (
                  <TemplateComponent {...previewData}/>
                )}
              </div>
            ) : (
              <div className="vb-prev-empty">
                <div className="vb-prev-empty-icon">✦</div>
                <div className="vb-prev-empty-title">Your preview appears here</div>
                <div className="vb-prev-empty-desc">Start filling in your name and bio on the left — your portfolio will render live.</div>
              </div>
            )}
          </div>

        </div>
    </>
  );
}

export default Preview;