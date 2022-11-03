var express = require("express");
const emailvalidator = require("email-validator");
var router = express.Router();
const Models = require("../models");
const bcrypt = require("bcrypt");
const User = Models.users;
const Profile = Models.profiles;
const generateToken = require("../utils/generateToken");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

//Login API
router.post("/login", async (req, res, next) => {
  if (req.body.email == "" || req.body.password == "") {
    res
      .status(400)
      .json({ message: "Email address or password cannot be empty" });
  }

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (user) {
    const password = req.body.password;
    const password_valid = await bcrypt.compare(password, user.password);
    if (password_valid) {
      res.status(200).json({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: user.is_admin,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ message: "User does not exist" });
  }
});

//Add Employee
router.post("/employee", isAdmin, async (req, res, next) => {
  const userExists = await User.findOne({ where: { email: req.body.email } });

  if (userExists) {
    res.status(404).json({ message: "User already exits" });
  }

  const salt = await bcrypt.genSalt(10);
  var usr = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    is_admin: req.body.is_admin,
    designation: req.body.designation,
    department_id: req.body.department_id,
  };
  if (emailvalidator.validate(usr.email)) {
    created_user = await User.create(usr);
    const created_profile = await Profile.create({
      user_id: created_user.id,
      first_name: created_user.first_name,
      last_name: created_user.last_name,
      email: created_user.email,
      designation: created_user.designation,
    });
    if (created_user) {
      res.status(201).json({
        id: created_user.id,
        first_name: created_user.first_name,
        last_name: created_user.last_name,
        email: created_user.email,
        designation: created_user.designation,
        department_id: created_user.department_id,
        token: generateToken(created_user.id),
      });
    }
  } else {
    res.status(400).send({ message: "Please provide valid email" });
  }
});
//View Employee
router.get("/employees", isAuth, async (req, res, next) => {
  const employees = await User.findAll();
  res.json(employees);
});
router.get("/employee-count", isAuth, async (req, res, next) => {
  const count = await User.count();
  res.json(count);
});
//Get Employee by id
router.get("/employees/:id", isAuth, async (req, res, next) => {
  const employee = await User.findByPk(req.params.id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

//Edit Employee
router.put("/employee/:id", isAdmin, async (req, res, next) => {
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
    res.status(404).json({ message: "Employee not found" });
  }
});

//Delete Employee
router.delete("/employee/:id", isAdmin, async (req, res) => {
  const employee = await User.findByPk(req.params.id);

  if (employee) {
    await employee.destroy();
    res.json({ message: "Employee Deleted" });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

module.exports = router;
