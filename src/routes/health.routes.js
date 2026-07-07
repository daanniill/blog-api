const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {getHealth(req, res)});

module.exports = router;