require("dotenv").config();
const express = require("express");

const db = require("./models/index");
var usersRouter = require("./routes/userRoutes");
var deptRouter = require("./routes/deptRoutes");
var leaveRouter = require("./routes/leaveRoutes");
const { notFound } = require("./middleware/error");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

//Add users
app.use("/api", usersRouter);
app.use("/api", deptRouter);
app.use("/api/employee", leaveRouter);

app.use(notFound);

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port :http://localhost:${PORT}`)
  );
});
