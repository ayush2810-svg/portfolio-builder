import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const vintageCSS = `
  @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&family=IM+Fell+English:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

  @keyframes filmFlicker {
    0%,100%{opacity:1} 91%{opacity:1} 92%{opacity:0.86} 93%{opacity:1} 97%{opacity:0.94} 98%{opacity:1}
  }
  @keyframes scanMove {
    0%{background-position:0 0} 100%{background-position:0 4px}
  }
  @keyframes pageLoad {
    0%  { filter:brightness(2.2) contrast(0.25) sepia(1) blur(3px); opacity:0; }
    50% { filter:brightness(1.2) contrast(0.75) sepia(0.4) blur(0.5px); opacity:1; }
    100%{ filter:brightness(1) contrast(1) sepia(0.07) blur(0); }
  }
  @keyframes stampIn {
    0%  { transform:scale(1.4) rotate(-2deg); opacity:0; filter:blur(2px); }
    65% { transform:scale(0.97) rotate(0.3deg); opacity:1; filter:blur(0); }
    82% { transform:scale(1.01); }
    100%{ transform:scale(1) rotate(0); }
  }
  @keyframes inkReveal {
    0%  { clip-path:inset(0 100% 0 0); opacity:0; }
    100%{ clip-path:inset(0 0% 0 0); opacity:1; }
  }
  @keyframes inkDrop {
    0%  { transform:scaleX(0); transform-origin:left; }
    100%{ transform:scaleX(1); transform-origin:left; }
  }
  @keyframes fadeRise {
    0%  { opacity:0; transform:translateY(14px) rotate(0.3deg); }
    100%{ opacity:1; transform:translateY(0) rotate(0); }
  }
  @keyframes cardHoverLift {
    0%  { transform:translate(0,0); box-shadow:2px 2px 0 #9a7a4a; }
    100%{ transform:translate(-2px,-2px); box-shadow:4px 4px 0 #6a5020; }
  }
  @keyframes dustDrift {
    0%  { transform:translate(0,0) rotate(0deg); opacity:0; }
    12% { opacity:0.6; }
    88% { opacity:0.25; }
    100%{ transform:translate(var(--dx),var(--dy)) rotate(var(--dr)); opacity:0; }
  }
  @keyframes emptyPulse {
    0%,100%{ opacity:0.5; } 50%{ opacity:0.85; }
  }
  @keyframes borderDraw {
    0%  { stroke-dashoffset:800; }
    100%{ stroke-dashoffset:0; }
  }
  @keyframes waxSeal {
    0%  { transform:scale(0) rotate(-25deg); opacity:0; }
    70% { transform:scale(1.08) rotate(2deg); opacity:1; }
    85% { transform:scale(0.96) rotate(-1deg); }
    100%{ transform:scale(1) rotate(0); opacity:0.5; }
  }
  @keyframes viewArrow {
    0%  { transform:translateX(0); }
    50% { transform:translateX(4px); }
    100%{ transform:translateX(0); }
  }

  /* ── Root ── */
  .vmp-root {
    min-height: 100vh;
    background: linear-gradient(180deg, #ede6d2 0%, #e5dbbf 40%, #ddd2b0 100%);
    font-family: 'Cormorant Garamond', serif;
    animation: filmFlicker 11s infinite, pageLoad 1.8s ease-out forwards;
    position: relative;
  }

  .vmp-root::before {
    content: '';
    position: fixed; inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px, transparent 31px,
      rgba(150,120,60,0.09) 31px, rgba(150,120,60,0.09) 32px
    );
    pointer-events: none; z-index: 0;
  }

  .vmp-scanlines {
    position: fixed; inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px, transparent 2px,
      rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px
    );
    animation: scanMove 0.12s steps(1) infinite;
    pointer-events: none; z-index: 999;
  }

  .vmp-vignette {
    position: fixed; inset: 0;
    background: radial-gradient(ellipse 88% 88% at 50% 50%, transparent 46%, rgba(0,0,0,0.3) 100%);
    pointer-events: none; z-index: 998;
  }

  /* Dust */
  .vmp-dust {
    position: fixed;
    width: 2px; height: 2px;
    background: #b0a070; border-radius: 50%;
    pointer-events: none; z-index: 1;
    animation: dustDrift var(--dur,4s) ease-in-out var(--del,0s) infinite;
  }

  /* ── Content ── */
  .vmp-content {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 28px 70px;
    position: relative; z-index: 2;
  }

  /* ── Page header ── */
  .vmp-header {
    margin-bottom: 32px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(90,70,30,0.2);
  }

  .vmp-header-rule {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 12px;
    animation: inkDrop 0.7s ease-out 0.4s both;
  }

  .vmp-header-rule .hl { width: 28px; height: 1px; background: #9a7a3a; }
  .vmp-header-rule .hr { flex: 1; height: 1px; background: linear-gradient(90deg, #9a7a3a, transparent); }
  .vmp-header-rule .hd { width: 5px; height: 5px; background: #c8a84a; transform: rotate(45deg); flex-shrink: 0; }

  .vmp-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px; font-weight: 700;
    color: #1a1208; letter-spacing: 0.02em;
    animation: stampIn 0.9s cubic-bezier(0.23,1,0.32,1) 0.35s both;
  }

  .vmp-title em {
    font-style: italic; font-family: 'IM Fell English', serif;
    color: #6a5018;
  }

  .vmp-subtitle {
    margin-top: 5px;
    font-size: 13px; font-style: italic; color: #8a7a5a;
    letter-spacing: 0.05em;
    animation: inkReveal 0.6s ease-out 0.65s both;
  }

  /* ── Empty state ── */
  .vmp-empty {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 14px;
    padding: 70px 20px;
    text-align: center;
    animation: fadeRise 0.6s ease-out 0.5s both;
  }

  .vmp-empty-glyph {
    font-size: 40px; color: rgba(90,70,30,0.2);
    animation: emptyPulse 3s ease-in-out infinite;
    font-family: 'IM Fell English SC', serif;
    letter-spacing: 0.3em;
  }

  .vmp-empty-text {
    font-size: 16px; font-style: italic; color: #8a7a5a;
    letter-spacing: 0.04em; line-height: 1.6;
  }

  /* ── Ornament rule between header and grid ── */
  .vmp-ornament-rule {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px;
    animation: inkDrop 0.6s ease-out 0.7s both;
  }

  .vmp-ornament-rule .line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(90,70,30,0.28), transparent);
  }

  .vmp-ornament-rule .glyph {
    font-size: 10px; color: #c8a84a; letter-spacing: 0.3em;
  }

  /* ── Card grid ── */
  .vmp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 20px;
  }

  /* ── Portfolio card ── */
  .vmp-card {
    position: relative;
    background: linear-gradient(180deg, #f5f0e4 0%, #ede5cf 100%);
    border: 1px solid #c0a870;
    border-bottom: 3px solid #9a7a4a;
    border-radius: 2px;
    padding: 24px 20px 20px;
    overflow: hidden;
    cursor: default;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    animation: fadeRise 0.5s ease-out both;
    box-shadow: 2px 2px 0 #c0a870;
  }

  /* Ledger lines inside card */
  .vmp-card::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px, transparent 27px,
      rgba(160,130,70,0.1) 27px, rgba(160,130,70,0.1) 28px
    );
    pointer-events: none;
  }

  /* Red margin line */
  .vmp-card::after {
    content: '';
    position: absolute; top: 0; bottom: 0; left: 28px;
    width: 1px;
    background: rgba(200,100,80,0.16);
    pointer-events: none;
  }

  .vmp-card:hover {
    transform: translate(-2px,-2px);
    box-shadow: 4px 4px 0 #6a5020;
  }

  /* SVG dashed border */
  .vmp-card-svg {
    position: absolute; top: 8px; left: 8px;
    width: calc(100% - 16px); height: calc(100% - 16px);
    pointer-events: none;
  }

  .vmp-card-svg rect {
    fill: none;
    stroke: rgba(90,70,30,0.15);
    stroke-width: 1;
    stroke-dasharray: 7 4;
    animation: borderDraw 1.8s ease-out both;
  }

  /* Card number stamp */
  .vmp-card-num {
    position: absolute; top: 12px; right: 14px;
    font-family: 'IM Fell English SC', serif;
    font-size: 10px; color: rgba(90,70,30,0.35);
    letter-spacing: 0.1em;
  }

  /* Wax seal */
  .vmp-card-seal {
    position: absolute; bottom: 14px; right: 14px;
    width: 30px; height: 30px; border-radius: 50%;
    border: 1.5px dashed rgba(60,40,10,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; color: rgba(90,70,30,0.35);
    animation: waxSeal 0.6s cubic-bezier(0.23,1,0.32,1) both;
  }

  .vmp-card-inner { position: relative; z-index: 2; }

  /* Card content label */
  .vmp-card-label {
    font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase;
    color: #9a8a6a; font-family: 'Cormorant Garamond', serif; font-weight: 600;
    margin-bottom: 6px; display: block;
  }

  .vmp-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px; font-weight: 700;
    color: #1a1208; letter-spacing: 0.02em;
    margin-bottom: 6px; line-height: 1.25;
  }

  .vmp-card-desc {
    font-size: 13px; font-style: italic; color: #7a6a50;
    letter-spacing: 0.02em; line-height: 1.55;
    margin-bottom: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Template badge */
  .vmp-badge {
    display: inline-block;
    font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase;
    padding: 3px 9px;
    border: 1px solid rgba(90,70,30,0.3);
    color: #6a5a3a;
    font-family: 'Cormorant Garamond', serif; font-weight: 600;
    border-radius: 1px; margin-bottom: 16px;
    background: rgba(90,70,30,0.05);
  }

  .vmp-badge.gold {
    border-color: rgba(200,168,74,0.4);
    color: #8a6a20;
    background: rgba(200,168,74,0.08);
  }

  /* Card divider */
  .vmp-card-rule {
    height: 1px; margin: 12px 0;
    background: linear-gradient(90deg, rgba(90,70,30,0.2), transparent);
  }

  /* View button */
  .vmp-view-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: none; border: none; cursor: pointer;
    font-family: 'IM Fell English SC', serif;
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: #3a2e1a;
    padding: 0; transition: color 0.15s ease;
  }

  .vmp-view-btn:hover { color: #c8a84a; }

  .vmp-view-btn:hover .vmp-arrow {
    animation: viewArrow 0.5s ease-in-out infinite;
  }

  .vmp-arrow {
    display: inline-block; font-size: 12px;
  }

  /* Count tag in header */
  .vmp-count-tag {
    display: inline-block;
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 2px 10px;
    border: 1px solid rgba(90,70,30,0.25);
    color: #7a6a50;
    font-family: 'Cormorant Garamond', serif; font-weight: 600;
    border-radius: 1px; margin-left: 12px;
    vertical-align: middle;
    animation: fadeRise 0.5s ease-out 0.8s both;
  }
`;

const dusts = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top:  `${Math.random() * 100}%`,
  "--dx":  `${(Math.random() - 0.5) * 100}px`,
  "--dy":  `${(Math.random() - 0.5) * 60}px`,
  "--dr":  `${(Math.random() - 0.5) * 200}deg`,
  "--dur": `${3 + Math.random() * 5}s`,
  "--del": `${Math.random() * 5}s`,
}));

function MyPortfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const navigate = useNavigate();

  const fetchPortfolios = async () => {
    const res = await API.get("/portfolio/my-portfolio");
    setPortfolios(res.data);
  };

  useEffect(() => { fetchPortfolios(); }, []);

  return (
    <>
      <style>{vintageCSS}</style>
      <div className="vmp-scanlines" />
      <div className="vmp-vignette" />
      {dusts.map((d) => (
        <span key={d.id} className="vmp-dust" style={{
          left: d.left, top: d.top,
          "--dx": d["--dx"], "--dy": d["--dy"], "--dr": d["--dr"],
          "--dur": d["--dur"], "--del": d["--del"],
        }} />
      ))}

      <div className="vmp-root">
       

        <div className="vmp-content">

          {/* ── Header ── */}
          <div className="vmp-header">
            <div className="vmp-header-rule">
              <div className="hl" />
              <div className="hd" />
              <div className="hr" />
            </div>
            <h1 className="vmp-title">
              My <em>Folios</em>
              {portfolios.length > 0 && (
                <span className="vmp-count-tag">
                  {portfolios.length} {portfolios.length === 1 ? "Record" : "Records"}
                </span>
              )}
            </h1>
            <p className="vmp-subtitle">
              Your personal archive — each folio a chapter of your craft.
            </p>
          </div>

          {/* ── Empty state ── */}
          {portfolios.length === 0 ? (
            <div className="vmp-empty">
              <div className="vmp-empty-glyph">✦ · ✦</div>
              <p className="vmp-empty-text">
                The archive is empty.<br />
                No folios have been inscribed yet.
              </p>
            </div>
          ) : (
            <>
              <div className="vmp-ornament-rule">
                <div className="line" />
                <div className="glyph">✦ · ✦</div>
                <div className="line" />
              </div>

              {/* ── Grid ── */}
              <div className="vmp-grid">
                {portfolios.map((p, idx) => (
                  <div
                    key={p._id}
                    className="vmp-card"
                    style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
                  >
                    {/* SVG border */}
                    <svg className="vmp-card-svg">
                      <rect
                        x="1" y="1"
                        width="calc(100% - 2px)"
                        height="calc(100% - 2px)"
                        rx="1"
                        style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
                      />
                    </svg>

                    {/* Entry number */}
                    <div className="vmp-card-num">No. {String(idx + 1).padStart(2, "0")}</div>

                    {/* Wax seal */}
                    <div
                      className="vmp-card-seal"
                      style={{ animationDelay: `${0.7 + idx * 0.1}s` }}
                    >✦</div>

                    <div className="vmp-card-inner">
                      <span className="vmp-card-label">Portfolio Entry</span>

                      <div className="vmp-card-title">{p.title}</div>

                      <p className="vmp-card-desc">{p.description}</p>

                      <span className={`vmp-badge ${p.template === "professional" ? "gold" : ""}`}>
                        {p.template === "professional" ? "◈ " : ""}
                        {p.template} Edition
                      </span>

                      <div className="vmp-card-rule" />

                      <button
                        className="vmp-view-btn"
                        onClick={() => navigate(`/portfolio/${p.user.username}/${p._id}`)}
                      >
                        Open Folio
                        <span className="vmp-arrow">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default MyPortfolios;