const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/health", require("./routes/health.routes"));
app.use("/api/posts", require("./routes/posts.routes"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});