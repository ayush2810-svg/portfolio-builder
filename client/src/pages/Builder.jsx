import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import API from "../services/api";
import Preview from "../component/Preview";

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

  /* ── Shell ── */
  .vb-root {
    height: 100dvh;
    display: flex;
    font-family: 'Outfit', sans-serif;
    background: var(--off);
    position: relative;
    overflow: hidden;
  }

  /* Blobs — behind everything */
  .vb-blobs { position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden; }
  .vb-blob  { position:absolute;border-radius:50%;filter:blur(80px);opacity:0.45;animation:drift var(--d,12s) ease-in-out infinite;animation-delay:var(--dl,0s); }
  .bb1 { width:500px;height:500px;top:-140px;left:-60px; background:radial-gradient(circle,#d6e8ff 0%,transparent 68%);--d:15s; }
  .bb2 { width:360px;height:360px;bottom:-90px;right:10%; background:radial-gradient(circle,#ffe5d6 0%,transparent 68%);--d:12s;--dl:-5s; }
  .bb3 { width:300px;height:300px;top:30%;right:5%;      background:radial-gradient(circle,#dff4e8 0%,transparent 68%);--d:17s;--dl:-8s; }

  /* ══════════════════════════════
     LEFT PANEL — EDITOR
  ══════════════════════════════ */
  .vb-editor {
    width: var(--panel-w);
    flex-shrink: 0;
    height: 100dvh;
    background: rgba(255,255,255,0.78);
    backdrop-filter: blur(18px);
    border-right: 1px solid var(--border-md);
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 5;
    overflow: hidden;
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  .vb-editor.collapsed { width: 0; min-width: 0; overflow: hidden; }

  /* Editor topbar */
  .vb-ed-top {
    flex-shrink: 0;
    height: 54px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid var(--border);
    background: rgba(255,255,255,0.85);
  }
  .vb-ed-top-logo {
    display: flex; align-items: center; gap: 9px;
  }
  .vb-ed-logo-mark {
    width: 26px; height: 26px; border-radius: 6px;
    background: var(--ink);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .vb-ed-title {
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink);
  }
  .vb-ed-subtitle { font-size: 10.5px; color: var(--ink-55); font-weight: 300; }

  /* Scrollable form body */
  .vb-ed-body {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    padding: 20px 18px 40px;
  }
  .vb-ed-body::-webkit-scrollbar { width: 3px; }
  .vb-ed-body::-webkit-scrollbar-thumb { background: var(--border-md); border-radius: 2px; }

  /* Save footer */
  .vb-ed-foot {
    flex-shrink: 0;
    padding: 14px 18px;
    border-top: 1px solid var(--border);
    background: rgba(255,255,255,0.85);
    display: flex; gap: 8px;
  }

  /* ── Section label ── */
  .vb-sec {
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--ink-55);
    margin-top: 18px; margin-bottom: 8px;
    display: flex; align-items: center; gap: 8px;
    animation: fadeUp 0.4s ease both;
  }
  .vb-sec::after { content:''; flex:1; height:1px; background:var(--border); }
  .vb-sec:first-child { margin-top: 0; }

  /* ── Form controls ── */
  .vb-field { margin-bottom: 10px; animation: fadeUp 0.4s ease both; }

  .vb-label {
    display: block; font-size: 10.5px; font-weight: 500;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--ink); margin-bottom: 6px;
  }

  .vb-input, .vb-textarea, .vb-select {
    width: 100%;
    border: 1px solid var(--border-md);
    border-radius: 9px;
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(6px);
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px; font-weight: 400; color: var(--ink);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    padding: 9px 12px;
  }
  .vb-input::placeholder, .vb-textarea::placeholder { color: rgba(13,13,13,0.22); }
  .vb-input:focus, .vb-textarea:focus, .vb-select:focus {
    border-color: var(--ink); box-shadow: 0 0 0 3px var(--ink-10); background: #fff;
  }
  .vb-textarea { resize: vertical; min-height: 72px; line-height: 1.6; }
  .vb-select {
    appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%230d0d0d' opacity='.4'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 11px center;
    background-color: rgba(255,255,255,0.8); padding-right: 28px;
  }

  /* Grid */
  .vb-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

  /* File upload */
  .vb-file-label {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; height: 44px;
    border: 1.5px dashed var(--border-md); border-radius: 9px;
    background: var(--ink-06); cursor: pointer;
    font-size: 12px; font-weight: 500; color: var(--ink-55);
    letter-spacing: 0.04em;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
  }
  .vb-file-label:hover { border-color: var(--ink-20); background: var(--ink-10); color: var(--ink); }
  .vb-file-input { display: none; }

  /* Skill row */
  .vb-skill-row { display: flex; gap: 6px; }
  .vb-skill-row .vb-input { flex: 1; }
  .vb-skill-row .vb-select { width: 118px; flex-shrink: 0; }

  /* Tags */
  .vb-tag-group { margin-bottom: 10px; }
  .vb-tag-group-label {
    font-size: 9.5px; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--ink-55); margin-bottom: 5px;
  }
  .vb-tag-list { display: flex; flex-wrap: wrap; gap: 5px; }
  .vb-tag {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px;
    background: var(--ink-10); border: 1px solid var(--border-md);
    border-radius: 6px;
    font-size: 12px; font-weight: 400; color: var(--ink);
    animation: tagPop 0.25s cubic-bezier(0.23,1,0.32,1) both;
  }
  .vb-tag-x {
    background: none; border: none; cursor: pointer;
    color: var(--ink-55); font-size: 11px; padding: 0; line-height: 1;
    transition: color 0.15s;
  }
  .vb-tag-x:hover { color: var(--red); }

  /* Project items */
  .vb-project-item {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 11px 13px; margin-bottom: 7px;
    background: rgba(255,255,255,0.65); border: 1px solid var(--border-md);
    border-left: 2px solid var(--ink-20); border-radius: 9px;
    animation: fadeUp 0.3s ease both;
  }
  .vb-project-body { flex: 1; min-width: 0; }
  .vb-project-name { font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
  .vb-project-desc { font-size: 12px; color: var(--ink-55); font-weight: 300; line-height: 1.5; }

  /* ── Buttons ── */
  .vb-btn {
    height: 38px; padding: 0 16px;
    border-radius: 9px; border: none;
    font-family: 'Syne', sans-serif; font-size: 11.5px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    cursor: pointer; display: inline-flex; align-items: center; gap: 7px;
    transition: background 0.14s, transform 0.11s, box-shadow 0.14s;
    white-space: nowrap; flex-shrink: 0;
  }
  .vb-btn-ghost {
    background: rgba(255,255,255,0.7); color: var(--ink);
    border: 1px solid var(--border-md);
  }
  .vb-btn-ghost:hover { background: #fff; box-shadow: 0 3px 10px rgba(13,13,13,0.07); }
  .vb-btn-dark { background: var(--ink); color: #fff; }
  .vb-btn-dark:hover { background: #1e1e1e; transform: translateY(-1px); box-shadow: 0 5px 16px rgba(13,13,13,0.2); }
  .vb-btn-dark:active { transform: translateY(0); box-shadow: none; }
  .vb-btn-add {
    background: var(--ink-10); color: var(--ink);
    border: 1px solid var(--border-md);
  }
  .vb-btn-add:hover { background: var(--ink-20); }
  .vb-btn-save {
    flex: 1; height: 44px; font-size: 12.5px;
    background: var(--ink); color: #fff;
  }
  .vb-btn-save:hover { background: #1e1e1e; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(13,13,13,0.2); }
  .vb-btn-save:active { transform: translateY(0); box-shadow: none; }

  .vb-btn-ring { width:17px;height:17px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.28);display:flex;align-items:center;justify-content:center; }
`;


function Builder() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [title,        setTitle]        = useState("");
  const [description,  setDescription]  = useState("");
  const [location,     setLocation]     = useState("");
  const [image,        setImage]        = useState(null);
  const [imageName,    setImageName]    = useState("");
  const [resume,       setResume]       = useState(null);
  const [education,    setEducation]    = useState("");
  const [experience,   setExperience]   = useState("");
  const [achievements, setAchievements] = useState("");
  const [contact,      setContact]      = useState({ email:"", phone:"", github:"", linkedin:"" });
  const [skills,       setSkills]       = useState({ technical:[], nonTechnical:[], tools:[] });
  const [skillInput,   setSkillInput]   = useState("");
  const [skillType,    setSkillType]    = useState("technical");
  const [projects,     setProjects]     = useState([]);
  const [projectName,  setProjectName]  = useState("");
  const [projectDesc,  setProjectDesc]  = useState("");
  const [template,     setTemplate]     = useState("neo");
  const [livePreview,  setLivePreview]  = useState(true);
  const [saving,       setSaving]       = useState(false);

  /* load template from URL */
  useEffect(() => {
    const t = searchParams.get("template");
    if (t) setTemplate(t);
  }, [searchParams]);

  /* load portfolio if editing */
  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const res = await API.get("/portfolio/my-portfolio");
      const p = res.data.find(p => p._id === id);
      if (!p) return;
      setTitle(p.title);
      setDescription(p.description);
      setSkills(p.skills);
      setProjects(p.projects);
      setTemplate(p.template);
    };
    load();
  }, [id]);

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setSkills(prev => ({ ...prev, [skillType]: [...prev[skillType], skillInput.trim()] }));
    setSkillInput("");
  };
  const removeSkill = (type, i) => setSkills(prev => ({ ...prev, [type]: prev[type].filter((_,idx) => idx !== i) }));

  const addProject = () => {
    if (!projectName.trim() || !projectDesc.trim()) return;
    setProjects(prev => [...prev, { name: projectName.trim(), description: projectDesc.trim() }]);
    setProjectName(""); setProjectDesc("");
  };
  const removeProject = i => setProjects(prev => prev.filter((_,idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    const formData = new FormData();
    formData.append("title",        title);
    formData.append("description",  description);
    formData.append("location",     location);
    formData.append("template",     template);
    formData.append("skills",       JSON.stringify(skills));
    formData.append("projects",     JSON.stringify(projects));
    formData.append("contact",      JSON.stringify(contact));
    formData.append("education",    education);
    formData.append("experience",   experience);
    formData.append("achievements", achievements);
    if (image)  formData.append("profileImage", image);
    if (resume) formData.append("resume",        resume);
    try {
      if (id) await API.put(`/portfolio/update/${id}`, formData);
      else    await API.post("/portfolio/create",      formData);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Save failed — please try again.");
    } finally {
      setSaving(false);
    }
  };
  

  /* ── Icon helpers ── */
  const ArrowRight   = () => <svg width="9"  height="9"  viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5h6M5 2l3 3-3 3"/></svg>;
  const PlusIcon     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>;
  const UploadIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>;
  const SpinIcon     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation:"spin 0.7s linear infinite"}}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;

  return (
    <>
      <style>{css}</style>
      <div className="vb-root">

        {/* Blobs */}
        <div className="vb-blobs" aria-hidden="true">
          <div className="vb-blob bb1"/><div className="vb-blob bb2"/><div className="vb-blob bb3"/>
        </div>

        {/* ══════════════════════════════
            LEFT — EDITOR
        ══════════════════════════════ */}
        <div className={`vb-editor${livePreview ? "" : " collapsed"}`}>

          {/* Editor top bar */}
          <div className="vb-ed-top">
            <div className="vb-ed-top-logo">
              <div className="vb-ed-logo-mark">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" fill="white"/>
                  <rect x="8" y="1" width="5" height="5" fill="white" opacity="0.42"/>
                  <rect x="1" y="8" width="5" height="5" fill="white" opacity="0.42"/>
                  <rect x="8" y="8" width="5" height="5" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="vb-ed-title">{isEdit ? "Edit Folio" : "New Folio"}</div>
                <div className="vb-ed-subtitle">{isEdit ? "Update your portfolio" : "Build your portfolio"}</div>
              </div>
            </div>
            <button
              className="vb-btn vb-btn-ghost"
              style={{ height:32,padding:"0 12px",fontSize:11 }}
              onClick={() => navigate("/dashboard")}
            >← Back</button>
          </div>

          {/* Scrollable form */}
          <div className="vb-ed-body">

            {/* ── Portrait ── */}
            <div className="vb-sec" style={{animationDelay:"0.05s"}}>Portrait</div>
            <div className="vb-field" style={{animationDelay:"0.08s"}}>
              <label className="vb-file-label">
                <UploadIcon/>
                {imageName ? imageName : "Upload profile photo"}
                <input className="vb-file-input" type="file" accept="image/*"
                  onChange={e => { setImage(e.target.files[0]); setImageName(e.target.files[0]?.name || ""); }}/>
              </label>
            </div>

             {/* ── Resume upload ── */}
            <div className="vb-sec" style={{animationDelay:"0.5s"}}>Résumé</div>
            <div className="vb-field" style={{animationDelay:"0.52s"}}>
              <label className="vb-file-label">
                <UploadIcon/>
                {resume ? resume.name : "Upload résumé (PDF / DOC)"}
                <input className="vb-file-input" type="file" accept=".pdf,.doc,.docx"
                  onChange={e=>setResume(e.target.files[0])}/>
              </label>
            </div>

            {/* ── Identity ── */}
            <div className="vb-sec" style={{animationDelay:"0.1s"}}>Identity</div>
            <div className="vb-field" style={{animationDelay:"0.12s"}}>
              <label className="vb-label">Full Name</label>
              <input className="vb-input" placeholder="Jane Smith" value={title} onChange={e=>setTitle(e.target.value)}/>
            </div>
            <div className="vb-field" style={{animationDelay:"0.14s"}}>
              <label className="vb-label">Bio / Summary</label>
              <textarea className="vb-textarea" placeholder="A short professional bio…" value={description} onChange={e=>setDescription(e.target.value)}/>
            </div>
            <div className="vb-field" style={{animationDelay:"0.16s"}}>
              <label className="vb-label">Location</label>
              <input className="vb-input" placeholder="City, Country" value={location} onChange={e=>setLocation(e.target.value)}/>
            </div>

            {/* ── Contact ── */}
            <div className="vb-sec" style={{animationDelay:"0.18s"}}>Contact</div>
            <div className="vb-grid-2" style={{gap:8,marginBottom:10}}>
              {[
                {ph:"Email",    k:"email"},
                {ph:"Phone",    k:"phone"},
                {ph:"GitHub",   k:"github"},
                {ph:"LinkedIn", k:"linkedin"},
              ].map(({ph,k})=>(
                <div key={k} className="vb-field" style={{marginBottom:0}}>
                  <input className="vb-input" placeholder={ph}
                    value={contact[k]} onChange={e=>setContact(c=>({...c,[k]:e.target.value}))}/>
                </div>
              ))}
            </div>

            {/* ── Skills ── */}
            <div className="vb-sec" style={{animationDelay:"0.22s"}}>Skills</div>
            <div className="vb-field" style={{animationDelay:"0.24s"}}>
              <div className="vb-skill-row" style={{marginBottom:8}}>
                <input className="vb-input" placeholder="Add a skill…"
                  value={skillInput} onChange={e=>setSkillInput(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&addSkill()}/>
                <select className="vb-select" value={skillType} onChange={e=>setSkillType(e.target.value)}>
                  <option value="technical">Technical</option>
                  <option value="nonTechnical">Soft Skills</option>
                  <option value="tools">Tools</option>
                </select>
                <button className="vb-btn vb-btn-add" onClick={addSkill}><PlusIcon/></button>
              </div>
              {["technical","nonTechnical","tools"].map(type=>
                skills[type]?.length > 0 ? (
                  <div key={type} className="vb-tag-group">
                    <div className="vb-tag-group-label">
                      {type==="nonTechnical"?"Soft Skills":type.charAt(0).toUpperCase()+type.slice(1)}
                    </div>
                    <div className="vb-tag-list">
                      {skills[type].map((s,i)=>(
                        <span key={i} className="vb-tag" style={{animationDelay:`${i*0.05}s`}}>
                          {s}
                          <button className="vb-tag-x" onClick={()=>removeSkill(type,i)}>✕</button>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>

            {/* ── Projects ── */}
            <div className="vb-sec" style={{animationDelay:"0.28s"}}>Projects</div>
            <div className="vb-field" style={{animationDelay:"0.3s"}}>
              <label className="vb-label">Project Title</label>
              <input className="vb-input" placeholder="My Awesome Project" value={projectName} onChange={e=>setProjectName(e.target.value)}/>
            </div>
            <div className="vb-field" style={{animationDelay:"0.32s"}}>
              <label className="vb-label">Description</label>
              <textarea className="vb-textarea" style={{minHeight:60}} placeholder="What did you build?" value={projectDesc} onChange={e=>setProjectDesc(e.target.value)}/>
            </div>
            <button className="vb-btn vb-btn-add" style={{marginBottom:12}} onClick={addProject}>
              <PlusIcon/> Add Project
            </button>
            {projects.map((p,i)=>(
              <div key={i} className="vb-project-item">
                <div className="vb-project-body">
                  <div className="vb-project-name">{p.name}</div>
                  <div className="vb-project-desc">{p.description}</div>
                </div>
                <button className="vb-tag-x" style={{fontSize:14,marginTop:2}} onClick={()=>removeProject(i)}>✕</button>
              </div>
            ))}

            {/* ── Education ── */}
            <div className="vb-sec" style={{animationDelay:"0.36s"}}>Education</div>
            <div className="vb-field" style={{animationDelay:"0.38s"}}>
              <textarea className="vb-textarea" style={{minHeight:60}} placeholder="Degrees, institutions, years…" value={education} onChange={e=>setEducation(e.target.value)}/>
            </div>

            {/* ── Experience ── */}
            <div className="vb-sec" style={{animationDelay:"0.4s"}}>Experience</div>
            <div className="vb-field" style={{animationDelay:"0.42s"}}>
              <textarea className="vb-textarea" style={{minHeight:60}} placeholder="Roles, companies, dates…" value={experience} onChange={e=>setExperience(e.target.value)}/>
            </div>

            {/* ── Achievements ── */}
            <div className="vb-sec" style={{animationDelay:"0.44s"}}>Achievements</div>
            <div className="vb-field" style={{animationDelay:"0.46s"}}>
              <textarea className="vb-textarea" style={{minHeight:60}} placeholder="Awards, certifications, honours…" value={achievements} onChange={e=>setAchievements(e.target.value)}/>
            </div>

           

          </div>

          {/* Save footer */}
          <div className="vb-ed-foot">
            <button className="vb-btn vb-btn-save" onClick={handleSave} disabled={saving}>
              {saving ? <><SpinIcon/> Saving…</> : <>{isEdit?"Update Portfolio":"Publish Portfolio"}<div className="vb-btn-ring"><ArrowRight/></div></>}
            </button>
          </div>
        </div>
        <Preview
              template={template}
              setTemplate={setTemplate}
              livePreview={livePreview}
              setLivePreview={setLivePreview}
              title={title}
              description={description}
              location={location}
              skills={skills}
              projects={projects}
              contact={contact}
              education={education}
              experience={experience}
              achievements={achievements}
            />  
      </div>
      
    </>
  );
}

export default Builder;