const Modern = ({ name,title, description, skills, projects }) => {
  return (
    <div className="w-full min-h-screen bg-gray-950 text-white px-10 py-12">

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tight mb-3">
          {name || title || "Your Name"}
        </h1>

        <p className="text-gray-400 max-w-2xl text-lg">
          {description || "A passionate developer building modern web applications."}
        </p>
      </div>

      {/* SKILLS */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {skills.length === 0 ? (
            <p className="text-gray-500">No skills added</p>
          ) : (
            skills?.technical?.map((s, i) => (
              <li
                key={i}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm 
                border border-gray-700 hover:border-blue-500 
                hover:text-blue-400 transition-all duration-300"
              >
                {s}
              </li>
            ))
          )}
        </div>
      </div>

      {/* PROJECTS */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects added</p>
          ) : (
            projects.map((p, i) => (
              <div
                key={i}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800 
                hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 
                transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 break-words">
                  {p.name}
                </h3>

                <p className="text-gray-400 text-sm break-words">
                  {p.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Modern;