require("dotenv").config();
const express = require("express");
const Models = require("./models");
const bcrypt = require("bcrypt");
const User = Models.users;
const jwt = require("jsonwebtoken");
const db = require("./models/index");
const cors = require("cors");
var usersRouter = require("./routes/userRoutes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

//Login API
app.post("/", async (req, res, next) => {
  if (req.body.email == "" || req.body.password == "") {
    res
      .status(400)
      .json({ error: "Email address or password cannot be empty" });
  }

  const user = await User.findOne({
    where: { email: req.body.email },
    raw: true,
  });

  if (user) {
    const password = req.body.password;
    const password_valid = await bcrypt.compare(password, user.password);
    if (password_valid) {
      token = jwt.sign(
        {
          user_id: req.body.user_id,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        token: token,
      });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
});
//Add users
app.use("/users", usersRouter);

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port :http://localhost:${PORT}`)
  );
});
