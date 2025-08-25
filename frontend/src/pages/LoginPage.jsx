import React, { useState } from "react";
import { API_URL } from "../services/api";

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "", role: "General User" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Login failed" }));
        throw new Error(err.message || "Invalid credentials");
      }
      const data = await res.json();
      onLogin(data.user);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20, background: "#ffffff", borderRadius: 8, boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
      <h2 style={{ marginBottom: 8 }}>Sign in</h2>

      <label style={{ display: "block", marginBottom: 6 }}>User ID</label>
      <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} style={{ width: "100%", padding: 10, marginBottom: 12 }} />

      <label style={{ display: "block", marginBottom: 6 }}>Password</label>
      <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ width: "100%", padding: 10, marginBottom: 12 }} />

      <label style={{ display: "block", marginBottom: 6 }}>Role</label>
      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={{ width: "100%", padding: 10, marginBottom: 12 }}>
        <option>General User</option>
        <option>Admin</option>
      </select>

      <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: 12, background: "#0f766e", color: "#fff", border: "none", borderRadius: 6 }}>
        {loading ? "Signing in…" : "Login"}
      </button>

      <p style={{ marginTop: 12, color: "#555", fontSize: 13 }}>
        Demo accounts: <b>user1 / pass1 (General)</b>, <b>admin / admin123 (Admin)</b>
      </p>
    </div>
  );
}