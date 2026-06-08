import React from "react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "executive",
    name: "Executive",
    description: "Clean corporate portfolio for professionals",
    premium: false,
  },
  {
    id: "prestige",
    name: "Prestige",
    description: "Elegant portfolio with premium aesthetics",
    premium: true,
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Business-focused portfolio layout",
    premium: true,
  },
  {
    id: "legacy",
    name: "Legacy",
    description: "Traditional professional portfolio design",
    premium: false,
  },
];

function Professional() {
  const navigate = useNavigate();

  const handleUseTemplate = (templateId) => {
    navigate(`/builder?template=${templateId}`);
  };

  return (
    <div>
      <h1>Professional Edition</h1>
      <p>Choose a professional template for your portfolio.</p>

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

export default Professional;