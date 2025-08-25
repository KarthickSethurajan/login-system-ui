const userService = require("../services/userService");

async function login(req, res) {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ success: false, message: "username, password and role required" });
    }

    const user = userService.authenticate(username, password, role);
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // return minimal user data (no tokens for demo)
    return res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = { login };