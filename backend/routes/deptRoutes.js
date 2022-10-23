var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Department = Models.departments;

router.post("/", async (req, res, next) => {
  var dept = {
    title: req.body.title,
  };
  created_department = await Department.create(dept);
  res.status(201).json(created_department);
});

module.exports = router;
