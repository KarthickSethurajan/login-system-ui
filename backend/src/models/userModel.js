// simple in-memory model (replace with DB later)
const users = [
  { id: 1, username: "user1", password: "pass1", role: "General User" },
  { id: 2, username: "admin", password: "admin123", role: "Admin" }
];

const records = {
  "General User": [{ id: 1, data: "User record A" }, { id: 2, data: "User record B" }],
  "Admin": [{ id: 1, data: "Admin record 1" }, { id: 2, data: "Admin record 2" }]
};

module.exports = { users, records };