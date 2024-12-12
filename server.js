const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.static("public"));

app.get("/config", (req, res) => {
  res.json({ accessKey: process.env.ACCESS_KEY });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
