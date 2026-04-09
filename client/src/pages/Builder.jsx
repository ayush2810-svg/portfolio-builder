import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Preview from "../component/Preview";
import Minimal from "../template/Minimal";
import Modern from "../template/Modern";
import Professional from "../template/Professional";
function Builder(){

  const {id} = useParams(); 
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [contact, setContact] = useState({
    email:"",
    phone:"",
    github:"",
    linkedin:""
  });
  const [education, setEducation] = useState(" ");
  const [experience, setExperience] = useState(" ");
  const [achievements, setAchievements] = useState(" ");

  const [location, setLocation] = useState(" ");
  const [image, setImage] = useState(null); 
  const [skills, setSkills] = useState({
    technical:[],
    nonTechnical:[],
    tools:[]
  });
  const [skillInput, setskillInput] = useState(" ");
  const [skilltype, setskillstype] = useState("technical");

  const [projects, setProjects] = useState([]);
  const [projectName, setprojectName] = useState(" ");
  const [projectDesc, setprojectDesc] = useState(" ");

  const[template, setTemplate] = useState("minimal");
  

  const navigate = useNavigate();
  const isEdit = !!id;

  const addSkill =() =>{
    if(!skillInput) return;

    setSkills({
      ...skills,
      [skilltype]:[...skills[skilltype], skillInput]
    });
    setskillInput(" ");
  };
  <select name="skilltype" id="" value={skilltype} onChange={(e)=>setskillstype(e.target.value)}>
    <option value="technical">Technical</option>
    <option value="nonTechnical">Non-Technical</option>
    <option value="tools">Tools</option>
  </select>
  const addProject =() =>{
    if(!projectName || !projectDesc) return;

    setProjects([
      ...projects,
      {
        name:projectName,
        description:projectDesc
      }
    ]);
    setprojectName(" ");
    setprojectDesc(" ");
  };
  
  useEffect(()=>{

  if(id){
    const loadPortfolio = async () =>{
      const res = await API.get("/portfolio/my-portfolio");
      const portfolio = res.data.find(p=>p._id===id);

      if(portfolio){
        setTitle(portfolio.title);
        setDescription(portfolio.description);
        setSkills(portfolio.skills);
        setProjects(portfolio.projects);
        setTemplate(portfolio.template);
      }
    };
    loadPortfolio();
  }
},[id]);
const handleSave = async () => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("location", location);
  formData.append("template", template);

  formData.append("skills", JSON.stringify(skills));
  formData.append("projects", JSON.stringify(projects));

  formData.append("contact", contact);
  formData.append("education", education);
  formData.append("experience", experience);
  formData.append("achievements", achievements);

  if (image) {
    formData.append("profileImage", image);
  }

  try {
    if (id) {
      await API.put(`/portfolio/update/${id}`, formData);
      alert("Portfolio updated successfully");
    } else {
      await API.post(`/portfolio/create`, formData);
      alert("Portfolio created successfully");
    }

    navigate("/dashboard");
  } catch (err) {
    console.error(err);
  }
  navigate("/dashboard");
  };
  const handleRemoveSkills = (index) => {
    const updated = skills.technical.filter((_, i) => i !== index);
  setSkills({
    ...skills,
    technical: updated
  });
  alert("Skill removed successfully");
  };
  const handleRemoveProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
  setProjects(updated);
  alert("Project removed successfully");
  }

  const handleTemplate = (e) => {
    setTemplate(e.target.value);
    // alert(`Template changed to ${e.target.value}`);
  };
  const templateMap = {
  minimal: Minimal,
  modern: Modern,
  professional: Professional
};
const TemplateComponent = templateMap[template];
  return(
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-1/3 p-8 bg-gray-900 text-white overflow-y-auto">

      <h1 className="text-4xl font-bold mb-6">{isEdit ? "Edit Portfolio" : "Create Portfolio"}</h1>

      <input className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <input  className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        placeholder="Your Name"
        onChange={(e)=>setTitle(e.target.value)}/>

        <br />

        <textarea className="w-full p-3 mb-6 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={description} 
        placeholder="Your Description"
        onChange={(e)=>setDescription(e.target.value)}/>

        <hr />

        <h3 className="text-lg font-semibold mb-2">Add Skills</h3>
        <div className="flex gap-2 mb-4">
        <input className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
        placeholder="Skills"
        value={skillInput}
        onChange={(e)=>setskillInput(e.target.value)} />
        
        <button className="bg-blue-500 px-4 rounded hover:bg-blue-600" onClick={addSkill}>Add Skills</button>
        </div>
        <ul>
          {skills?.technical?.map((s,i)=>(
            <li key={i}>
              {s}
              <button onClick={()=>handleRemoveSkills(i)}>❌</button>
            </li>
          ))}
        </ul>

        <hr/>

        

        <h3 className="text-lg font-semibold mb-2">Add Projects</h3>

        <input className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={projectName}
         placeholder="Project Name" 
        onChange={(e)=>setprojectName(e.target.value)}/>

        <br />

        <textarea className="w-full p-2 mb-2 rounded bg-gray-800 border border-gray-700"
        value={projectDesc} 
        placeholder="Project Description"
        onChange={(e)=>setprojectDesc(e.target.value)}/>

        <br />

        <button className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 mb-6" onClick={addProject}>Add Project</button>

        <ul>{projects.map((p,i)=>(<li key={i}>
          {p.name}-{p.description}
          <button onClick={()=>handleRemoveProject(i)}>❌</button>
          </li>
        ))}
        </ul>
        <hr />

        <h3 className="text-lg font-semibold mb-2">Contact</h3>
        <input className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" onChange={(e)=>setContact({...contact,email:e.target.value})} />
        <input className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Phone" onChange={(e)=>setContact({...contact,phone:e.target.value})} />
        <input className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="GitHub" onChange={(e)=>setContact({...contact,github:e.target.value})} />
        <input className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="LinkedIn" onChange={(e)=>setContact({...contact,linkedin:e.target.value})} />

        <h3 className="text-lg font-semibold mb-2">Select Template</h3>

        <select
          value={template}
          onChange={handleTemplate}
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          hover:border-blue-400 transition-all duration-300"
        >
          <option value="minimal">Minimal</option>
          <option value="modern">Modern</option>
          <option value="professional">Professional</option>
        </select>
        <br /><br />
        <button className="w-full bg-green-500 py-3 rounded font-semibold hover:bg-green-600" onClick={handleSave}>{isEdit?"Update Portfolio":"Create Portfolio"}</button>
    </div>
    <div className="flex-1 bg-gray-100 flex justify-center items-start">
    <Preview
      name={title}
      description={description}
      skills={skills}
      projects={projects}
      template={template} 
    />
  </div>
  </div>
  
  )
}
export default Builder;