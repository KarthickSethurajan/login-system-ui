require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get("/health", (_req, res) => res.send("OK - backend alive"));

// mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;