const userService = require("../services/userService");

// GET /api/records/:role
function getRecords(req, res) {
  const role = req.params.role;
  const delay = Number(req.query.delay || 700); // simulate API delay
  setTimeout(() => {
    const result = userService.getRecordsForRole(role);
    res.json(result);
  }, delay);
}

// GET /api/admin/users
function getAllUsers(req, res) {
  const delay = Number(req.query.delay || 400);
  setTimeout(() => {
    res.json(userService.listUsers());
  }, delay);
}

module.exports = { getRecords, getAllUsers };