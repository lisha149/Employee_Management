var express = require("express");
var router = express.Router();
const Models = require("../models");
const bcrypt = require("bcrypt");
const User = Models.users;

router.post("/", async (req, res, next) => {
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
