var express = require("express");
var router = express.Router();
const Models = require("../models");
const bcrypt = require("bcrypt");
const User = Models.users;
const jwt = require("jsonwebtoken");
//Login API
router.post("/login", async (req, res, next) => {
  if (req.body.email == "" || req.body.password == "") {
    res.status(400);
    throw new Error("Email address or password cannot be empty");
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
//Get adminPage
// router.get("/is-admin", isAdmin, async (req, res, next) => {
//
// });

//Add Employee
router.post("/employee", async (req, res, next) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

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
  if (created_user) {
    res.status(201).json({
      id: created_user.id,
      name: created_user.name,
      email: created_user.email,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//View Employee
router.get("/employee", async (req, res, next) => {
  const employees = await User.findAll();
  res.json(employees);
});
//Get Employee by id
router.get("/employee/:id", async (req, res, next) => {
  const employee = await User.findByPk(req.params.id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

//Edit Employee
router.put("/employee/:id", async (req, res, next) => {
  const { first_name, last_name, department_id, status } = req.body;

  const employee = await User.findByPk(req.params.id);

  if (employee) {
    (employee.first_name = first_name),
      (employee.last_name = last_name),
      (employee.department_id = department_id),
      (employee.status = status);
    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

//Delete Employee
router.delete("/employee/:id", async (req, res) => {
  const employee = await User.findByPk(req.params.id);

  if (employee) {
    await employee.destroy();
    res.json({ message: "Employee Deleted" });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

module.exports = router;
