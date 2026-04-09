
const Minimal = ({profileImage, name, description, skills, projects }) => {
  return (
    <div className="w-full h-full bg-black p-6">

      <img className="w-32 h-32 rounded-full object-cover" src={profileImage} alt="profile" />g

      <h1 className="text-3xl font-bold mb-2">{name || "Your Name"}</h1>
      <p className="mb-4">{description || "Your description here"}</p>

      <h3 className="font-semibold mb-2">Skills</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills?.technical?.map((s, i) => (
          <span key={i} className="bg-gray-200 px-2 py-1 rounded">
            {s}
          </span>
        ))}
      </div>

      <h3 className="font-semibold mb-2">Projects</h3>
      {projects.map((p, i) => (
        <div key={i} className="border p-3 rounded mb-2">
          <h4 className="font-bold">{p.name}</h4>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Minimal;