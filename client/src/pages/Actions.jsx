import React from "react";
import { useNavigate } from "react-router-dom";
import AccountSet from "./Accountset";

function Actions() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Actions</h1>
      <p>Quickly access important portfolio tools.</p>

      <div>
        <button onClick={() => navigate("/builder")}>
          Create Portfolio
        </button>
      </div>

      <div>
        <button onClick={() => navigate("/my-portfolios")}>
          View My Portfolios
        </button>
      </div>

      <div>
        <button>
          Download Resume
        </button>
      </div>

      <div>
        <button>
          Share Portfolio
        </button>
      </div>

      <div>
        <button>
          AI Resume Builder
        </button>
      </div>

      <div>
        <button>
          Upload Resume
        </button>
      </div>
      
      <div>
        <h2>Account Settings</h2>

        <AccountSet />
      </div>
    </div>
  );
}

export default Actions;