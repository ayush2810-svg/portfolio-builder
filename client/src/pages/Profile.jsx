import React from "react";

function Profile() {
  const user = {
    name: "Ayush",
    email: "ayush@example.com",
    plan: "Free",
    portfolios: 3,
    joined: "June 2026",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          maxWidth: "500px",
          borderRadius: "8px",
        }}
      >
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginBottom: "15px",
          }}
        />

        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>

        <hr />

        <p>Current Plan: {user.plan}</p>
        <p>Portfolios Created: {user.portfolios}</p>
        <p>Member Since: {user.joined}</p>

        <button>Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;