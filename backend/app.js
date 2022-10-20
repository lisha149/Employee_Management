require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const path = require("path");
// const pool = require("./config/db");

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});
app.set("view engine", "hbs");

const publicDirectory = path.join(__dirname, "./frontend/src");
app.use(express.static(publicDirectory));
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL Connected");
  }
});
//middleware
app.use(express.json());

const employees = require("./data/employees");

app.get("/", (req, res) => {
  res.send("API is running..");
});
app.get("/dashboard", (req, res) => {
  res.send("Dashboard Page");
});
app.get("/admin", (req, res) => {
  res.send("Admin Page");
});
app.get("/api/employees", (req, res) => {
  res.json(employees);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port :http://localhost:${PORT}`)
);
