const express = require("express");
const app = express();
const cors = require("cors");

const { requestLogger } = require("./middleware/logger.middleware");

const { notFoundHandler, errorHandler } = require("./middleware/error.middleware");


app.use(express.json({ limit: "1mb" }))
app.use(requestLogger);
app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://daanniill.github.io",
    ],
  })
);


app.use("/api/health", require("./routes/health.routes"));
app.use("/api/posts", require("./routes/posts.routes"));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;