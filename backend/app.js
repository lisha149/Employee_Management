const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const employees = require("./data/employees");

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.get("/api/employees", (req, res) => {
  res.json(employees);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port :http://localhost:${PORT}`)
);
