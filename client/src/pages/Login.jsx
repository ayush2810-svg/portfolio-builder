import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.22; }
  }
  @keyframes drift {
    0%,100% { transform: translate(0,0) scale(1); }
    40%     { transform: translate(28px,-18px) scale(1.05); }
    70%     { transform: translate(-18px,14px) scale(0.97); }
  }

  html, body, #root {
    height: 100%;
    overflow: hidden;
  }

  :root {
    --ink:       #0d0d0d;
    --ink-55:    rgba(13,13,13,0.55);
    --ink-10:    rgba(13,13,13,0.07);
    --white:     #ffffff;
    --off:       #f5f5f2;
    --red:       #d63a2f;
    --border:    rgba(13,13,13,0.09);
    --border-md: rgba(13,13,13,0.13);
  }

  .lr-root {
    height: 100dvh;
    background: var(--off);
    font-family: 'Outfit', sans-serif;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    overflow: hidden;
  }

  /* blobs */
  .lr-blobs {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .lr-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(72px);
    opacity: 0.6;
    animation: drift var(--d,12s) ease-in-out infinite;
    animation-delay: var(--dl,0s);
  }
  .b1 { width:500px;height:500px; top:-160px;left:-100px; background:radial-gradient(circle,#d6e8ff 0%,transparent 68%); --d:15s; }
  .b2 { width:380px;height:380px; bottom:-100px;left:22%;  background:radial-gradient(circle,#ffe5d6 0%,transparent 68%); --d:12s;--dl:-5s; }
  .b3 { width:320px;height:320px; top:25%;right:-80px;    background:radial-gradient(circle,#dff4e8 0%,transparent 68%); --d:17s;--dl:-8s; }

  /* LEFT */
  .lr-left {
    position: relative;
    z-index: 2;
    padding: 40px 52px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid var(--border-md);
    animation: fadeIn 0.5s ease both;
    overflow: hidden;
  }

  .lr-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .lr-logo-mark {
    width: 28px;height: 28px;
    background: var(--ink);
    border-radius: 6px;
    display: flex;align-items: center;justify-content: center;
  }
  .lr-logo-name {
    font-family: 'Syne',sans-serif;
    font-size: 14px;font-weight: 700;
    letter-spacing: 0.05em;text-transform: uppercase;
    color: var(--ink);
  }

  .lr-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 0;
    padding: 0;
  }

  .lr-tag {
    display: inline-flex;align-items: center;gap: 7px;
    font-size: 10.5px;font-weight: 500;
    letter-spacing: 0.13em;text-transform: uppercase;
    color: var(--ink-55);margin-bottom: 18px;
    animation: fadeUp 0.45s 0.1s ease both;
  }
  .lr-dot {
    width: 5px;height: 5px;border-radius: 50%;
    background: var(--red);flex-shrink: 0;
    animation: pulse 2.5s ease-in-out infinite;
  }
  .lr-dash { width: 22px;height: 1px;background: var(--red);flex-shrink: 0; }

  .lr-h1 {
    font-family: 'Syne',sans-serif;
    font-size: clamp(34px, 3.8vw, 54px);
    font-weight: 800;line-height: 0.95;
    letter-spacing: -0.03em;color: var(--ink);
    margin-bottom: 18px;
    animation: fadeUp 0.45s 0.17s ease both;
  }
  .lr-h1 .hollow {
    -webkit-text-stroke: 1.5px var(--ink);
    color: transparent;
  }

  .lr-rule { width:100%;height:1px;background:var(--border-md);margin-bottom:16px;animation:fadeIn 0.6s 0.27s ease both; }

  .lr-p {
    font-size: 13.5px;color: var(--ink-55);
    line-height: 1.72;max-width: 300px;
    font-weight: 300;margin-bottom: 24px;
    animation: fadeUp 0.45s 0.24s ease both;
  }

  .lr-stats {
    display: grid;grid-template-columns: 1fr 1fr;
    gap: 1px;background: var(--border-md);
    border: 1px solid var(--border-md);border-radius: 12px;
    overflow: hidden;flex-shrink: 0;
    animation: fadeUp 0.45s 0.32s ease both;
  }
  .lr-stat {
    background: rgba(255,255,255,0.7);
    padding: 13px 17px;
    backdrop-filter: blur(6px);
  }
  .lr-num {
    font-family: 'Syne',sans-serif;
    font-size: 21px;font-weight: 700;
    color: var(--ink);letter-spacing: -0.02em;
    line-height: 1;margin-bottom: 3px;
  }
  .lr-lbl { font-size: 11px;color: var(--ink-55); }

  .lr-copy {
    font-size: 11px;color: var(--ink-55);font-weight: 300;flex-shrink: 0;
    animation: fadeIn 0.5s 0.4s ease both;
  }

  /* RIGHT */
  .lr-right {
    position: relative;z-index: 2;
    display: flex;align-items: center;justify-content: center;
    padding: 40px 52px;overflow: hidden;
  }

  .lr-form {
    width: 100%;max-width: 370px;
    animation: fadeIn 0.5s 0.12s ease both;
  }

  .lr-eyebrow {
    font-size: 10.5px;letter-spacing: 0.14em;text-transform: uppercase;
    color: var(--ink-55);font-weight: 500;
    margin-bottom: 9px;
    display: flex;align-items: center;gap: 8px;
  }
  .lr-eyebrow i { width:18px;height:1px;background:var(--border-md);display:inline-block; }

  .lr-title {
    font-family: 'Syne',sans-serif;
    font-size: 27px;font-weight: 700;
    color: var(--ink);letter-spacing: -0.02em;
    margin-bottom: 5px;
    animation: fadeUp 0.4s 0.22s ease both;
  }
  .lr-sub {
    font-size: 13px;color: var(--ink-55);font-weight: 300;
    margin-bottom: 26px;
    animation: fadeUp 0.4s 0.28s ease both;
  }

  .lr-field { margin-bottom: 15px; }
  .lr-field:nth-of-type(1){animation:fadeUp 0.4s 0.32s ease both;}
  .lr-field:nth-of-type(2){animation:fadeUp 0.4s 0.38s ease both;}

  .lr-label {
    display: flex;justify-content: space-between;align-items: center;
    font-size: 10.5px;font-weight: 500;
    letter-spacing: 0.07em;text-transform: uppercase;
    color: var(--ink);margin-bottom: 7px;
  }
  .lr-label a {
    color: var(--ink-55);text-decoration: none;font-weight: 400;
    letter-spacing: 0;text-transform: none;font-size: 12px;
    transition: color 0.15s;
  }
  .lr-label a:hover { color: var(--ink); }

  .lr-iw { position: relative; }
  .lr-iw svg {
    position: absolute;left:13px;top:50%;
    transform:translateY(-50%);
    opacity:0.26;pointer-events:none;transition:opacity 0.2s;
  }
  .lr-iw:focus-within svg { opacity: 0.6; }

  .lr-input {
    width:100%;height:46px;
    padding:0 13px 0 38px;
    border:1px solid var(--border-md);
    border-radius:10px;
    background:rgba(255,255,255,0.78);
    backdrop-filter:blur(8px);
    font-family:'Outfit',sans-serif;
    font-size:14px;font-weight:400;color:var(--ink);
    outline:none;transition:border-color 0.16s,box-shadow 0.16s;
  }
  .lr-input::placeholder{color:rgba(13,13,13,0.2);}
  .lr-input:focus{border-color:var(--ink);box-shadow:0 0 0 3px var(--ink-10);background:#fff;}

  .lr-btn {
    width:100%;height:48px;margin-top:6px;
    border:none;border-radius:10px;
    background:var(--ink);color:#fff;
    font-family:'Syne',sans-serif;font-size:13px;font-weight:600;
    letter-spacing:0.07em;text-transform:uppercase;cursor:pointer;
    display:flex;align-items:center;justify-content:center;gap:10px;
    transition:background 0.16s,transform 0.12s,box-shadow 0.16s;
    animation:fadeUp 0.4s 0.44s ease both;
  }
  .lr-btn:hover:not(:disabled){background:#1e1e1e;transform:translateY(-1px);box-shadow:0 8px 22px rgba(13,13,13,0.2);}
  .lr-btn:active:not(:disabled){transform:translateY(0);box-shadow:none;}
  .lr-btn:disabled{opacity:0.36;cursor:not-allowed;}

  .lr-ring {
    width:20px;height:20px;border-radius:50%;
    border:1.5px solid rgba(255,255,255,0.28);
    display:flex;align-items:center;justify-content:center;
  }
  .lr-spinner{width:17px;height:17px;border:2px solid rgba(255,255,255,0.22);border-top-color:#fff;border-radius:50%;animation:spin 0.65s linear infinite;}

  .lr-sep {
    display:flex;align-items:center;gap:10px;
    margin:18px 0;animation:fadeUp 0.4s 0.48s ease both;
  }
  .lr-sep-l{flex:1;height:1px;background:var(--border);}
  .lr-sep-t{font-size:10.5px;letter-spacing:0.09em;text-transform:uppercase;color:var(--ink-55);white-space:nowrap;}

  .lr-footer {
    text-align:center;font-size:13.5px;color:var(--ink-55);
    animation:fadeUp 0.4s 0.52s ease both;
  }
  .lr-footer a {
    color:var(--ink);text-decoration:none;font-weight:600;
    border-bottom:1px solid var(--border-md);padding-bottom:1px;
    transition:border-color 0.15s;
  }
  .lr-footer a:hover{border-color:var(--ink);}

  /* Mobile */
  @media (max-width: 768px) {
    html,body,#root{overflow:auto;}
    .lr-root{height:auto;min-height:100dvh;grid-template-columns:1fr;}
    .lr-left{border-right:none;border-bottom:1px solid var(--border-md);padding:32px 22px 28px;}
    .lr-right{padding:32px 22px 44px;}
    .lr-h1{font-size:38px;}
    .lr-form{max-width:100%;}
    .lr-title{font-size:24px;}
    .b3{display:none;}
  }
  @media (max-width: 400px) {
    .lr-left{padding:24px 16px 22px;}
    .lr-right{padding:24px 16px 36px;}
    .lr-h1{font-size:32px;}
  }
`;

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      if (res.data.token) {
        localStorage.setItem("portfolioToken", res.data.token);
        localStorage.setItem("portfolioUser", JSON.stringify(res.data.User));
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <>
      <style>{css}</style>
      <div className="lr-root">

        <div className="lr-blobs" aria-hidden="true">
          <div className="lr-blob b1" />
          <div className="lr-blob b2" />
          <div className="lr-blob b3" />
        </div>

        {/* LEFT */}
        <div className="lr-left">
          <div className="lr-logo">
            <div className="lr-logo-mark">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" fill="white"/>
                <rect x="8" y="1" width="5" height="5" fill="white" opacity="0.42"/>
                <rect x="1" y="8" width="5" height="5" fill="white" opacity="0.42"/>
                <rect x="8" y="8" width="5" height="5" fill="white"/>
              </svg>
            </div>
            <span className="lr-logo-name">DevFolio</span>
          </div>

          <div className="lr-body">
            <div className="lr-tag">
              <span className="lr-dot" />
              <span className="lr-dash" />
              Portfolio Builder
            </div>
            <h1 className="lr-h1">
              Your work,<br />
              <span className="hollow">shown</span><br />
              right.
            </h1>
            <div className="lr-rule" />
            <p className="lr-p">
              Create a stunning portfolio in minutes — no design skills needed. Share it and get noticed.
            </p>
            <div className="lr-stats">
              {[
                { num: "12K+",  lbl: "Active creators" },
                { num: "98%",   lbl: "Satisfaction" },
                { num: "3 min", lbl: "Avg. setup time" },
                { num: "Free",  lbl: "To get started" },
              ].map((s, i) => (
                <div key={i} className="lr-stat">
                  <div className="lr-num">{s.num}</div>
                  <div className="lr-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lr-copy">© 2025 DevFolio. All rights reserved.</div>
        </div>

        {/* RIGHT */}
        <div className="lr-right">
          <div className="lr-form">
            <div className="lr-eyebrow"><i />Sign in</div>
            <div className="lr-title">Welcome back</div>
            <div className="lr-sub">Enter your credentials to continue.</div>

            <div className="lr-field">
              <label className="lr-label" htmlFor="un">Username</label>
              <div className="lr-iw">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input id="un" className="lr-input" type="text" placeholder="your_username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  onKeyDown={handleKey} autoComplete="username" />
              </div>
            </div>

            <div className="lr-field">
              <label className="lr-label" htmlFor="pw">
                Password <a href="#">Forgot?</a>
              </label>
              <div className="lr-iw">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input id="pw" className="lr-input" type="password" placeholder="••••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={handleKey} autoComplete="current-password" />
              </div>
            </div>

            <button className="lr-btn" onClick={handleLogin} disabled={loading}>
              {loading ? <div className="lr-spinner" /> : (
                <>
                  Sign In
                  <div className="lr-ring">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 5h6M5 2l3 3-3 3"/>
                    </svg>
                  </div>
                </>
              )}
            </button>

            <div className="lr-sep">
              <div className="lr-sep-l" /><div className="lr-sep-t">New here?</div><div className="lr-sep-l" />
            </div>
            <div className="lr-footer">
              <Link to="/register">Create a free account →</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}