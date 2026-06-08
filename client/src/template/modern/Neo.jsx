import { useEffect, useRef } from "react";

function Neo(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const fs = 14;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    let drops = Array(Math.floor(window.innerWidth / fs)).fill(1);
    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fs}px 'Share Tech Mono', monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(String.fromCharCode(0x30a0 + Math.random() * 96), i * fs, y * fs);
        if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const contactMap = [
    ["EMAIL", props.contact?.email],
    ["PHONE", props.contact?.phone],
    ["GITHUB", props.contact?.github],
    ["LINKEDIN", props.contact?.linkedin],
  ].filter(([, v]) => v);

  const achList = Array.isArray(props.achievements)
    ? props.achievements
    : props.achievements
    ? [props.achievements]
    : [];

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&family=Rajdhani:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .neo-root { font-family: 'Rajdhani', sans-serif; background: #000; color: #00ff41;width: 100%; min-height: 100vh; position: relative; overflow: hidden; }
        .neo-rain { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.07; pointer-events: none; z-index: 0; }
        .neo-scanline { pointer-events: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.015) 3px, rgba(0,255,65,0.015) 4px); z-index: 2; }
        .neo-nav { position: sticky; top: 0; left: 0; right: 0; z-index: 10; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(0,255,65,0.15); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; height: 52px; }
        .neo-brand { font-family: 'Share Tech Mono', monospace; font-size: 13px; color: #00ff41; letter-spacing: 3px; }
        .neo-nav-links { display: flex; gap: 28px; }
        .neo-nav-links a { font-family: 'Share Tech Mono', monospace; font-size: 10px; color: #00ff41; opacity: 0.45; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; cursor: pointer; transition: opacity 0.2s; }
        .neo-nav-links a:hover { opacity: 1; }
        .neo-inner { position: relative; z-index: 1; padding: 100px 48px 60px; max-width: 900px; margin: 0 auto; }
        section { min-height: 60px; margin-bottom: 80px; }
        .neo-hero-tag { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #00ff41; opacity: 0.5; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; }
        .neo-name { font-family: 'Bebas Neue', sans-serif; font-size: clamp(60px, 11vw, 110px); line-height: 0.9; color: #fff; letter-spacing: 2px; margin: 0 0 4px; text-shadow: 0 0 40px rgba(0,255,65,0.25); position: relative; }
        .neo-name::after { content: attr(data-text); position: absolute; left: 2px; top: 0; color: #00ff41; clip: rect(0,900px,0,0); animation: glitch 5s infinite linear; opacity: 0.25; }
        @keyframes glitch { 0%{clip:rect(42px,900px,44px,0)} 5%{clip:rect(12px,900px,59px,0)} 10%{clip:rect(48px,900px,29px,0)} 15%{clip:rect(82px,900px,20px,0)} 20%{clip:rect(0,0,0,0)} 100%{clip:rect(0,0,0,0)} }
        .neo-desc { font-size: 18px; color: #00ff41; opacity: 0.8; margin: 16px 0 8px; font-weight: 600; letter-spacing: 1px; }
        .neo-loc { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: #00ff41; opacity: 0.45; letter-spacing: 2px; }
        .cursor-blink { display: inline-block; width: 3px; height: 1em; background: #00ff41; margin-left: 4px; animation: blink 1s step-end infinite; vertical-align: text-bottom; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .neo-profile-img { width: 130px; height: 130px; object-fit: cover; border: 1px solid #00ff41; filter: grayscale(100%) brightness(1.2); margin-top: 24px; display: block; }
        .neo-divider { border: none; border-top: 1px solid rgba(0,255,65,0.15); margin: 0 0 40px; }
        .section-label { font-family: 'Share Tech Mono', monospace; font-size: 10px; letter-spacing: 4px; color: #00ff41; opacity: 0.4; text-transform: uppercase; margin-bottom: 6px; }
        .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 38px; color: #fff; letter-spacing: 2px; margin: 0 0 28px; }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
        .contact-item { border: 1px solid rgba(0,255,65,0.2); padding: 12px 16px; background: rgba(0,255,65,0.03); }
        .c-key { font-family: 'Share Tech Mono', monospace; font-size: 10px; color: #00ff41; opacity: 0.4; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
        .c-val { font-size: 14px; color: #00ff41; word-break: break-all; }
        .skills-group { margin-bottom: 28px; }
        .skills-group-title { font-family: 'Share Tech Mono', monospace; font-size: 10px; letter-spacing: 3px; color: #00ff41; opacity: 0.4; text-transform: uppercase; margin-bottom: 12px; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag { font-family: 'Share Tech Mono', monospace; font-size: 12px; padding: 5px 12px; border: 1px solid rgba(0,255,65,0.35); color: #00ff41; background: rgba(0,255,65,0.04); letter-spacing: 1px; cursor: default; transition: background 0.2s, border-color 0.2s; }
        .skill-tag:hover { background: rgba(0,255,65,0.12); border-color: #00ff41; }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
        .project-card { border: 1px solid rgba(0,255,65,0.2); padding: 20px; background: rgba(0,255,65,0.02); transition: background 0.2s, border-color 0.2s; cursor: default; }
        .project-card:hover { background: rgba(0,255,65,0.06); border-color: rgba(0,255,65,0.5); }
        .project-idx { font-family: 'Share Tech Mono', monospace; font-size: 10px; color: #00ff41; opacity: 0.3; letter-spacing: 2px; margin-bottom: 8px; }
        .project-name { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: #fff; letter-spacing: 1px; margin-bottom: 8px; }
        .project-desc { font-size: 14px; color: #00ff41; opacity: 0.6; line-height: 1.6; }
        .edu-exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .edu-exp-block { border-left: 2px solid rgba(0,255,65,0.3); padding-left: 16px; }
        .edu-exp-block p { font-size: 15px; color: #00ff41; opacity: 0.75; line-height: 1.7; white-space: pre-line; }
        .achievements-list { list-style: none; padding: 0; }
        .achievements-list li { font-size: 15px; color: #00ff41; opacity: 0.75; padding: 10px 0; border-bottom: 1px solid rgba(0,255,65,0.1); display: flex; align-items: flex-start; gap: 10px; }
        .achievements-list li::before { content: '>'; font-family: 'Share Tech Mono', monospace; font-size: 12px; color: #00ff41; opacity: 0.4; margin-top: 2px; flex-shrink: 0; }
        @media (max-width: 600px) { .edu-exp-grid { grid-template-columns: 1fr; } .neo-nav-links { gap: 14px; } .neo-inner { padding: 80px 20px 40px; } }
      `}</style>

      <div className="neo-root">
        <canvas ref={canvasRef} className="neo-rain" />
        <div className="neo-scanline" />

        <nav className="neo-nav">
          <span className="neo-brand">
            {props.name ? props.name.split(" ")[0].toUpperCase() + ".EXE" : "NEO.EXE"}
          </span>
          <div className="neo-nav-links">
            {["hero", "contact", "skills", "projects", "background", "achievements"].map((s) => (
              <a key={s} onClick={() => scrollTo(s)}>
                {s.toUpperCase()}
              </a>
            ))}
          </div>
        </nav>

        <div className="neo-inner">

          {/* HERO */}
          <section id="hero">
            <p className="neo-hero-tag">&gt; PORTFOLIO_v2.0 — INITIALIZED</p>
            <h1 className="neo-name" data-text={props.name}>{props.name}</h1>
            <p className="neo-desc">
              {props.description}
              <span className="cursor-blink" />
            </p>
            {props.location && (
              <p className="neo-loc">&gt; 📍 {props.location.toUpperCase()}</p>
            )}
            {props.profileImage && (
              <img src={props.profileImage} alt="profile" className="neo-profile-img" />
            )}
          </section>

          <hr className="neo-divider" />

          {/* CONTACT */}
          <section id="contact">
            <p className="section-label">&gt; SECTION_01</p>
            <h2 className="section-title">CONTACT</h2>
            <div className="contact-grid">
              {contactMap.map(([key, val]) => (
                <div className="contact-item" key={key}>
                  <div className="c-key">{key}</div>
                  <div className="c-val">{val}</div>
                </div>
              ))}
            </div>
          </section>

          <hr className="neo-divider" />

          {/* SKILLS */}
          <section id="skills">
            <p className="section-label">&gt; SECTION_02</p>
            <h2 className="section-title">SKILLS</h2>
            {[
              ["// TECHNICAL", props.skills?.technical],
              ["// NON-TECHNICAL", props.skills?.nonTechnical],
              ["// TOOLS", props.skills?.tools],
            ].map(([label, items]) =>
              items?.length ? (
                <div className="skills-group" key={label}>
                  <div className="skills-group-title">{label}</div>
                  <div className="skill-tags">
                    {items.map((s, i) => (
                      <span className="skill-tag" key={i}>{s}</span>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </section>

          <hr className="neo-divider" />

          {/* PROJECTS */}
          <section id="projects">
            <p className="section-label">&gt; SECTION_03</p>
            <h2 className="section-title">PROJECTS</h2>
            <div className="projects-grid">
              {props.projects?.map((p, i) => (
                <div className="project-card" key={i}>
                  <div className="project-idx">[{String(i + 1).padStart(2, "0")}]</div>
                  <div className="project-name">{p.name}</div>
                  <div className="project-desc">{p.description}</div>
                </div>
              ))}
            </div>
          </section>

          <hr className="neo-divider" />

          {/* EDUCATION + EXPERIENCE */}
          <section id="background">
            <p className="section-label">&gt; SECTION_04</p>
            <h2 className="section-title">BACKGROUND</h2>
            <div className="edu-exp-grid">
              <div>
                <div className="skills-group-title">// EDUCATION</div>
                <div className="edu-exp-block"><p>{props.education}</p></div>
              </div>
              <div>
                <div className="skills-group-title">// EXPERIENCE</div>
                <div className="edu-exp-block"><p>{props.experience}</p></div>
              </div>
            </div>
          </section>

          <hr className="neo-divider" />

          {/* ACHIEVEMENTS */}
          <section id="achievements">
            <p className="section-label">&gt; SECTION_05</p>
            <h2 className="section-title">ACHIEVEMENTS</h2>
            <ul className="achievements-list">
              {achList.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </section>

        </div>
      </div>
    </>
  );
}

export default Neo;