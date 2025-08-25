const express = require("express");
const router = express.Router();
const { getRecords } = require("../controllers/recordController");

// /api/records/:role
router.get("/:role", getRecords);

module.exports = router;