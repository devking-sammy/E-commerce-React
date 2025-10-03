// src/pages/User/Settings.jsx
import React, { useState, useEffect } from "react";
import { privateApiClient } from "../../lib/client";

const UserSettings = () => {
  const [settings, setSettings] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await privateApiClient.get("/api/auth/profile");
        setSettings({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
        });
        setLoading(false);
      } catch (err) {
        setMsg("Failed to load settings");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await privateApiClient.put("/api/auth/profile", settings);
      setMsg("Settings updated successfully!");
      setLoading(false);
    } catch (err) {
      setMsg("Update failed");
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <h2>User Settings</h2>
      {loading && <p>Loading...</p>}
      {msg && <p>{msg}</p>}

      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input name="firstname" value={settings.firstname} onChange={handleChange} />

        <label>Last Name:</label>
        <input name="lastname" value={settings.lastname} onChange={handleChange} />

        <label>Email:</label>
        <input name="email" value={settings.email} onChange={handleChange} />

        <button type="submit" disabled={loading}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
