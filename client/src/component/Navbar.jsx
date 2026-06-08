import React from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   CSS
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes drift    { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(28px,-18px) scale(1.05)} 70%{transform:translate(-18px,14px) scale(0.97)} }
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.22} }
  @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes spin     { to{transform:rotate(360deg)} }
  @keyframes lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }

  html, body, #root { height:100% }

  :root {
    --ink:       #0d0d0d;
    --ink-55:    rgba(13,13,13,0.55);
    --ink-10:    rgba(13,13,13,0.07);
    --ink-06:    rgba(13,13,13,0.05);
    --white:     #ffffff;
    --off:       #f5f5f2;
    --red:       #d63a2f;
    --border:    rgba(13,13,13,0.09);
    --border-md: rgba(13,13,13,0.13);
    --sidebar-w: 220px;
  }

  /* Top bar */
  .topbar {
    flex-shrink: 0;
    height: 56px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px;
    border-bottom: 1px solid var(--border);
    background: rgb(245, 245, 242);
  }
  .topbar-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px; font-weight: 700;
    color: var(--ink); letter-spacing: 0.02em;
  }
  .topbar-actions { display: flex; align-items: center; gap: 8px; }
  .topbar-btn {
    height: 32px; padding: 0 14px;
    border-radius: 8px; border: 1px solid var(--border-md);
    background: var(--white);
    font-family: 'Outfit', sans-serif;
    font-size: 12px; font-weight: 500; color: var(--ink);
    cursor: pointer; transition: background 0.13s, box-shadow 0.13s;
    display: flex; align-items: center; gap: 6px;
  }
  .topbar-btn:hover { background: #fff; box-shadow: 0 2px 8px rgba(13,13,13,0.08); }
  .topbar-btn.primary {
    background: var(--ink); color: #fff; border-color: transparent;
  }
  .topbar-btn.primary:hover { background: #222; box-shadow: 0 4px 12px rgba(13,13,13,0.2); }

`;

/* ─────────────────────────────────────────────
   ICONS (inline SVG helpers)
───────────────────────────────────────────── */
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  home:      "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  templates: "M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z M14 4h6v7h-6z M4 15h6v5H4z M14 15h6v5h-6z",
  resume:    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  settings:  "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  checkout:  "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  plus:      "M12 5v14 M5 12h14",
  arrow:     "M5 12h14 M12 5l7 7-7 7",
  logout:    "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  portfolio: "M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z M8 15h8 M8 11h8 M8 7h8",
};

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <style>{css}</style>
      
          {/* Top bar */}
          <div className="topbar">
            <div className="topbar-title">devFolio</div>
            <div className="topbar-actions">
              <button className="topbar-btn" onClick={() => navigate("/select-template")}>
                <Icon d={icons.plus} size={13} /> New Portfolio
              </button>
              <button className="topbar-btn primary" onClick={() => navigate("/subscription")}>
                ✦ Go Pro
              </button>
            </div>
          </div>
    </>
  );
}
export default Navbar;