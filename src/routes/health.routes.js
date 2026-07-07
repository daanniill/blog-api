const express = require("express");
const router = express.Router();
const { getHealth } = require("../controllers/health.controller");

router.get("/", (req, res) => {getHealth(req, res)});

module.exports = router;