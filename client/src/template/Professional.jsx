// import { getPortfolioByUsername } from "../../../server/controllers/portfolioController";

const Professional = ({ name,title, description, skills, projects }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 md:px-20 py-10">

      {/* HERO SECTION */}
      <section className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          {name || title || "Your name"}
        </h1>

        <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
          {description ||
            "Full-stack developer crafting scalable, high-performance web applications with modern technologies."}
        </p>

        <div className="mt-6 flex gap-4">
          <button className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Contact Me
          </button>

          <button className="border border-gray-700 px-6 py-2 rounded-lg hover:border-blue-500 hover:text-blue-400 transition">
            View Projects
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          About
        </h2>

        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Passionate developer with experience in building full-stack
          applications using MERN stack. Focused on performance,
          scalability, and clean UI/UX design.
        </p>
      </section>

      {/* SKILLS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">
          Skills
        </h2>

        {skills.length === 0 ? (
          <p className="text-gray-500">No skills added</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills?.technical?.map((skill, i) => (
              <li
                key={i}
                className="px-4 py-2 bg-gray-900 rounded-full text-sm border border-gray-800 
                hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
              >
                {skill}
              </li>
            ))}
          </div>
        )}
      </section>

      {/* PROJECTS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">
          Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects added</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((p, i) => (
              <div
                key={i}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800 
                hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 
                transition-all duration-300 group"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
                  {p.name}
                </h3>

                <p className="text-gray-400 text-sm mb-4 break-words">
                  {p.description}
                </p>

                <div className="flex gap-3">
                  <button className="text-sm text-blue-400 hover:underline">
                    Live
                  </button>

                  <button className="text-sm text-gray-400 hover:text-blue-400">
                    Code
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </section>

      {/* CONTACT */}
      <section className="border-t border-gray-800 pt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          Contact
        </h2>

        <p className="text-gray-400 mb-4">
          Feel free to reach out for collaborations or opportunities.
        </p>

        <div className="flex gap-4">
          <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">
            Email
          </button>

          <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">
            LinkedIn
          </button>

          <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">
            GitHub
          </button>
        </div>
      </section>

    </div>
  );
};

export default Professional;