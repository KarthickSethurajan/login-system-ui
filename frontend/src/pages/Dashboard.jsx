import React, { useEffect, useState } from "react";
import { API_URL } from "../services/api";

export default function Dashboard({ user, onLogout }) {
  const [records, setRecords] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    let canceled = false;
    setLoadingRecs(true);
    fetch(`${API_URL}/api/records/${encodeURIComponent(user.role)}?delay=800`)
      .then((r) => r.json())
      .then((data) => { if (!canceled) setRecords(data); })
      .finally(() => { if (!canceled) setLoadingRecs(false); });
    return () => { canceled = true; };
  }, [user.role]);

  async function loadUsers() {
    setLoadingUsers(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/users`);
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      alert("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <h2>Welcome, {user.username}</h2>
          <div style={{ color: "#666" }}>Role: <b>{user.role}</b></div>
        </div>
        <div>
          <button onClick={onLogout} style={{ padding: "8px 12px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 6 }}>Logout</button>
        </div>
      </div>

      <section style={{ marginBottom: 20 }}>
        <h3>Your Records</h3>
        {loadingRecs ? <p>Loading records…</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #e5e7eb", padding: 8 }}>ID</th>
                <th style={{ border: "1px solid #e5e7eb", padding: 8 }}>Data</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id}>
                  <td style={{ border: "1px solid #e5e7eb", padding: 8 }}>{r.id}</td>
                  <td style={{ border: "1px solid #e5e7eb", padding: 8 }}>{r.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {user.role === "Admin" && (
        <section>
          <h3>Admin • Manage Users</h3>
          <button onClick={loadUsers} disabled={loadingUsers} style={{ padding: "8px 12px", background: "#0ea5a0", color: "#fff", border: "none", borderRadius: 6 }}>
            {loadingUsers ? "Loading…" : "Load Users"}
          </button>

          <ul style={{ marginTop: 12 }}>
            {users.map(u => <li key={u.id}>{u.username} — <i>{u.role}</i></li>)}
          </ul>
        </section>
      )}
    </div>
  );
}