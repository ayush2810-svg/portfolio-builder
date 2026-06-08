import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    --off:       #ffffff;
    --red:       #d63a2f;
    --border:    rgba(13,13,13,0.09);
    --border-md: rgba(13,13,13,0.13);
    --sidebar-w: 220px;
  }

  /* ── Sidebar ── */
  .sidebar {
    width: var(--sidebar-w);
    flex-shrink: 0;
    height: 100dvh;
    background: rgb(255, 255, 255);
    border-right: 1px solid var(--border-md);
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
    padding: 0;
  }

  .sidebar-logo {
    display: flex; align-items: center; gap: 10px;
    padding: 22px 20px 18px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .sidebar-logo-mark {
    width: 28px; height: 28px;
    background: var(--ink); border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .sidebar-logo-name {
    font-family: 'Syne', sans-serif;
    font-size: 14px; font-weight: 700;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--ink);
  }

  .sidebar-section {
    padding: 16px 12px 8px;
    flex: 1;
    overflow-y: auto;
  }

  .sidebar-group-label {
    font-size: 9.5px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ink-55); padding: 0 8px;
    margin-bottom: 6px; margin-top: 12px;
  }
  .sidebar-group-label:first-child { margin-top: 0; }

  .sidebar-link {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 10px;
    border-radius: 9px;
    font-size: 13px; font-weight: 400;
    color: var(--ink-55);
    cursor: pointer;
    transition: background 0.13s, color 0.13s;
    text-decoration: none;
    margin-bottom: 2px;
    border: none; background: transparent;
    width: 100%; text-align: left;
  }
  .sidebar-link:hover { background: var(--ink-06); color: var(--ink); }
  .sidebar-link.active {
    background: var(--ink);
    color: #fff;
    font-weight: 500;
  }
  .sidebar-link svg { flex-shrink: 0; opacity: 0.7; }
  .sidebar-link.active svg { opacity: 1; }

  .sidebar-bottom {
    padding: 14px 12px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }
  .sidebar-user {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: 9px;
    cursor: pointer;
    transition: background 0.13s;
  }
  .sidebar-user:hover { background: var(--ink-06); }
  .sidebar-avatar {
    width: 30px; height: 30px; border-radius: 8px;
    background: var(--ink);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 12px; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }
  .sidebar-user-info { min-width: 0; }
  .sidebar-user-name {
    font-size: 12.5px; font-weight: 500; color: var(--ink);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .sidebar-user-role {
    font-size: 10.5px; color: var(--ink-55);
    white-space: nowrap;
  }
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

/* ─────────────────────────────────────────────
   SIDEBAR NAV CONFIG
───────────────────────────────────────────── */
const NAV = [
  { group: "Main",    links: [
    { path: "/dashboard",           label: "Home",      icon: "home" },
    { path: "/select-template", label: "Templates", icon: "templates" },
    { path: "/dashboard/resume",    label: "Résumé",    icon: "resume" },
    { path: "/my-portfolios", label: "Portfolio", icon: "portfolio" },
  ]},
  { group: "Account", links: [
    { path: "/settings",  label: "Settings",  icon: "settings" },
    { path: "/subscription",  label: "Upgrade",   icon: "checkout" },
  ]},
];
 function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
 const userData = localStorage.getItem("portfolioUser");

let user = null;

try {
  user = userData ? JSON.parse(userData) : null;
} catch (error) {
  console.log("Invalid user data in localStorage");
  user = null;
}
  return (
    <>
      <style>{css}</style>

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-mark">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" fill="white"/>
                <rect x="8" y="1" width="5" height="5" fill="white" opacity="0.42"/>
                <rect x="1" y="8" width="5" height="5" fill="white" opacity="0.42"/>
                <rect x="8" y="8" width="5" height="5" fill="white"/>
              </svg>
            </div>
            <span className="sidebar-logo-name">DevFolio</span>
          </div>

          <div className="sidebar-section">
            {NAV.map(group => (
              <div key={group.group}>
                <div className="sidebar-group-label">{group.group}</div>
                {group.links.map(link => (
                  <button
                    key={link.path}
                    className={`sidebar-link${currentPath === link.path ? " active" : ""}`}
                    onClick={() => navigate(link.path)}
                  >
                    <Icon d={icons[link.icon]} size={15} />
                    {link.label}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="sidebar-bottom">
            <div className="sidebar-user">
              <div className="sidebar-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{user?.name}</div>
                <div className="sidebar-user-role">{user?.plan || "Free Member"}</div>
              </div>
            </div>
          </div>
        </aside>
    </>
  );
}
export default Sidebar;