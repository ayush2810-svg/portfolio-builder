import Minimal from "../template/Minimal";
import Modern from "../template/Modern";
import Professional from "../template/Professional";
const Preview = ({name, description, skills, projects,template}) => {
    const props = {name, description, skills, projects};

    if(template === "minimal") return <Minimal {...props} />;
    if(template === "modern") return <Modern {...props} />;
    if(template === "professional") return <Professional {...props} />;
    return(
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        
            <h1 className="text-3xl font-bold mb-2 text-gray-800 break-words">{name || "your name"}</h1>
            <p  className="text-gray-600 mb-4 break-words" >{description || "your description"}</p>

            <h3 className="text-xl font-semibold mb-2 ">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
            <ul>
                {skills.length === 0 ? (
                    <p>No Skills added</p>
                ):(
                    skills.map((s,i)=>(
                        <li key={i}  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{s}</li>
                    ))
                )}
            </ul>
            </div>
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            <div className="space-y-3">
            <ul>
                {projects.length === 0 ? (
                    <p>No Projects added</p>
                ):(
                    projects.map((p,i)=>(
                        <li key={i} className="p-4 border rounded-lg hover:shadow-md">
                            <strong className="font-bold text-gray-800">{p.name}</strong>
                            <p className="text-sm text-gray-600">{p.description}</p>
                        </li>
                    ))
                )}
            </ul>
            </div>
        </div>
   
    )
}
export default Preview;