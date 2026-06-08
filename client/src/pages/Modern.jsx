import React from "react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "neo",
    name: "Neo",
    description: "Modern developer portfolio",
    premium: false,
  },
  {
    id: "horizon",
    name: "Horizon",
    description: "Minimal modern portfolio",
    premium: false,
  },
  {
    id: "velocity",
    name: "Velocity",
    description: "Dark mode focused portfolio",
    premium: true,
  },
];

function Modern() {
  const navigate = useNavigate();

  const handleUseTemplate = (templateId) => {
    navigate(`/builder?template=${templateId}`);
  };

  return (
    <div>
      <h1>Modern Edition</h1>
      <p>Choose a modern template for your portfolio.</p>

      {templates.map((template) => (
        <div
          key={template.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h2>{template.name}</h2>
          <p>{template.description}</p>

          {template.premium && <p>⭐ Premium</p>}

          <button onClick={() => handleUseTemplate(template.id)}>
            Use Template
          </button>
        </div>
      ))}
    </div>
  );
}

export default Modern;