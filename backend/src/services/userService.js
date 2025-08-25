const { users, records } = require("../models/userModel");

// Authenticate user by username/password/role
function authenticate(username, password, role) {
  return users.find(
    (u) => u.username === username && u.password === password && u.role === role
  ) || null;
}

function listUsers() {
  // do not expose passwords
  return users.map((u) => ({ id: u.id, username: u.username, role: u.role }));
}

function getRecordsForRole(role) {
  return records[role] || [];
}

module.exports = { authenticate, listUsers, getRecordsForRole };