const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/recordController");

// Admin-only endpoints (demo: no auth middleware here)
router.get("/users", getAllUsers);

module.exports = router;