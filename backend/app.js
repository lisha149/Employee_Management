require("dotenv").config();
const express = require("express");
const path = require("path");
const Models = require("./models");
const bcrypt = require("bcrypt");
const User = Models.users;
const jwt = require("jsonwebtoken");
const db = require("./models/index");
var usersRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

//Login API
app.post("/", async (req, res, next) => {
  const email = req.body.user_email;
  const password = req.body.user_password;
  if (email == "" || password == "") {
    res
      .status(400)
      .json({ error: "Email address or password cannot be empty" });
  }

  const user = await User.findOne({ email });

  if (user) {
    const password_valid = await bcrypt.compare(password, user.password);
    if (password_valid) {
      token = jwt.sign(
        {
          user_id: user.userId,
          user_email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
});
//Add users
app.use("/users", usersRouter);
app.get("/", function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + "/login.html"));
});

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port :http://localhost:${PORT}`)
  );
});
