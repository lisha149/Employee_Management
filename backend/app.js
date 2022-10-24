require("dotenv").config();
const express = require("express");

const db = require("./models/index");
var usersRouter = require("./routes/userRoutes");
var deptRouter = require("./routes/deptRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

//Add users
app.use("/api", usersRouter);
app.use("/department", deptRouter);

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port :http://localhost:${PORT}`)
  );
});
