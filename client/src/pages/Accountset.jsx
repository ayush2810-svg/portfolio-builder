import React, { useState } from "react";

function AccountSet() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Account Settings</h1>

      <div style={{ marginTop: "20px" }}>
        <h2>Security</h2>

        <button>Change Password</button>

        <p style={{ marginTop: "10px" }}>
          Two-Factor Authentication (Coming Soon)
        </p>
      </div>

      <hr />

      <div style={{ marginTop: "20px" }}>
        <h2>Preferences</h2>

        <div>
          <label>Theme: </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            Email Notifications
          </label>
        </div>
      </div>

      <hr />

      <div style={{ marginTop: "20px" }}>
        <h2 style={{ color: "red" }}>Danger Zone</h2>

        <button style={{ color: "red" }}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default AccountSet;