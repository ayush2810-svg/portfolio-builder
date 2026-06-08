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
  @keyframes lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
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
    --green:     #2a7a4a;
    --border:    rgba(13,13,13,0.09);
    --border-md: rgba(13,13,13,0.13);
  }

  .rr-root {
    height: 100dvh;
    background: var(--off);
    font-family: 'Outfit', sans-serif;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    overflow: hidden;
  }

  /* blobs */
  .rr-blobs {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .rr-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(72px);
    opacity: 0.58;
    animation: drift var(--d,12s) ease-in-out infinite;
    animation-delay: var(--dl,0s);
  }
  .b1 { width:460px;height:460px; top:-140px;left:-90px;  background:radial-gradient(circle,#d6e8ff 0%,transparent 68%); --d:15s; }
  .b2 { width:360px;height:360px; bottom:-90px;right:30%;  background:radial-gradient(circle,#ffe5d6 0%,transparent 68%); --d:12s;--dl:-5s; }
  .b3 { width:300px;height:300px; top:30%;right:-60px;    background:radial-gradient(circle,#dff4e8 0%,transparent 68%); --d:17s;--dl:-8s; }

  /* LEFT */
  .rr-left {
    position: relative;
    z-index: 2;
    padding: 36px 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid var(--border-md);
    animation: fadeIn 0.5s ease both;
    overflow: hidden;
  }

  .rr-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .rr-logo-mark {
    width: 28px; height: 28px;
    background: var(--ink);
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
  }
  .rr-logo-name {
    font-family: 'Syne', sans-serif;
    font-size: 14px; font-weight: 700;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--ink);
  }

  .rr-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 0;
  }

  .rr-tag {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 10.5px; font-weight: 500;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--ink-55); margin-bottom: 16px;
    animation: fadeUp 0.45s 0.1s ease both;
  }
  .rr-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--red); flex-shrink: 0;
    animation: pulse 2.5s ease-in-out infinite;
  }
  .rr-dash { width: 22px; height: 1px; background: var(--red); flex-shrink: 0; }

  .rr-h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(30px, 3.4vw, 48px);
    font-weight: 800; line-height: 0.96;
    letter-spacing: -0.03em; color: var(--ink);
    margin-bottom: 16px;
    animation: fadeUp 0.45s 0.17s ease both;
  }
  .rr-h1 .hollow {
    -webkit-text-stroke: 1.5px var(--ink);
    color: transparent;
  }

  .rr-rule {
    width: 100%; height: 1px;
    background: var(--border-md);
    margin-bottom: 14px;
    transform-origin: left;
    animation: lineGrow 0.7s 0.28s ease both;
  }

  .rr-p {
    font-size: 13px; color: var(--ink-55);
    line-height: 1.72; max-width: 290px;
    font-weight: 300; margin-bottom: 22px;
    animation: fadeUp 0.45s 0.24s ease both;
  }

  /* Steps list */
  .rr-steps {
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: fadeUp 0.45s 0.32s ease both;
    flex-shrink: 0;
  }
  .rr-step {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .rr-step-num {
    font-family: 'Syne', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--white);
    background: var(--ink);
    width: 22px; height: 22px;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .rr-step-text {
    font-size: 13px;
    color: var(--ink-55);
    line-height: 1.5;
    font-weight: 300;
  }
  .rr-step-text strong {
    color: var(--ink);
    font-weight: 500;
    display: block;
    font-size: 13px;
  }

  .rr-copy {
    font-size: 11px; color: var(--ink-55);
    font-weight: 300; flex-shrink: 0;
    animation: fadeIn 0.5s 0.4s ease both;
  }

  /* RIGHT */
  .rr-right {
    position: relative; z-index: 2;
    display: flex; align-items: center; justify-content: center;
    padding: 36px 48px;
    overflow-y: auto;
  }

  .rr-form {
    width: 100%; max-width: 380px;
    animation: fadeIn 0.5s 0.12s ease both;
    padding: 4px 0;
  }

  .rr-eyebrow {
    font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ink-55); font-weight: 500;
    margin-bottom: 9px;
    display: flex; align-items: center; gap: 8px;
  }
  .rr-eyebrow i { width: 18px; height: 1px; background: var(--border-md); display: inline-block; }

  .rr-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px; font-weight: 700;
    color: var(--ink); letter-spacing: -0.02em;
    margin-bottom: 4px;
    animation: fadeUp 0.4s 0.22s ease both;
  }
  .rr-sub {
    font-size: 13px; color: var(--ink-55); font-weight: 300;
    margin-bottom: 22px;
    animation: fadeUp 0.4s 0.28s ease both;
  }

  /* Two-col grid for name + username */
  .rr-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .rr-field { margin-bottom: 14px; }
  .rr-field.anim-1{animation:fadeUp 0.4s 0.30s ease both;}
  .rr-field.anim-2{animation:fadeUp 0.4s 0.36s ease both;}
  .rr-field.anim-3{animation:fadeUp 0.4s 0.42s ease both;}
  .rr-field.anim-4{animation:fadeUp 0.4s 0.48s ease both;}
  .rr-field.anim-5{animation:fadeUp 0.4s 0.54s ease both;}

  .rr-label {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 10.5px; font-weight: 500;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--ink); margin-bottom: 7px;
  }
  .rr-label-hint {
    color: var(--ink-55);
    font-size: 10px;
    letter-spacing: 0;
    text-transform: none;
    font-weight: 400;
  }

  .rr-iw { position: relative; }
  .rr-iw svg {
    position: absolute; left: 13px; top: 50%;
    transform: translateY(-50%);
    opacity: 0.26; pointer-events: none; transition: opacity 0.2s;
  }
  .rr-iw:focus-within svg { opacity: 0.6; }

  .rr-input {
    width: 100%; height: 44px;
    padding: 0 13px 0 38px;
    border: 1px solid var(--border-md);
    border-radius: 10px;
    background: rgba(255,255,255,0.78);
    backdrop-filter: blur(8px);
    font-family: 'Outfit', sans-serif;
    font-size: 14px; font-weight: 400; color: var(--ink);
    outline: none;
    transition: border-color 0.16s, box-shadow 0.16s;
  }
  .rr-input::placeholder { color: rgba(13,13,13,0.2); }
  .rr-input:focus {
    border-color: var(--ink);
    box-shadow: 0 0 0 3px var(--ink-10);
    background: #fff;
  }
  .rr-input.no-icon { padding-left: 13px; }

  /* Password strength */
  .rr-strength {
    margin-top: 6px;
    display: flex;
    gap: 3px;
  }
  .rr-seg {
    flex: 1; height: 2px; border-radius: 2px;
    background: var(--border-md);
    transition: background 0.25s;
  }
  .rr-seg.s1 { background: #d63a2f; }
  .rr-seg.s2 { background: #e07a30; }
  .rr-seg.s3 { background: #c8a84a; }
  .rr-seg.s4 { background: #2a7a4a; }

  .rr-hint {
    font-size: 11px; margin-top: 4px;
    font-weight: 400; letter-spacing: 0.01em;
  }

  /* Match indicator */
  .rr-match {
    font-size: 11px; margin-top: 4px;
    font-weight: 400;
  }

  .rr-btn {
    width: 100%; height: 48px; margin-top: 4px;
    border: none; border-radius: 10px;
    background: var(--ink); color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: background 0.16s, transform 0.12s, box-shadow 0.16s;
    animation: fadeUp 0.4s 0.58s ease both;
  }
  .rr-btn:hover:not(:disabled) {
    background: #1e1e1e;
    transform: translateY(-1px);
    box-shadow: 0 8px 22px rgba(13,13,13,0.2);
  }
  .rr-btn:active:not(:disabled) { transform: translateY(0); box-shadow: none; }
  .rr-btn:disabled { opacity: 0.36; cursor: not-allowed; }

  .rr-ring {
    width: 20px; height: 20px; border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.28);
    display: flex; align-items: center; justify-content: center;
  }
  .rr-spinner {
    width: 17px; height: 17px;
    border: 2px solid rgba(255,255,255,0.22);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.65s linear infinite;
  }

  .rr-sep {
    display: flex; align-items: center; gap: 10px;
    margin: 16px 0;
    animation: fadeUp 0.4s 0.62s ease both;
  }
  .rr-sep-l { flex: 1; height: 1px; background: var(--border); }
  .rr-sep-t {
    font-size: 10.5px; letter-spacing: 0.09em;
    text-transform: uppercase; color: var(--ink-55); white-space: nowrap;
  }

  .rr-footer {
    text-align: center; font-size: 13px; color: var(--ink-55);
    animation: fadeUp 0.4s 0.66s ease both;
  }
  .rr-footer a {
    color: var(--ink); text-decoration: none; font-weight: 600;
    border-bottom: 1px solid var(--border-md); padding-bottom: 1px;
    transition: border-color 0.15s;
  }
  .rr-footer a:hover { border-color: var(--ink); }

  /* Mobile */
  @media (max-width: 768px) {
    html, body, #root { overflow: auto; }
    .rr-root { height: auto; min-height: 100dvh; grid-template-columns: 1fr; }
    .rr-left { border-right: none; border-bottom: 1px solid var(--border-md); padding: 28px 20px 24px; }
    .rr-right { padding: 28px 20px 44px; overflow-y: visible; }
    .rr-h1 { font-size: 34px; }
    .rr-form { max-width: 100%; }
    .rr-title { font-size: 22px; }
    .b3 { display: none; }
  }
  @media (max-width: 400px) {
    .rr-left { padding: 22px 16px 20px; }
    .rr-right { padding: 22px 16px 36px; }
    .rr-h1 { font-size: 28px; }
    .rr-grid { grid-template-columns: 1fr; }
  }
`;

function getStrength(pw) {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9!@#$%^&*]/.test(pw)) s++;
  return s;
}

const strengthMeta = [
  null,
  { label: "Too weak", color: "#d63a2f" },
  { label: "Getting there", color: "#e07a30" },
  { label: "Almost solid", color: "#c8a84a" },
  { label: "Strong", color: "#2a7a4a" },
];

export default function Register() {
  const [form, setForm] = useState({
    name: "", username: "", email: "", password: "", confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const pwStrength = getStrength(form.password);
  const meta = pwStrength > 0 ? strengthMeta[pwStrength] : null;
  const passwordsMatch = form.confirmPassword.length > 0 && form.password === form.confirmPassword;
  const passwordsMismatch = form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await API.post("auth/register", form);
      alert(res.data.message || "Registration successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // Icon components
  const IconUser = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );
  const IconAt = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
    </svg>
  );
  const IconLock = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
  const IconHash = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
      <line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
    </svg>
  );

  return (
    <>
      <style>{css}</style>
      <div className="rr-root">

        {/* Blobs */}
        <div className="rr-blobs" aria-hidden="true">
          <div className="rr-blob b1" />
          <div className="rr-blob b2" />
          <div className="rr-blob b3" />
        </div>

        {/* LEFT */}
        <div className="rr-left">
          <div className="rr-logo">
            <div className="rr-logo-mark">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" fill="white"/>
                <rect x="8" y="1" width="5" height="5" fill="white" opacity="0.42"/>
                <rect x="1" y="8" width="5" height="5" fill="white" opacity="0.42"/>
                <rect x="8" y="8" width="5" height="5" fill="white"/>
              </svg>
            </div>
            <span className="rr-logo-name">DevFolio</span>
          </div>

          <div className="rr-body">
            <div className="rr-tag">
              <span className="rr-dot" />
              <span className="rr-dash" />
              Create Account
            </div>

            <h1 className="rr-h1">
              Build your<br />
              <span className="hollow">portfolio</span><br />
              today.
            </h1>

            <div className="rr-rule" />

            <p className="rr-p">
              Join 12,000+ creators who showcase their best work and land opportunities through DevFolio.
            </p>

            <div className="rr-steps">
              {[
                { n: "01", title: "Fill in your details", desc: "Name, username & email" },
                { n: "02", title: "Set a secure password", desc: "Keep your account safe" },
                { n: "03", title: "Start building", desc: "Your portfolio goes live instantly" },
              ].map((s) => (
                <div key={s.n} className="rr-step">
                  <div className="rr-step-num">{s.n}</div>
                  <div className="rr-step-text">
                    <strong>{s.title}</strong>
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rr-copy">© 2025 DevFolio. All rights reserved.</div>
        </div>

        {/* RIGHT */}
        <div className="rr-right">
          <div className="rr-form">
            <div className="rr-eyebrow"><i />Create account</div>
            <div className="rr-title">Get started free</div>
            <div className="rr-sub">No credit card required.</div>

            {/* Name + Username */}
            <div className="rr-grid">
              <div className="rr-field anim-1">
                <label className="rr-label" htmlFor="name">Full Name</label>
                <div className="rr-iw">
                  <IconUser />
                  <input id="name" className="rr-input" type="text" placeholder="Jane Smith"
                    value={form.name} onChange={up("name")} autoComplete="name" />
                </div>
              </div>
              <div className="rr-field anim-2">
                <label className="rr-label" htmlFor="username">Username</label>
                <div className="rr-iw">
                  <IconHash />
                  <input id="username" className="rr-input" type="text" placeholder="jane_dev"
                    value={form.username} onChange={up("username")} autoComplete="username" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rr-field anim-3">
              <label className="rr-label" htmlFor="email">Email</label>
              <div className="rr-iw">
                <IconAt />
                <input id="email" className="rr-input" type="email" placeholder="jane@example.com"
                  value={form.email} onChange={up("email")} autoComplete="email" />
              </div>
            </div>

            {/* Password */}
            <div className="rr-field anim-4">
              <label className="rr-label" htmlFor="password">
                Password
                {meta && (
                  <span className="rr-label-hint" style={{ color: meta.color }}>{meta.label}</span>
                )}
              </label>
              <div className="rr-iw">
                <IconLock />
                <input id="password" className="rr-input" type="password" placeholder="Min. 8 characters"
                  value={form.password} onChange={up("password")} autoComplete="new-password" />
              </div>
              {form.password.length > 0 && (
                <div className="rr-strength">
                  {[1,2,3,4].map((i) => (
                    <div
                      key={i}
                      className={`rr-seg${i <= pwStrength ? " s" + pwStrength : ""}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="rr-field anim-5">
              <label className="rr-label" htmlFor="confirm">
                Confirm Password
                {passwordsMatch && (
                  <span className="rr-label-hint" style={{ color: "var(--green)" }}>✓ Matches</span>
                )}
                {passwordsMismatch && (
                  <span className="rr-label-hint" style={{ color: "var(--red)" }}>✗ No match</span>
                )}
              </label>
              <div className="rr-iw">
                <IconLock />
                <input id="confirm" className="rr-input" type="password" placeholder="Repeat password"
                  value={form.confirmPassword} onChange={up("confirmPassword")} autoComplete="new-password" />
              </div>
            </div>

            <button className="rr-btn" onClick={handleRegister} disabled={loading}>
              {loading ? <div className="rr-spinner" /> : (
                <>
                  Create Account
                  <div className="rr-ring">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 5h6M5 2l3 3-3 3"/>
                    </svg>
                  </div>
                </>
              )}
            </button>

            <div className="rr-sep">
              <div className="rr-sep-l" />
              <div className="rr-sep-t">Already have an account?</div>
              <div className="rr-sep-l" />
            </div>

            <div className="rr-footer">
              <Link to="/login">Sign in instead →</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}