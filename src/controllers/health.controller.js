import { pool } from "../config/db.js";

export async function getHealth(req, res) {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "healthy",
      api: "running",
      database: "connected",
    })
  } catch (error) {
    res.status(503).json({
      status: "error",
      api: "running",
      database: "disconnected",
    });
  }
}