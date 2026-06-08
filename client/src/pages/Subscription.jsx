import React from "react";

function Subscription() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Subscription</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2>Current Plan</h2>
        <p>Free Plan</p>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2>Free Plan</h2>

        <ul>
          <li>2 Portfolio Templates</li>
          <li>3 Portfolios</li>
          <li>Basic Customization</li>
        </ul>
      </div>

      <div
        style={{
          border: "2px solid gold",
          padding: "20px",
        }}
      >
        <h2>Premium Plan ⭐</h2>

        <ul>
          <li>Unlimited Templates</li>
          <li>Unlimited Portfolios</li>
          <li>AI Resume Builder</li>
          <li>AI Resume Autofill</li>
          <li>AI Portfolio Assistant</li>
          <li>Premium Templates</li>
          <li>Priority Support</li>
        </ul>

        <button>
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
}

export default Subscription;