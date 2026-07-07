const pool = require("../config/db");

module.exports = {
  getHealth: async (req, res) => {
    try {
      await pool.query("SELECT 1");
      res.json({
        status: "healthy",
        api: "running",
        database: "connected",
      });
    } catch (error) {
    res.status(503).json({
      status: "error",
      api: "running",
      database: "disconnected",
    });
  }
}
}