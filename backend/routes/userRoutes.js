var express = require("express");
var router = express.Router();
const Models = require("../models");
const bcrypt = require("bcrypt");
const User = Models.users;
const jwt = require("jsonwebtoken");

//Login API
router.post("/login", async (req, res, next) => {
  if (req.body.email == "" || req.body.password == "") {
    res
      .status(400)
      .json({ error: "Email address or password cannot be empty" });
  }

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (user) {
    const password = req.body.password;
    const password_valid = await bcrypt.compare(password, user.password);
    if (password_valid) {
      let token = jwt.sign(
        {
          user_id: req.body.user_id,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          is_admin: req.body.is_admin,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: user.is_admin,
        token: token,
      });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
});
//Add Employee

router.post("/employee", async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  var usr = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    is_admin: req.body.is_admin,
  };
  created_user = await User.create(usr);
  res.status(201).json(created_user);
});

module.exports = router;
