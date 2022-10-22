var express = require("express");
var router = express.Router();
const Models = require("./../models");
const bcrypt = require("bcrypt");
const User = Models.users;

router.post("/add-user", async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  var usr = {
    userId: req.body.id,
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.user_email,
    password: await bcrypt.hash(req.body.user_password, salt),
  };
  created_user = await User.create(usr);
  res.status(201).json(created_user);
});

module.exports = router;
